import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProvider } from './contexts/AppContext';
import App from './App';
import './index.css';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);