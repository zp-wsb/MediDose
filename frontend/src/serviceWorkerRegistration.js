export function register() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (let registration of registrations) {
        registration.unregister();
      }
    });

    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('✅ Service Worker zarejestrowany:', registration);
        })
        .catch(error => {
          console.error('❌ Rejestracja Service Workera nie powiodła się:', error);
        });
    });
  }
}
