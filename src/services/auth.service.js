import { apiAuth } from './api.config';

// Claves centralizadas
const TOKEN_KEY = 'authToken';
const USER_KEY = 'user';

export const authService = {
  /**
   * Iniciar sesión
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>}
   */
  login: async (email, password) => {
    try {
      const response = await apiAuth.post('/login', { email, password });

      // Manejo flexible de respuesta del backend
      const { token, usuario, user } = response.data;
      const userData = usuario || user || null;

      if (!token) {
        throw new Error('Token no recibido desde el servidor');
      }

      // Guardar en localStorage
      localStorage.setItem(TOKEN_KEY, token);

      if (userData) {
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
      }

      return response.data;
    } catch (error) {
      console.error('Error en login:', error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Cerrar sesión
   */
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    window.location.href = '/login';
  },

  /**
   * Obtener usuario actual
   * @returns {Object|null}
   */
  getCurrentUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  /**
   * Verificar autenticación
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Obtener token JWT
   * @returns {string|null}
   */
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },
};

export default authService;
