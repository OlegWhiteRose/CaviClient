import { envConfig } from '@/config/env';
import { tokenStorage } from './tokenStorage';
import type { LoginResponse } from '@/types/cavi';

const API_BASE = envConfig.API_BASE_URL.replace(/\/$/, '');

export const login = async (username: string, password: string) => {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

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
    await fetch(`${API_BASE}/api/auth/logout`, {
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

  const response = await fetch(`${API_BASE}/api/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) {
    tokenStorage.clear();
    return null;
  }

  const data: { access_token: string; refresh_token: string } = await response.json();
  tokenStorage.setTokens(data.access_token, data.refresh_token);
  return data.access_token;
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

