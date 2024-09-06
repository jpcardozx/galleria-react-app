import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';  // Se houver um arquivo de estilos globais

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
