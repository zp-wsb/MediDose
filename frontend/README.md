# MediDose – Aplikacja do obliczania dawkowania leków 💊

Projekt stworzony w React + Node.js (Express) z funkcją logowania (JWT), historią dawkowania i eksportem do PDF.

---

## 📦 Technologie

- **Frontend**: React + Tailwind CSS (PWA-ready)
- **Backend**: Express.js
- **Autoryzacja**: JSON Web Token (JWT)
- **Baza użytkowników**: `users.json`
- **Historia**: `history.json` (lokalny plik)
- **Eksport PDF**: PDFKit z polską czcionką (DejaVuSans)

---

## 🚀 Uruchamianie projektu

### 1. Instalacja zależności

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. Budowanie frontendu

```bash
cd frontend
npm run build
```

### 3. Start serwera

```bash
cd ../backend
node server.js
```

Serwer działa na: [http://localhost:5000](http://localhost:5000)

---

## 👤 Logowanie

Użytkownicy są przechowywani w `backend/users.json`. Przykład:

```json
[
  { "username": "admin", "password": "admin123" },
  { "username": "test", "password": "test123" }
]
```

Logowanie tworzy token JWT (ważny 1 godzinę), który jest przechowywany w `localStorage`.

---

## 🧪 Endpointy API

| Endpoint         | Metoda | Opis                                 | Wymaga JWT |
|------------------|--------|--------------------------------------|------------|
| `/api/login`     | POST   | Logowanie                            | ❌         |
| `/api/dose`      | POST   | Oblicza dawkę                        | ✅         |
| `/api/history`   | GET    | Zwraca historię dawkowania           | ✅         |
| `/api/export`    | GET    | Generuje PDF z historią              | ✅         |

---

## 📄 Funkcje

- ✅ Obliczanie dawki leków: Paracetamol, Ibuprofen, Amoksycylina
- ✅ Historia obliczeń zapisywana lokalnie (`history.json`)
- ✅ Eksport do PDF z czcionką obsługującą polskie znaki
- ✅ Logowanie z JWT i ochrona endpointów
- 🔐 Autoryzacja: użytkownik musi być zalogowany by korzystać z aplikacji

---

## 🔧 W planach

- [ ] Rozdzielenie historii na globalną i indywidualną (na podstawie `username`)
- [ ] Możliwość rejestracji użytkownika z poziomu UI (`/api/register`)
- [ ] Panel admina do zarządzania użytkownikami

---

## 🛠 Dev

- Live reload: `npm start` (w `frontend`)
- Budowanie produkcyjne: `npm run build`
- Serwowanie frontendu: `express.static()` w backendzie

---

## 🧠 Autor

Projekt inżynierski studenta Uniwersytetu Merito we Wrocławiu  
Temat: **Optymalizacja gospodarki magazynowej z wykorzystaniem danych z ERP** *(komponent informatyczny: MediDose)*

---

## 📃 Licencja

Projekt edukacyjny. Można używać, modyfikować, testować na własny użytek.
