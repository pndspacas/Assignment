import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './global.css';
import './styles/description.css';
import './styles/filter.css';
import './styles/footer.css';
import './styles/header.css';
import './styles/loader.css';
import './styles/table.css';
import './styles/fetchMovie.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
