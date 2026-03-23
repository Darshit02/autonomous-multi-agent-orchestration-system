import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { applyTheme } from './store/useThemeStore.ts'

// Apply persisted theme before first render to avoid flash
const stored = localStorage.getItem('ai-os-theme')
const theme = stored ? JSON.parse(stored)?.state?.theme : 'dark'
applyTheme(theme ?? 'dark')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
