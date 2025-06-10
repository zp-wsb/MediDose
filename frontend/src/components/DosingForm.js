import { useState } from "react";
import axios from "axios";

export default function DosingForm() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("female");
  const [medicine, setMedicine] = useState("Paracetamol");
  const [dose, setDose] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/dose", {
        age: parseInt(age),
        weight: parseFloat(weight),
        gender,
        medicine
      });
      setDose(response.data.dose);
      setError(null);
    } catch (err) {
      setDose(null);
      setError("Nie udało się obliczyć dawki.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Oblicz dawkę</h2>

      <label className="block mb-2">Lek:</label>
      <select value={medicine} onChange={e => setMedicine(e.target.value)} className="w-full border p-2 rounded mb-4">
        <option value="Paracetamol">Paracetamol</option>
        <option value="Ibuprofen">Ibuprofen</option>
        <option value="Amoksycylina">Amoksycylina</option>
      </select>

      <label className="block mb-2">Wiek:</label>
      <input type="number" value={age} onChange={e => setAge(e.target.value)} className="w-full border p-2 rounded mb-4" />

      <label className="block mb-2">Waga (kg):</label>
      <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full border p-2 rounded mb-4" />

      <label className="block mb-2">Płeć:</label>
      <select value={gender} onChange={e => setGender(e.target.value)} className="w-full border p-2 rounded mb-4">
        <option value="female">Kobieta</option>
        <option value="male">Mężczyzna</option>
      </select>

      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Oblicz</button>

      {dose && (
        <p className="mt-4 text-green-600 font-semibold text-lg">Zalecana dawka: {dose} mg</p>
      )}

      {error && (
        <p className="mt-4 text-red-600 font-semibold">{error}</p>
      )}
    </div>
  );
}
