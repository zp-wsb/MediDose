import { useState } from "react";
import DosingForm from "./components/DosingForm";
import History from "./components/History";

function App() {
  const [view, setView] = useState("form");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="mb-6">
        <button
          onClick={() => setView("form")}
          className={`px-4 py-2 mr-2 rounded ${
            view === "form" ? "bg-blue-600 text-white" : "bg-white border"
          }`}
        >
          Formularz
        </button>
        <button
          onClick={() => setView("history")}
          className={`px-4 py-2 rounded ${
            view === "history" ? "bg-blue-600 text-white" : "bg-white border"
          }`}
        >
          Historia
        </button>
      </div>

      {view === "form" ? <DosingForm /> : <History />}
    </div>
  );
}

export default App;
