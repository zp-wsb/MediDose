import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import DosingForm from './components/DosingForm';
import History from './components/History';

function App() {
  const [user, setUser] = useState(() => localStorage.getItem('user'));
  const [view, setView] = useState('form');
  const [authMode, setAuthMode] = useState('login'); // 'login' lub 'register'

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setAuthMode('login'); // wróć do ekranu logowania
  };

  if (!user) {
    return authMode === 'login' ? (
      <LoginForm
        onLogin={setUser}
        onSwitchToRegister={() => setAuthMode('register')}
      />
    ) : (
      <RegisterForm onSwitchToLogin={() => setAuthMode('login')} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <button
            onClick={() => setView('form')}
            className={`px-4 py-2 mr-2 rounded ${view === 'form' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Formularz
          </button>
          <button
            onClick={() => setView('history')}
            className={`px-4 py-2 rounded ${view === 'history' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Historia
          </button>
        </div>
        <div>
          <span className="mr-4 font-semibold">Zalogowano jako: {user}</span>
          <button onClick={handleLogout} className="text-red-600 underline">
            Wyloguj
          </button>
        </div>
      </div>

      {view === 'form' ? <DosingForm /> : <History />}
    </div>
  );
}

export default App;
