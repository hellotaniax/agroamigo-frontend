import { apiApp } from './api.config';

const BASE_URL = '/cultivos';

const cultivosService = {
  // =========================
  // Obtener todos
  // =========================
  getAll: async () => {
    const response = await apiApp.get(BASE_URL);
    return response.data;
  },

  // =========================
  // Obtener por ID
  // =========================
  getById: async (id) => {
    const response = await apiApp.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  // =========================
  // Crear
  // =========================
  create: async (data) => {
    const response = await apiApp.post(BASE_URL, data);
    return response.data;
  },

  // =========================
  // Actualizar
  // =========================
  update: async (id, data) => {
    const response = await apiApp.put(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  // =========================
  // Eliminar
  // =========================
  remove: async (id) => {
    const response = await apiApp.delete(`${BASE_URL}/${id}`);
    return response.data;
  },
};

export default cultivosService;
