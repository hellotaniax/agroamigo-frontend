import { apiApp } from './api.config';

// ==============================
// TIPOS DE CULTIVO
// ==============================
const getTiposCultivo = async () => {
  const response = await apiApp.get('/tipos-cultivos');
  return response.data;
};

// ==============================
// ESTADOS
// ==============================
const getEstados = async () => {
  const response = await apiApp.get('/estados');
  return response.data;
};

// ==============================
// EXPORT
// ==============================
const catalogosService = {
  getTiposCultivo,
  getEstados,
};

export default catalogosService;
