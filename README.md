# 💊 MediDose – Aplikacja do dawkowania leków

**MediDose** to responsywna aplikacja webowa typu PWA, która umożliwia obliczanie zaleceń dawkowania leków na podstawie wieku, wagi, płci oraz wybranego leku. Dodatkowo zapisuje historię obliczeń i umożliwia jej eksport do pliku PDF.

---

## 📦 Technologia

- **Frontend**: React + TailwindCSS
- **Backend**: Node.js (Express)
- **Baza danych**: zapis do pliku `history.json` (symulacja trwałego przechowywania)
- **Eksport PDF**: PDFKit + czcionka DejaVuSans do obsługi polskich znaków

---

## ⚙️ Jak uruchomić

### 1. Backend

```bash
cd MediDose/backend
npm install
node server.js
```

Serwer będzie działał na `http://localhost:5000`

### 2. Frontend

```bash
cd MediDose/frontend
npm install
npm start
```

Aplikacja frontendowa będzie widoczna pod `http://localhost:3000`

---

## ✅ Funkcjonalności

- [x] Formularz dawkowania leków (Paracetamol, Ibuprofen, Amoksycylina)
- [x] Uwzględnienie wieku, wagi i płci przy obliczeniach
- [x] Historia dawkowania z trwałym zapisem do pliku `history.json`
- [x] Eksport historii do pliku PDF (obsługa polskich znaków)
- [x] Responsywny wygląd (Tailwind CSS)
- [x] Repozytorium z historią commitów

---

## 🧪 Trwałość danych

Wszystkie obliczenia są zapisywane do pliku `backend/history.json`, co pozwala na zachowanie historii nawet po ponownym uruchomieniu serwera.

---

## 📄 Eksport PDF

Historia dawkowania może być pobrana w postaci pliku PDF dzięki przyciskowi **"Eksportuj do PDF"**. Plik zawiera wszystkie dane i poprawnie obsługuje polskie znaki (czcionka DejaVuSans).

---

## 📌 Planowane kolejne kroki

- [ ] Dodanie pliku `manifest.json` i rejestracja Service Workera (pełne PWA)
- [ ] Opcjonalne API publiczne (np. nazwy leków, pogoda)
- [ ] Możliwość filtrowania historii
- [ ] Instrukcja instalacji jako aplikacja mobilna

---

## 📁 Struktura folderów

```
MediDose/
├── backend/
│   ├── server.js
│   ├── history.json
│   └── package.json
└── frontend/
    ├── src/
    ├── public/
    └── package.json
```

---

## 🧑‍💻 Autor

Zbigniew Plocharski  
Repozytorium: [https://github.com/zp-wsb/MediDose](https://github.com/zp-wsb/MediDose)
