import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import { Toaster } from 'sonner'
import './index.css'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster richColors />
  </React.StrictMode>,
)
