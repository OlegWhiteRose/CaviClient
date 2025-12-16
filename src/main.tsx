import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { registerSW } from 'virtual:pwa-register';
import { store } from '@/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/base.css';
import App from './App';

// Название репозитория для GitHub Pages (поменяй на своё)
const basename = import.meta.env.BASE_URL;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);

// Регистрация Service Worker для PWA
if ('serviceWorker' in navigator) {
  registerSW();
}
