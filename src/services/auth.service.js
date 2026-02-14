import { apiAuth } from './api.config';
import { clearSession, saveSession, getToken, getUser } from '../utils/sessionManager';

/**
 * Servicio de Autenticación
 * Maneja las peticiones al backend y la gestión de la sesión local.
 */
export const authService = {
  /**
   * Iniciar sesión
   * @param {string} email
   * @param {string} password
   * @param {boolean} remember - Si es true, la sesión persiste al cerrar el navegador
   * @returns {Promise<Object>} Datos de respuesta del servidor
   */
  login: async (email, password, remember = true) => {
    try {
      const response = await apiAuth.post('/login', { email, password });

      // Extraemos token y datos de usuario (soportando ambas variantes de nombre: usuario/user)
      const { token, usuario, user } = response.data;
      const userData = usuario || user || null;

      if (!token) {
        throw new Error('Token no recibido desde el servidor');
      }

      // Guardar sesión usando el utility (maneja localStorage o sessionStorage internamente)
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
   * Limpia los datos de almacenamiento local.
   */
  logout: () => {
    clearSession();
  },

  /**
   * Obtener los datos del usuario actual desde la sesión
   * @returns {Object|null}
   */
  getCurrentUser: () => {
    return getUser();
  },

  /**
   * Verificar si existe un token activo
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!getToken();
  },

  /**
   * Obtener el token JWT actual
   * @returns {string|null}
   */
  getToken: () => {
    return getToken();
  },
};

export default authService;