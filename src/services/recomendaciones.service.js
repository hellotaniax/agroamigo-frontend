import { apiApp } from './api.config';

const BASE_URL = '/recomendaciones';

const recomendacionesService = {
  // =========================
  // Obtener todas
  // =========================
  getAll: async () => {
    // La API devuelve las recomendaciones ordenadas por prioridad y título
    const response = await apiApp.get(BASE_URL);
    return response.data;
  },

  // =========================
  // Obtener por ID
  // =========================
  getById: async (id) => {
    // Recuerda que el ID suele ser alfanumérico (ej: REC-0001)
    const response = await apiApp.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  // =========================
  // Crear
  // =========================
  create: async (data) => {
    // El objeto 'data' debe contener: titulorec, descripcionrec, idest, idpri
    const response = await apiApp.post(BASE_URL, data);
    return response.data;
  },

  // =========================
  // Actualizar
  // =========================
  // src/services/recomendaciones.service.js
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

export default recomendacionesService;