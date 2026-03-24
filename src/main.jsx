import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/valima" replace />} />
        <Route path="/valima" element={<App />} />
        <Route path="/baraat" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
