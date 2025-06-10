let dosingHistory = [];

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Serwer backend działa!');
});

app.post('/api/dose', (req, res) => {
  const { age, weight, gender, medicine } = req.body;

  console.log("Odebrano dane z frontendu:", req.body); // 🟡 loguj dane

  let dose = 0;

  switch (medicine) {
    case "Paracetamol":
      dose = weight * 10;
      break;
    case "Ibuprofen":
      dose = age < 12 ? weight * 5 : weight * 7;
      break;
    case "Amoksycylina":
      if (gender === "Kobieta" || gender === "female") {
        dose = weight * 6;
      } else {
        dose = weight * 8;
      }
      break;
    default:
      return res.status(400).json({ error: "Nieznany lek" });
  }

  const finalDose = dose.toFixed(2);

  // 🟢 Zapisz do historii
  const entry = {
    timestamp: new Date().toISOString(),
    age,
    weight,
    gender,
    medicine,
    dose: finalDose
  };

  dosingHistory.push(entry);
  console.log("Zapisano do historii:", entry);           // 🟡 log historii
  console.log("Pełna historia:", dosingHistory);          // 🟡 log całości

  res.json({ dose: finalDose });
});

app.get('/api/history', (req, res) => {
  console.log("Żądanie historii, wysyłam:", dosingHistory); // 🟡 log historii
  res.json(dosingHistory);
});

app.listen(PORT, () => {
  console.log(`✅ Serwer działa na http://localhost:${PORT}`);
});
