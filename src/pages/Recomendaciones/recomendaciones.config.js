import { BiSearch } from 'react-icons/bi';

/**
 * ===============================
 * Configuración del formulario
 * ===============================
 */
export const recomendacionFormConfig = [
  {
    key: 'titulorec',
    label: 'Título',
    type: 'text',
    required: true,
    placeholder: 'Ingrese el título de la recomendación',
  },
  {
    key: 'descripcionrec',
    label: 'Descripción',
    type: 'text',
    required: true,
    placeholder: 'Ingrese la descripción detallada',
  },
  {
    key: 'idest',
    label: 'Estado',
    type: 'select',
    required: true,
    options: [], // ← Se llena dinámicamente desde catalogosService.getEstados()
  },
  {
    key: 'idpri',
    label: 'Prioridad',
    type: 'select',
    required: true,
    options: [], // ← Se llena dinámicamente desde catalogosService.getPrioridades()
  },
];

/**
 * ===============================
 * Configuración de filtros
 * ===============================
 */
export const recomendacionesFiltersConfig = [
  {
    key: 'search',
    label: 'Buscar recomendación',
    type: 'text',
    placeholder: 'Buscar por título o descripción...',
    icon: <BiSearch />,
  },
  {
    key: 'estado',
    label: 'Estado',
    type: 'select',
    options: [], // ← Se llena dinámicamente con los nombres de estados
  },
  {
    key: 'priority',
    label: 'Prioridad',
    type: 'select',
    options: [], // ← Se llena dinámicamente con los nombres de prioridades
  },
];

/**
 * ===============================
 * Columnas de la tabla
 * ===============================
 */
export const recomendacionesColumns = [
  { header: 'Título', accessor: 'titulorec' },
  { header: 'Descripción', accessor: 'descripcionrec' },
  { header: 'Prioridad', accessor: 'prioridadNombre' }, // Nombre enriquecido por el hook
  { header: 'Estado', accessor: 'estadoNombre' },       // Nombre enriquecido por el hook
];
