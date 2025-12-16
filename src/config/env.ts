// В dev режиме используем пустой URL для работы через Vite proxy
// В production используем полный URL бекенда
const API_BASE_URL = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE_URL || '');
const DEFAULT_USERNAME = import.meta.env.VITE_DEFAULT_USERNAME || 'user1';
const DEFAULT_PASSWORD = import.meta.env.VITE_DEFAULT_PASSWORD || 'password123';

export const envConfig = {
  API_BASE_URL,
  DEFAULT_USERNAME,
  DEFAULT_PASSWORD,
};

