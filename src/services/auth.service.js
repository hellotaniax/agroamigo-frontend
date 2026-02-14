import { apiAuth } from './api.config';
import { clearSession, saveSession, getToken, getUser } from '../utils/sessionManager';

// Claves centralizadas
const TOKEN_KEY = 'authToken';
const USER_KEY = 'user';

export const authService = {
  /**
   * Iniciar sesión
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} datos del usuario y token
   */
  login: async (email, password, remember = true) => {
    try {
      const response = await apiAuth.post('/login', { email, password });

      /**
       * El backend puede responder con:
       * { token, usuario }
       * { token, user }
       */
      const { token, usuario, user } = response.data;
      const userData = usuario || user || null;

      if (!token) {
        throw new Error('Token no recibido desde el servidor');
      }

      // Guardar sesión (almacenamiento persistente o de sesión según remember)
      saveSession({ token, user: userData }, remember);

      return response.data;
    } catch (error) {
      console.error(
        'Error en login:',
        error.response?.data || error.message
      );
      throw error;
    }
  },

  /**
   * Cerrar sesión
   * ⚠️ No redirige — la UI decide qué hacer
   */
  logout: () => {
    clearSession();
  },

  /**
   * Obtener usuario actual
   * @returns {Object|null}
   */
  getCurrentUser: () => {
    return getUser();
  },

  /**
   * Verificar autenticación
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!getToken();
  },

  /**
   * Obtener token JWT
   * @returns {string|null}
   */
  getToken: () => {
    return getToken();
  },
};

export default authService;