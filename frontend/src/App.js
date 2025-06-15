import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import DosingForm from './components/DosingForm';
import History from './components/History';
import Weather from './components/Weather';

function App() {
  const [user, setUser] = useState(() => localStorage.getItem('user'));
  const [view, setView] = useState('form');
  const [authMode, setAuthMode] = useState('login'); // 'login' lub 'register'

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setAuthMode('login');
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
        <div className="space-x-2">
          <button
            onClick={() => setView('form')}
            className={`px-4 py-2 rounded ${view === 'form' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Formularz
          </button>
          <button
            onClick={() => setView('history')}
            className={`px-4 py-2 rounded ${view === 'history' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Historia
          </button>
          <button
            onClick={() => setView('weather')}
            className={`px-4 py-2 rounded ${view === 'weather' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Pogoda
          </button>
        </div>
        <div>
          <span className="mr-4 font-semibold">Zalogowano jako: {user}</span>
          <button onClick={handleLogout} className="text-red-600 underline">
            Wyloguj
          </button>
        </div>
      </div>

      {view === 'form' && <DosingForm />}
      {view === 'history' && <History />}
      {view === 'weather' && <Weather />}
    </div>
  );
}

export default App;
