import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { registerSW } from 'virtual:pwa-register';
import { store } from '@/store';
import { DEST_ROOT, IS_TAURI } from '@/config/target_config';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/base.css';
import App from './App';

// Для Tauri используем пустой basename, для GH Pages - из BASE_URL
const basename = IS_TAURI ? '' : DEST_ROOT;

// Компонент для инициализации Tauri
function TauriInit({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (IS_TAURI) {
      import('@tauri-apps/api/core')
        .then(({ invoke }) => {
          invoke('tauri', { cmd: 'create' })
            .then(() => console.log('Tauri launched'))
            .catch(() => console.log('Tauri invoke not available'));
        })
        .catch(() => console.log('Running in browser mode'));
    }
  }, []);

  return <>{children}</>;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <TauriInit>
        <BrowserRouter basename={basename}>
          <App />
        </BrowserRouter>
      </TauriInit>
    </Provider>
  </StrictMode>,
);

// Регистрация Service Worker для PWA (только не в Tauri)
if ('serviceWorker' in navigator && !IS_TAURI) {
  registerSW();
}
