// Конфигурация для переключения между режимами работы
// Измени IP адрес на свой (узнать: ip addr | grep "inet " | grep -v 127.0.0.1)

// IP адрес твоего компьютера в локальной сети
const LOCAL_IP = '192.168.1.72'; // <-- ЗАМЕНИ НА СВОЙ IP!
const VITE_PORT = 3000;

// Порты сервисов
const BACKEND_PORT = 8080;
const MINIO_PORT = 9000;

// Определяем режим работы
const isTauri = '__TAURI__' in window;
const isDev = import.meta.env.DEV;

// Адреса для разных режимов
export const API_PROXY_ADDR = `http://${LOCAL_IP}:${BACKEND_PORT}`;
export const IMG_PROXY_ADDR = `http://${LOCAL_IP}:${MINIO_PORT}`;

// Локальный Vite proxy для GH Pages (HTTPS обязателен!)
const LOCAL_VITE_PROXY = `https://${LOCAL_IP}:${VITE_PORT}`;

// Адреса для localhost (Tauri dev и build)
const LOCALHOST_API = 'http://localhost:8080';
const LOCALHOST_IMG = 'http://localhost:9000';

// Выбор адреса API:
// - Tauri (dev или build): localhost бекенд
// - Dev режим браузера: пустой (Vite proxy через /api)
// - GH Pages: локальный Vite proxy
export const DEST_API = isTauri ? LOCALHOST_API : (isDev ? '' : LOCAL_VITE_PROXY);

// Выбор адреса изображений:
// - Tauri: localhost MinIO
// - Dev режим браузера: пустой (Vite proxy через /img-proxy)
// - GH Pages: локальный Vite proxy
export const DEST_IMG = isTauri ? LOCALHOST_IMG : (isDev ? '' : LOCAL_VITE_PROXY);

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
