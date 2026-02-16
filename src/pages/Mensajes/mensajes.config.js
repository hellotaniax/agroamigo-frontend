import { BiSearch } from 'react-icons/bi';

/**
 * ===============================
 * Configuración del formulario
 * ===============================
 */
export const mensajeFormConfig = [
  {
    key: 'codigomen',
    label: 'Código',
    type: 'text',
    required: true,
    placeholder: 'Ingrese código único del mensaje',
  },
  {
    key: 'contenidomen',
    label: 'Contenido',
    type: 'text',
    required: true,
    placeholder: 'Ingrese el contenido del mensaje',
  },
  {
    key: 'idest',
    label: 'Estado',
    type: 'select',
    required: true,
    options: [], // ← Se llena dinámicamente desde catalogosService.getEstados()
  },
];

/**
 * ===============================
 * Configuración de filtros
 * ===============================
 */
export const mensajesFiltersConfig = [
  {
    key: 'search',
    label: 'Buscar mensaje',
    type: 'text',
    placeholder: 'Buscar por código o contenido...',
    icon: <BiSearch />,
  },
  {
    key: 'estado',
    label: 'Estado',
    type: 'select',
    options: [], // ← Se llena dinámicamente con los nombres de estados
  },
];

/**
 * ===============================
 * Columnas de la tabla
 * ===============================
 */
export const mensajesColumns = [
  { header: 'ID', accessor: 'idmen' },
  { header: 'Código', accessor: 'codigomen' },
  { header: 'Contenido', accessor: 'contenidomen' },
  { header: 'Estado', accessor: 'estadoNombre' }, // Nombre enriquecido por el hook
];
