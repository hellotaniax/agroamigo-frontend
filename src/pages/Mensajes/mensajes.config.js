
import { BiSearch } from 'react-icons/bi';

// Configuración del formulario para agregar/editar mensajes
export const mensajeFormConfig = [
  { key: 'codigomen', label: 'Código', type: 'text', required: true, placeholder: 'Ingrese código único del mensaje' },
  { key: 'contenidomen', label: 'Contenido', type: 'text', required: true, placeholder: 'Ingrese el contenido del mensaje' },
  { key: 'idest', label: 'Estado', type: 'select', required: true, options: [
    { value: '', label: 'Seleccione estado...' },
    { value: '1', label: 'Activo' },
    { value: '2', label: 'Borrador' },
    { value: '3', label: 'Archivado' },
  ] },
];

// Configuración de filtros
export const mensajesFiltersConfig = [
  {
    key: 'search',
    label: 'Buscar mensaje',
    type: 'text',
    placeholder: 'Buscar por código o contenido...',
    icon: <BiSearch />,
  },
  {
    key: 'state',
    label: 'Estado',
    type: 'select',
    options: [
      { value: '', label: 'Todos' },
      { value: 'Activo', label: 'Activo' },
      { value: 'Borrador', label: 'Borrador' },
      { value: 'Archivado', label: 'Archivado' },
    ],
  },
];

// Columnas de la tabla de mensajes
export const mensajesColumns = [
  { header: 'ID', accessor: 'idmen' },
  { header: 'Código', accessor: 'codigomen' },
  { header: 'Contenido', accessor: 'contenidomen' },
  { header: 'Estado', accessor: 'estadoNombre' },
];

export const estadoBadgeClass = {
  Activo: 'activo',
  Borrador: 'borrador',
  Archivado: 'archivado',
};
