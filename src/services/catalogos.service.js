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
// TIPOS DE FERTILIZANTES
// ==============================
const getTiposFertilizantes = async () => {
  const response = await apiApp.get('/tipos-fertilizantes');
  return response.data;
};

// ==============================
// FORMAS DE APLICACIÓN
// ==============================
const getFormasAplicacion = async () => {
  const response = await apiApp.get('/formas-aplicacion');
  return response.data;
};

// ==============================
// ETAPAS
// ==============================
const getEtapas = async () => {
  const response = await apiApp.get('/etapas');
  return response.data;
};

// ==============================
// PRIORIDADES
// ==============================
const getPrioridades = async () => {
  const response = await apiApp.get('/prioridades');
  return response.data;
};

// ==============================
// ROLES
// ==============================
const getRoles = async () => {
  const response = await apiApp.get('/roles');
  return response.data;
};


// ==============================
// EXPORT
// ==============================
const catalogosService = {
  getTiposCultivo,
  getEstados,
  getTiposFertilizantes,
  getFormasAplicacion,
  getEtapas,
  getPrioridades,
  getRoles,
};

export default catalogosService;
