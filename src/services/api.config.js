import axios from 'axios';
import { clearSession } from '../utils/sessionManager';

// ===============================
// Configuración base
// ===============================
const API_APP_URL =
  import.meta.env.VITE_API_APP_URL || 'http://localhost:3276/api/app';

const API_AUTH_URL =
  import.meta.env.VITE_API_AUTH_URL || 'http://localhost:3276/api/app/auth';

// ===============================
// Instancia para endpoints protegidos
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
    // leer token desde localStorage o sessionStorage
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

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
    const status = error.response?.status;

    if (status === 401) {
      console.warn('Sesión expirada o no autorizada');
      clearSession(); // elimina token y usuario
      window.location.replace('/login'); // redirección segura
    }

    if (status === 403) {
      console.warn('Acceso denegado');
    }

    if (status >= 500) {
      console.error('Error del servidor');
    }

    return Promise.reject(error);
  }
);

// ===============================
// Interceptor opcional para auth
// ===============================
apiApp.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

    // 🔍 DEBUG - BORRALO DESPUÉS
    console.log('🔑 Token:', token);
    console.log('📍 URL completa:', config.baseURL + config.url);
    console.log('📤 Headers:', config.headers);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
