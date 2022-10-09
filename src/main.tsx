import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { InputValueProvider } from './context/InputValueContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <InputValueProvider>
      <App />
    </InputValueProvider>
  </React.StrictMode>
);
