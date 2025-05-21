
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeAdminUsers } from './services/authService'

// Initialize admin users on app start
initializeAdminUsers()
  .then(() => {
    console.log('Firebase and admin users initialized');
    
    // Make sure to wait for DOM to be ready before rendering
    const container = document.getElementById("root")
    if (container) {
      const root = createRoot(container)
      root.render(<App />)
    }
  })
  .catch(error => {
    console.error('Failed to initialize Firebase:', error);
  });
