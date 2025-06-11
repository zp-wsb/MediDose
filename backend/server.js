const fs = require('fs');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

const HISTORY_FILE = path.join(__dirname, 'history.json');
let dosingHistory = [];

// 🔁 Wczytaj historię z pliku przy starcie serwera
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

app.get('/', (req, res) => {
  res.send('Serwer backend działa!');
});

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
  console.log("✅ Zapisano:", entry);

  // 💾 Zapisz historię do pliku
  fs.writeFile(HISTORY_FILE, JSON.stringify(dosingHistory, null, 2), err => {
    if (err) console.error("❌ Błąd zapisu historii:", err.message);
    else console.log("💾 Historia zapisana do pliku.");
  });

  res.json({ dose: finalDose });
});

app.get('/api/history', (req, res) => {
  console.log("📤 Wysłano historię:", dosingHistory.length, "rekordów");
  res.json(dosingHistory);
});

app.listen(PORT, () => {
  console.log(`🚀 Serwer działa na http://localhost:${PORT}`);
});
