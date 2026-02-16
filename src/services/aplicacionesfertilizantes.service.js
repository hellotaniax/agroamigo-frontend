import { apiApp } from './api.config';

// CORRECCIÓN: Usamos la ruta exacta de tu API
const BASE_URL = '/aplicaciones-fertilizantes';

const aplicacionesService = {
  getAll: async () => {
    const response = await apiApp.get(BASE_URL);
    return response.data;
  },

  getById: async (id) => {
    // id es el código APL-XXXX
    const response = await apiApp.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  create: async (data) => {
    // data contiene: idfer, idfor, ideta, dosisminapl, dosismaxapl, recomendacionapl
    const response = await apiApp.post(BASE_URL, data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await apiApp.put(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  remove: async (id) => {
    const response = await apiApp.delete(`${BASE_URL}/${id}`);
    return response.data;
  }
};

export default aplicacionesService;