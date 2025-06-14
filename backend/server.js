const fs = require('fs');
const express = require('express');
const cors = require('cors');
const path = require('path');
const PDFDocument = require('pdfkit');

const app = express();
const PORT = 5000;

const HISTORY_FILE = path.join(__dirname, 'history.json');
let dosingHistory = [];

// 🔁 Wczytaj historię
try {
  const data = fs.readFileSync(HISTORY_FILE, 'utf8');
  dosingHistory = JSON.parse(data);
  console.log("📂 Historia wczytana z pliku.");
} catch (err) {
  console.warn("⚠️ Nie udało się wczytać historii. Tworzę pustą:", err.message);
  dosingHistory = [];
}

app.use(cors());
app.use(express.json());

// 🔧 Ścieżka do builda frontendu Reacta
const buildPath = path.resolve(__dirname, '..', 'frontend', 'build');
console.log("🔧 Ścieżka do builda:", buildPath);
app.use(express.static(buildPath));

// 📥 API: oblicz dawkę
app.post('/api/dose', (req, res) => {
  const { age, weight, gender, medicine } = req.body;
  console.log("📥 Odebrano dane:", req.body);

  let dose = 0;
  switch (medicine) {
    case "Paracetamol":
      dose = weight * 10;
      break;
    case "Ibuprofen":
      dose = age < 12 ? weight * 5 : weight * 7;
      break;
    case "Amoksycylina":
      dose = gender === "Kobieta" || gender === "female" ? weight * 6 : weight * 8;
      break;
    default:
      return res.status(400).json({ error: "Nieznany lek" });
  }

  const finalDose = dose.toFixed(2);
  const entry = {
    timestamp: new Date().toISOString(),
    age,
    weight,
    gender,
    medicine,
    dose: finalDose
  };

  dosingHistory.push(entry);
  fs.writeFile(HISTORY_FILE, JSON.stringify(dosingHistory, null, 2), err => {
    if (err) console.error("❌ Błąd zapisu historii:", err.message);
    else console.log("💾 Historia zapisana.");
  });

  res.json({ dose: finalDose });
});

// 📤 API: historia
app.get('/api/history', (req, res) => {
  res.json(dosingHistory);
});

// 📄 API: eksport PDF
app.get('/api/export', (req, res) => {
  const doc = new PDFDocument();
  const fontPath = path.join(__dirname, 'fonts', 'DejaVuSans.ttf');
  doc.registerFont('DejaVu', fontPath);
  doc.font('DejaVu');

  const filename = `dosing-history-${Date.now()}.pdf`;
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  res.setHeader('Content-Type', 'application/pdf');

  doc.pipe(res);
  doc.fontSize(18).text('Historia dawkowania', { underline: true }).moveDown();

  dosingHistory.forEach((entry, index) => {
    doc
      .fontSize(12)
      .text(`${index + 1}. ${entry.timestamp}`)
      .text(`   Lek: ${entry.medicine}`)
      .text(`   Wiek: ${entry.age}, Waga: ${entry.weight}kg, Płeć: ${entry.gender}`)
      .text(`   Dawka: ${entry.dose} mg`)
      .moveDown();
  });

  doc.end();
});

// 🌐 Fallback: obsługa ścieżek frontendu Reacta (dla SPA)
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.sendFile(path.join(buildPath, 'index.html'), err => {
      if (err) {
        console.error('❌ Błąd ładowania index.html:', err.message);
        res.status(500).send('Błąd serwera');
      }
    });
  } else {
    next();
  }
});

// 🚀 Start
app.listen(PORT, () => {
  console.log(`🚀 Serwer działa na http://localhost:${PORT}`);
});
