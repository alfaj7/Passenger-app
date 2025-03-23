import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {PassengerProvider} from './context/PassengerContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PassengerProvider>
      <App />
    </PassengerProvider>
  </StrictMode>,
)
