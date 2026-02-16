import { apiApp } from './api.config';

const BASE_URL = '/usuarios';

const usuariosService = {
  // =========================
  // Obtener todos
  // =========================
  getAll: async () => {
    // Retorna la lista de usuarios: idusu, nombreusu, emailusu, idrol, etc.
    const response = await apiApp.get(BASE_URL);
    return response.data;
  },

  // =========================
  // Obtener por ID
  // =========================
  getById: async (id) => {
    // El ID debe ser el código alfanumérico (ej: USU-0001)
    const response = await apiApp.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  // =========================
  // Crear Usuario
  // =========================
  create: async (data) => {
    // Requiere: nombreusu, apellidosusu, emailusu, passwordusu, idest, idrol
    const response = await apiApp.post(BASE_URL, data);
    return response.data;
  },

  // =========================
  // Actualizar Usuario
  // =========================
  update: async (id, data) => {
    // Permite modificar datos del usuario existente por su ID (USU-XXXX)
    const response = await apiApp.put(`${BASE_URL}/${id}`, data);
    return response.data;
  }
};

export default usuariosService;