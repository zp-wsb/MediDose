# 💊 MediDose – Aplikacja do dawkowania leków

MediDose to responsywna aplikacja webowa typu **PWA**, która umożliwia:
- obliczanie zaleceń dawkowania leków (na podstawie wieku, wagi, płci),
- rejestrację i logowanie użytkowników,
- zapisywanie historii obliczeń dla konkretnego konta,
- eksport historii do pliku PDF,
- działanie offline dzięki rejestracji Service Workera.

---

## 📦 Technologia

- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js + Express
- **Baza danych**: zapis do pliku `history.json` i `users.json`
- **Eksport PDF**: PDFKit + czcionka DejaVuSans (obsługa polskich znaków)
- **Autoryzacja**: JWT (tokeny logowania)
- **PWA**: manifest + Service Worker

---

## ⚙️ Jak uruchomić

### 1. Backend
```bash
cd MediDose/backend
npm install
node server.js
```
Serwer działa pod adresem: `http://localhost:5000`

### 2. Frontend
```bash
cd MediDose/frontend
npm install
npm start
```
Aplikacja frontendowa dostępna pod: `http://localhost:3000`

Jeśli budujesz produkcję:
```bash
npm run build
```

---

## ✅ Funkcjonalności

- 🔐 Logowanie i rejestracja użytkowników z tokenem JWT
- 💊 Formularz dawkowania leków (Paracetamol, Ibuprofen, Amoksycylina)
- 📈 Historia obliczeń przypisana do konta użytkownika
- 📄 Eksport historii do PDF (indywidualnej)
- 💾 Trwały zapis danych do `history.json` i `users.json`
- 📱 Responsywny wygląd (Tailwind CSS)
- 📥 Obsługa polskich znaków w PDF
- 🧾 Możliwość uruchomienia jako PWA (Service Worker + manifest)

---

## 🧪 Trwałość danych

Wszystkie obliczenia są zapisywane lokalnie do pliku `backend/history.json`, a konta użytkowników do `backend/users.json`. Aplikacja nie wymaga zewnętrznej bazy danych.

---

## 📄 Eksport PDF

Historia dawkowania może zostać pobrana jako plik PDF z poziomu aplikacji. PDF jest generowany dynamicznie z historii danego użytkownika i zawiera polskie znaki (czcionka DejaVuSans).

---

## 📌 Planowane kolejne kroki

- [x] Rejestracja i logowanie użytkownika
- [x] Historia przypisana do konta
- [x] Eksport PDF z filtrowaniem po użytkowniku
- [x] Rejestracja Service Workera (tryb PWA)
- [ ] Filtry historii po lekach lub dacie
- [ ] Własne API z listą leków lub interakcjami
- [ ] Tryb offline i instalacja jako aplikacja mobilna

---

## 📁 Struktura folderów

```
MediDose/
├── backend/
│   ├── server.js
│   ├── users.json
│   ├── history.json
│   └── fonts/DejaVuSans.ttf
│
└── frontend/
    ├── public/
    │   ├── manifest.json
    │   └── service-worker.js
    ├── src/
    │   ├── components/
    │   │   ├── LoginForm.js
    │   │   ├── RegisterForm.js
    │   │   ├── DosingForm.js
    │   │   └── History.js
    │   └── App.js
    └── package.json
```

---

## 🧑‍💻 Autor

**Zbigniew Plocharski**  
Repozytorium: [https://github.com/zp-wsb/MediDose](https://github.com/zp-wsb/MediDose)
