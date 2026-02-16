import { BiSearch } from 'react-icons/bi';

/**
 * ===============================
 * Configuración del formulario
 * ⚠️ Opciones dinámicas desde backend
 * ===============================
 */
export const fertilizanteFormConfig = [
  {
    key: 'nombrefer',
    label: 'Nombre',
    type: 'text',
    required: true,
    placeholder: 'Ingrese nombre del fertilizante',
  },
  {
    key: 'idtfer',
    label: 'Tipo de fertilizante',
    type: 'select',
    required: true,
    options: [], // ← se llenan dinámicamente desde la API
  },
  {
    key: 'descripcionfer',
    label: 'Descripción',
    type: 'text',
    required: false,
    placeholder: 'Descripción del fertilizante (opcional)',
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
export const fertilizantesFiltersConfig = [
  {
    key: 'search',
    label: 'Buscar fertilizante',
    type: 'text',
    placeholder: 'Buscar por nombre...',
    icon: <BiSearch />,
  },
  {
    key: 'type',
    label: 'Tipo',
    type: 'select',
    options: [], // ← se llenan desde catálogo de tipos
  },
  {
    key: 'state',
    label: 'Estado',
    type: 'select',
    options: [], // ← se llenan desde catálogo de estados
  },
];

/**
 * ===============================
 * Columnas de la tabla
 * ===============================
 */
export const fertilizantesColumns = [
  { header: 'Nombre', accessor: 'nombrefer' },
  { header: 'Tipo', accessor: 'tipoNombre' },
  { header: 'Descripción', accessor: 'descripcionfer' },
  { header: 'Estado', accessor: 'estadoNombre' },
];