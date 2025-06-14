import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get("http://localhost:5000/api/history", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setHistory(response.data);
      })
      .catch(error => {
        console.error("Błąd podczas pobierania historii:", error);
      });
  }, []);

  const pdfUrl = `http://localhost:5000/api/export?token=${localStorage.getItem('token')}`;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Historia dawkowania</h2>

      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Eksportuj do PDF
      </a>

      {history.length === 0 ? (
        <p className="text-gray-500">Brak zapisanych obliczeń.</p>
      ) : (
        <ul className="space-y-3 text-sm">
          {history.map((entry, index) => (
            <li key={index} className="border-b pb-2">
              <div><strong>{entry.timestamp}</strong></div>
              <div>Lek: {entry.medicine}</div>
              <div>Wiek: {entry.age}, Waga: {entry.weight}kg, Płeć: {entry.gender}</div>
              <div><strong>Dawka: {entry.dose} mg</strong></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
