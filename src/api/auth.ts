import { envConfig } from '@/config/env';
import { tokenStorage } from './tokenStorage';
import type { LoginResponse } from '@/types/cavi';
import { DEST_API } from '@/config/target_config';

// Используем DEST_API для Tauri совместимости
const API_BASE = DEST_API || envConfig.API_BASE_URL.replace(/\/$/, '');

export const login = async (username: string, password: string) => {
  let response: Response;
  try {
    response = await fetch(`${API_BASE}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  } catch {
    throw new Error('Сервер недоступен');
  }

  if (!response.ok) {
    throw new Error('Не удалось выполнить вход');
  }

  const data: LoginResponse = await response.json();
  tokenStorage.setTokens(data.token, data.refresh_token);
  return data;
};

export const logout = async () => {
  const accessToken = tokenStorage.getAccess();
  const headers: HeadersInit = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : {};

  try {
    await fetch(`${API_BASE}/api/users/logout`, {
      method: 'POST',
      headers,
    });
  } finally {
    tokenStorage.clear();
  }
};

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = tokenStorage.getRefresh();
  if (!refreshToken) {
    return null;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE}/api/users/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  } catch {
    // Сервер недоступен
    return null;
  }

  if (!response.ok) {
    tokenStorage.clear();
    return null;
  }

  const data: LoginResponse = await response.json();
  tokenStorage.setTokens(data.token, data.refresh_token);
  return data.token;
};

let authPromise: Promise<LoginResponse> | null = null;

export const ensureAuth = async () => {
  const existingToken = tokenStorage.getAccess();
  if (existingToken) {
    return existingToken;
  }

  const refreshedToken = await refreshAccessToken();
  if (refreshedToken) {
    return refreshedToken;
  }

  if (!envConfig.DEFAULT_USERNAME || !envConfig.DEFAULT_PASSWORD) {
    throw new Error('Отсутствуют данные для авторизации. Укажите VITE_DEFAULT_USERNAME и VITE_DEFAULT_PASSWORD.');
  }

  if (!authPromise) {
    authPromise = login(envConfig.DEFAULT_USERNAME, envConfig.DEFAULT_PASSWORD);
    authPromise.finally(() => {
      authPromise = null;
    });
  }

  const result = await authPromise;
  return result.token;
};

export const register = async (username: string, password: string) => {
  const response = await fetch(`${API_BASE}/api/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Не удалось зарегистрироваться');
  }

  return response.json();
};

export const getCurrentUser = async () => {
  const accessToken = tokenStorage.getAccess();
  if (!accessToken) {
    throw new Error('Не авторизован');
  }

  const response = await fetch(`${API_BASE}/api/users/me`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error('Не удалось получить данные пользователя');
  }

  return response.json();
};

