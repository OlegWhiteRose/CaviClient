// Конфигурация для переключения между режимами работы
// Измени IP адрес на свой (узнать: npm run dev -- --host)

// IP адрес твоего компьютера в локальной сети
const LOCAL_IP = '192.168.1.72'; // <-- ЗАМЕНИ НА СВОЙ IP!

// Порты сервисов
const BACKEND_PORT = 8080;
const MINIO_PORT = 9000;

// Определяем, запущено ли приложение в Tauri
const isTauri = '__TAURI__' in window;

// Адреса для Tauri (прямое подключение к бекенду)
export const API_PROXY_ADDR = `http://${LOCAL_IP}:${BACKEND_PORT}`;
export const IMG_PROXY_ADDR = `http://${LOCAL_IP}:${MINIO_PORT}`;

// Выбор адреса в зависимости от режима
// В dev режиме React используем прокси (/api), в Tauri - прямой адрес
export const DEST_API = isTauri ? API_PROXY_ADDR : '';
export const DEST_IMG = isTauri ? IMG_PROXY_ADDR : '';

// Base URL для роутера (пустой для Tauri, /rip_frontend/ для GH Pages)
export const DEST_ROOT = isTauri ? '' : (import.meta.env.BASE_URL || '/');

export const IS_TAURI = isTauri;

export default {
  API_PROXY_ADDR,
  IMG_PROXY_ADDR,
  DEST_API,
  DEST_IMG,
  DEST_ROOT,
  IS_TAURI,
  LOCAL_IP,
};
