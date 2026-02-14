import axios from 'axios';

// ===============================
// Configuración base
// ===============================
const API_APP_URL = import.meta.env.VITE_API_APP_URL || 'http://localhost:3276/api/app';
const API_AUTH_URL = import.meta.env.VITE_API_AUTH_URL || 'http://localhost:3276/api/app/auth';

// ===============================
// Instancia base para endpoints protegidos
// ===============================
export const apiApp = axios.create({
  baseURL: API_APP_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===============================
// Instancia para autenticación
// ===============================
export const apiAuth = axios.create({
  baseURL: API_AUTH_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===============================
// Interceptor: agregar JWT automáticamente
// ===============================
apiApp.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ===============================
// Interceptor: manejo global de errores
// ===============================
apiApp.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Sesión expirada o no autorizada');

      localStorage.removeItem('authToken');
      localStorage.removeItem('user');

      // Redirigir al login
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);
