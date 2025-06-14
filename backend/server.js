const fs = require('fs');
const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const PDFDocument = require('pdfkit');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'supersecret';

const HISTORY_FILE = path.join(__dirname, 'history.json');
const USERS_FILE = path.join(__dirname, 'users.json');
let dosingHistory = [];

try {
  const data = fs.readFileSync(HISTORY_FILE, 'utf8');
  dosingHistory = JSON.parse(data);
  console.log("📂 Historia wczytana z pliku.");
} catch (err) {
  console.warn("⚠️ Nie udało się wczytać historii:", err.message);
  dosingHistory = [];
}

app.use(cors());
app.use(express.json());

// 🔐 Middleware autoryzacji
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Brak tokenu' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Nieprawidłowy token' });
    req.user = user;
    next();
  });
}

// 🔧 Ścieżka do builda frontendu Reacta
const buildPath = path.resolve(__dirname, '..', 'frontend', 'build');
app.use(express.static(buildPath));

// 🔑 Logowanie i generowanie tokenu
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  try {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ error: 'Nieprawidłowy login lub hasło' });

    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, username: user.username });
  } catch (err) {
    console.error("❌ Błąd odczytu users.json:", err.message);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// 📥 Oblicz dawkę (🔒 chronione)
app.post('/api/dose', authenticateToken, (req, res) => {
  const { age, weight, gender, medicine } = req.body;

  let dose = 0;
  switch (medicine) {
    case "Paracetamol":
      dose = weight * 10;
      break;
    case "Ibuprofen":
      dose = age < 12 ? weight * 5 : weight * 7;
      break;
    case "Amoksycylina":
      dose = gender === "Kobieta" ? weight * 6 : weight * 8;
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
  });

  res.json({ dose: finalDose });
});

// 📤 Historia (🔒 chronione)
app.get('/api/history', authenticateToken, (req, res) => {
  res.json(dosingHistory);
});

// 📄 Eksport do PDF (🔒 chronione)
app.get('/api/export', authenticateToken, (req, res) => {
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

// 🌐 Fallback SPA
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
