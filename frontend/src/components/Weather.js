import { useState } from "react";
import axios from "axios";

const API_KEY = "f0dc709270a1bb74869c62a008dfc5ac";

export default function Weather() {
  const [city, setCity] = useState("Warszawa");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [advice, setAdvice] = useState("");

  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},pl&units=metric&lang=pl&appid=${API_KEY}`
      );
      setWeather(res.data);
      setError(null);
      generateAdvice(res.data);
    } catch (err) {
      setWeather(null);
      setAdvice("");
      setError("Nie udało się pobrać danych pogodowych.");
      console.error(err);
    }
  };

  const generateAdvice = (data) => {
    const temp = data.main.temp;
    const condition = data.weather[0].main.toLowerCase();

    if (condition.includes("rain")) {
      setAdvice("🌂 Możliwy deszcz – weź parasol.");
    } else if (temp >= 28) {
      setAdvice("🌡 Uważaj na upał!");
    } else if (temp >= 24) {
      setAdvice("💧 Zadbaj o nawodnienie.");
    } else if (temp < 10) {
      setAdvice("🧥 Chłodno – ubierz się ciepło.");
    } else {
      setAdvice("✅ Pogoda wydaje się być w porządku.");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md max-w-md mx-auto mt-6">
      <h3 className="text-lg font-semibold mb-2">Sprawdź pogodę w Twoim mieście</h3>
      <div className="flex mb-4">
        <input
          className="border p-2 flex-1 rounded-l"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Nazwa miasta"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
        >
          Pobierz
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {weather && (
        <div className="mt-2">
          <p className="text-xl font-semibold">
            {weather.name}, {weather.sys.country}
          </p>
          <p>🌡 Temperatura: {weather.main.temp} °C</p>
          <p>☁️ Warunki: {weather.weather[0].description}</p>
          <p>💧 Wilgotność: {weather.main.humidity}%</p>
          <p>💨 Wiatr: {weather.wind.speed} m/s</p>
          <p className="mt-3 font-medium text-blue-700">{advice}</p>
        </div>
      )}
    </div>
  );
}
