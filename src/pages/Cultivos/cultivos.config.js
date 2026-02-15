import { BiSearch } from 'react-icons/bi';

/**
 * ===============================
 * Configuración del formulario
 * ⚠️ Opciones dinámicas desde backend
 * ===============================
 */
export const cultivoFormConfig = [
  {
    key: 'nombrecul',
    label: 'Nombre',
    type: 'text',
    required: true,
    placeholder: 'Ingrese nombre del cultivo',
  },
  {
    key: 'idtcul',
    label: 'Tipo de cultivo',
    type: 'select',
    required: true,
    options: [], // ← se llenan dinámicamente desde la API
  },
  {
    key: 'idest',
    label: 'Estado',
    type: 'select',
    required: true,
    options: [], // ← se llenan dinámicamente desde la API
  },
];

/**
 * ===============================
 * Configuración de filtros
 * ===============================
 */
export const cultivosFiltersConfig = [
  {
    key: 'search',
    label: 'Buscar cultivo',
    type: 'text',
    placeholder: 'Buscar por nombre de cultivo...',
    icon: <BiSearch />,
  },
  {
    key: 'state',
    label: 'Estado',
    type: 'select',
    options: [], // ← se llenan desde catálogo de estados
  },
  {
    key: 'date',
    label: 'Fecha',
    type: 'date',
  },
];

/**
 * ===============================
 * Columnas de la tabla
 * ===============================
 */
export const cultivosColumns = [
  { header: 'Nombre', accessor: 'nombrecul' },
  { header: 'Tipo', accessor: 'tipoNombre' },
  { header: 'Estado', accessor: 'estadoNombre' },
  { header: 'Creación', accessor: 'creacioncul' },
];
