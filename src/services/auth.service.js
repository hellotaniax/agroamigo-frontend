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
   * @param {string} tipo - "agente" o "app"
   * @param {boolean} remember - Si es true, la sesión persiste al cerrar el navegador
   * @returns {Promise<Object>} Datos de respuesta del servidor
   */
  login: async (email, password, tipo = "app", remember = true) => {
    try {
      const response = await apiAuth.post('/login', { 
        email, 
        password,
        tipo 
      });

      const { token, usuario, user } = response.data;
      const userData = usuario || user || null;

      if (!token) {
        throw new Error('Token no recibido desde el servidor');
      }

      // Guardar sesión (localStorage o sessionStorage según "remember")
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

  /**
   * Cambiar contraseña del usuario autenticado
   * @param {string} passwordActual - Contraseña actual del usuario
   * @param {string} passwordNueva - Nueva contraseña
   * @param {string} tipo - "agente" o "app"
   * @returns {Promise<Object>} Respuesta del servidor
   */
  cambiarPassword: async (passwordActual, passwordNueva, tipo = "app") => {
    try {
      const token = getToken();
      
      if (!token) {
        throw new Error('No hay sesión activa');
      }

      const response = await apiAuth.put(
        '/cambiar-password',
        {
          passwordActual,
          passwordNueva,
          tipo
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        'Error al cambiar contraseña:',
        error.response?.data || error.message
      );
      throw error;
    }
  },

  /**
   * Solicitar código de recuperación de contraseña
   * @param {string} email - Email del usuario
   * @param {string} tipo - "agente" o "app"
   * @returns {Promise<Object>} Respuesta del servidor
   */
  solicitarRecuperacion: async (email, tipo = "app") => {
    try {
      const response = await apiAuth.post('/solicitar-recuperacion', {
        email,
        tipo
      });

      return response.data;
    } catch (error) {
      console.error(
        'Error al solicitar recuperación:',
        error.response?.data || error.message
      );
      throw error;
    }
  },

  /**
   * Restablecer contraseña con código de recuperación
   * @param {string} email - Email del usuario
   * @param {string} codigo - Código de recuperación de 6 dígitos
   * @param {string} passwordNueva - Nueva contraseña
   * @param {string} tipo - "agente" o "app"
   * @returns {Promise<Object>} Respuesta del servidor
   */
  restablecerPassword: async (email, codigo, passwordNueva, tipo = "app") => {
    try {
      const response = await apiAuth.post('/restablecer-password', {
        email,
        codigo,
        passwordNueva,
        tipo
      });

      return response.data;
    } catch (error) {
      console.error(
        'Error al restablecer contraseña:',
        error.response?.data || error.message
      );
      throw error;
    }
  },

  /**
   * Validar formato de contraseña
   * @param {string} password
   * @returns {Object} { valida: boolean, mensaje: string }
   */
  validarPassword: (password) => {
    if (!password) {
      return { valida: false, mensaje: 'La contraseña es requerida' };
    }
    
    if (password.length < 6) {
      return { 
        valida: false, 
        mensaje: 'La contraseña debe tener al menos 6 caracteres' 
      };
    }

    return { valida: true, mensaje: '' };
  },

  /**
   * Validar formato de email
   * @param {string} email
   * @returns {boolean}
   */
  validarEmail: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  /**
   * Validar código de recuperación (6 dígitos)
   * @param {string} codigo
   * @returns {Object} { valido: boolean, mensaje: string }
   */
  validarCodigo: (codigo) => {
    if (!codigo) {
      return { valido: false, mensaje: 'El código es requerido' };
    }

    if (!/^\d{6}$/.test(codigo)) {
      return { 
        valido: false, 
        mensaje: 'El código debe tener 6 dígitos' 
      };
    }

    return { valido: true, mensaje: '' };
  }
};

export default authService;