import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "./styles/header.css"
import "./styles/filter.css"
import "./styles/table.css"
import "./styles/loader.css"
import "./styles/description.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    {/* <App2 /> */}
  </React.StrictMode>,
)
