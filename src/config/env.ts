const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const DEFAULT_USERNAME = import.meta.env.VITE_DEFAULT_USERNAME || 'user1';
const DEFAULT_PASSWORD = import.meta.env.VITE_DEFAULT_PASSWORD || 'password';

export const envConfig = {
  API_BASE_URL,
  DEFAULT_USERNAME,
  DEFAULT_PASSWORD,
};

