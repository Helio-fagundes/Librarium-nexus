
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById("root");

if (rootElement) {
  // Reset any previous state in case of hot reloading
  if (process.env.NODE_ENV === 'development') {
    localStorage.removeItem('previousInitialization');
  }
  
  try {
    console.log("Rendering root component");
    createRoot(rootElement).render(
      <App />
    );
  } catch (error) {
    console.error("Error rendering React application:", error);
    // Show fallback UI in case of render errors
    rootElement.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
        <h1>Erro ao carregar a aplicação</h1>
        <p>Por favor, recarregue a página ou verifique o console para mais detalhes.</p>
      </div>
    `;
  }
} else {
  console.error("Element with ID 'root' not found in the document");
}
