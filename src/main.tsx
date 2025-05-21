
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './utils/firebase' // Import Firebase to initialize it

// Make sure to wait for DOM to be ready before rendering
const container = document.getElementById("root")
if (container) {
  const root = createRoot(container)
  root.render(<App />)
}
