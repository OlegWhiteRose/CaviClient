import { envConfig } from '@/config/env';
import { tokenStorage } from './tokenStorage';
import { refreshAccessToken } from './auth';
import type { ApiError } from '@/types/cavi';

const API_BASE = envConfig.API_BASE_URL.replace(/\/$/, '');

interface FetchOptions extends RequestInit {
  auth?: boolean;
  parseJson?: boolean;
}

const handleResponse = async <T>(response: Response, parseJson: boolean): Promise<T> => {
  if (!response.ok) {
    const error: ApiError = new Error('Request failed');
    error.status = response.status;
    try {
      const payload = await response.json();
      error.message = payload?.message ?? error.message;
    } catch {
      error.message = response.statusText || error.message;
    }
    throw error;
  }

  if (!parseJson) {
    return undefined as T;
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }

  return undefined as T;
};

export const apiFetch = async <T>(path: string, options: FetchOptions = {}): Promise<T> => {
  const { auth = true, parseJson = true, headers, ...rest } = options;
  const finalHeaders = new Headers(headers);

  if (auth) {
    const token = tokenStorage.getAccess();
    if (token) {
      finalHeaders.set('Authorization', `Bearer ${token}`);
    }
  }

  if (!(rest.body instanceof FormData) && rest.method && rest.method !== 'GET') {
    finalHeaders.set('Content-Type', 'application/json');
  }

  const request = () =>
    fetch(`${API_BASE}${path}`, {
      ...rest,
      headers: finalHeaders,
    });

  let response = await request();

  if (response.status === 401 && auth) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      finalHeaders.set('Authorization', `Bearer ${newToken}`);
      response = await request();
    } else {
      tokenStorage.clear();
    }
  }

  return handleResponse<T>(response, parseJson);
};

