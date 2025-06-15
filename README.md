# 💊 MediDose – Aplikacja do dawkowania leków

MediDose to responsywna aplikacja webowa typu PWA, która umożliwia:
- obliczanie zaleceń dawkowania leków na podstawie wieku, wagi, płci i wybranego leku,
- zapisywanie historii obliczeń przypisanej do zalogowanego użytkownika,
- eksport historii do pliku PDF,
- sprawdzenie aktualnej pogody w swoim mieście (integracja z publicznym API OpenWeather).

---

## 📦 Technologia

- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js (Express)
- **Autoryzacja**: JWT (JSON Web Token)
- **Baza danych**: `users.json` (użytkownicy), `history.json` (historia dawkowania)
- **Eksport PDF**: PDFKit + czcionka DejaVuSans (obsługa polskich znaków)
- **Pogoda**: OpenWeatherMap API
- **PWA**: Service Worker + `manifest.json`

---

## ⚙️ Jak uruchomić

### 1. Backend
```bash
cd MediDose/backend
npm install
node server.js
```
Serwer backend działa pod adresem: http://localhost:5000

### 2. Frontend
```bash
cd MediDose/frontend
npm install
npm run build
```
Build zostanie automatycznie obsłużony przez backend (statyczna obsługa `/build`)

---

## ✅ Funkcjonalności

- [x] Formularz dawkowania leków (Paracetamol, Ibuprofen, Amoksycylina)
- [x] Uwzględnienie wieku, wagi i płci
- [x] Historia dawkowania z przypisaniem do użytkownika
- [x] Eksport PDF z filtracją historii po użytkowniku
- [x] Rejestracja i logowanie z tokenem JWT
- [x] Pogoda w mieście użytkownika – integracja z OpenWeatherMap API
- [x] Responsywny wygląd (Tailwind CSS)
- [x] Obsługa PWA (Service Worker + `manifest.json`)

---

## 🔐 Bezpieczeństwo

- Logowanie przez `/api/login` – generowanie tokenu JWT
- Token jest przesyłany w nagłówku `Authorization: Bearer <token>`
- Endpointy `/api/dose`, `/api/history`, `/api/export` są chronione
- Historia jest filtrowana po zalogowanym użytkowniku (każdy widzi tylko swoje dane)

---

## 🌦 Pogoda

Użytkownik może sprawdzić pogodę w swoim mieście (np. Warszawa, Gdańsk) i otrzymać:
- temperaturę,
- opis warunków (np. bezchmurnie),
- wilgotność i prędkość wiatru,
- automatyczną poradę zdrowotną, np.:
  - `🌡 Uważaj na upał!`
  - `🧥 Chłodno – ubierz się ciepło.`
  - `🌂 Możliwy deszcz – weź parasol.`

---

## 🧪 Trwałość danych

- Historia dawkowania zapisywana w `backend/history.json`
- Użytkownicy zapisani w `backend/users.json`
- Dane są odporne na restart serwera

---

## 📄 Eksport do PDF

- Plik generowany przez PDFKit
- Filtracja historii po użytkowniku
- Obsługa polskich znaków (czcionka `DejaVuSans`)
- Nazwa pliku: `dosing-history-[username]-[timestamp].pdf`

---

## 📁 Struktura folderów

```
MediDose/
├── backend/
│   ├── server.js
│   ├── history.json
│   ├── users.json
│   ├── fonts/DejaVuSans.ttf
│   └── package.json
└── frontend/
    ├── public/
    │   ├── manifest.json
    │   ├── favicon.png
    │   └── service-worker.js
    ├── src/
    │   ├── components/
    │   │   ├── DosingForm.js
    │   │   ├── History.js
    │   │   ├── LoginForm.js
    │   │   ├── RegisterForm.js
    │   │   └── Weather.js
    │   ├── App.js
    │   └── index.js
    └── package.json
```

---

## 📌 Planowane kolejne kroki

- [x] Rejestracja i logowanie użytkownika
- [x] Historia przypisana do konta
- [x] Eksport PDF z filtrowaniem po użytkowniku
- [x] Rejestracja Service Workera (tryb PWA)
- [x] Pogoda z publicznego API
- [ ] Filtrowanie historii po lekach lub dacie
- [ ] Tryb offline + instalacja jako aplikacja mobilna
- [ ] Własne API z interakcją (np. baza leków, ostrzeżenia)

---

## 👨‍💻 Autor

**Zbigniew Plocharski**  
📁 Repozytorium: [github.com/zp-wsb/MediDose](https://github.com/zp-wsb/MediDose)
