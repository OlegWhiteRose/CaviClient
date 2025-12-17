// В dev режиме используем пустой URL для работы через Vite proxy
// В production (GH Pages) используем URL локального прокси-сервера
// Пример: https://192.168.1.72:3000 — Vite dev server с HTTPS в локальной сети
const API_BASE_URL = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE_URL || '');
const DEFAULT_USERNAME = import.meta.env.VITE_DEFAULT_USERNAME || 'user1';
const DEFAULT_PASSWORD = import.meta.env.VITE_DEFAULT_PASSWORD || 'password123';

// IP адрес локального прокси (Vite dev server) для GH Pages
// Установи свой IP: export VITE_LOCAL_PROXY_URL=https://192.168.1.72:3000
const LOCAL_PROXY_URL = import.meta.env.VITE_LOCAL_PROXY_URL || '';

export const envConfig = {
  API_BASE_URL,
  DEFAULT_USERNAME,
  DEFAULT_PASSWORD,
  LOCAL_PROXY_URL,
};

