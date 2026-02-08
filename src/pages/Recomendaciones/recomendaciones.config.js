import { BiSearch } from 'react-icons/bi';

export const recomendacionFormConfig = [
  { key: 'titulorec', label: 'Título', type: 'text', required: true, placeholder: 'Ingrese el título de la recomendación' },
  { key: 'descripcionrec', label: 'Descripción', type: 'text', required: true, placeholder: 'Ingrese la descripción de la recomendación' },
  { key: 'idest', label: 'Estado', type: 'select', required: true, options: [
    { value: '', label: 'Seleccione estado...' },
    { value: '1', label: 'Activo' },
    { value: '2', label: 'Borrador' },
    { value: '3', label: 'Archivado' },
  ] },
  { key: 'idpri', label: 'Prioridad', type: 'select', required: true, options: [
    { value: '', label: 'Seleccione prioridad...' },
    { value: '1', label: 'Alta' },
    { value: '2', label: 'Media' },
    { value: '3', label: 'Baja' },
  ] },
];

export const recomendacionesFiltersConfig = [
  {
    key: 'search',
    label: 'Buscar recomendación',
    type: 'text',
    placeholder: 'Buscar por título o descripción...',
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
  {
    key: 'priority',
    label: 'Prioridad',
    type: 'select',
    options: [
      { value: '', label: 'Todas' },
      { value: 'Alta', label: 'Alta' },
      { value: 'Media', label: 'Media' },
      { value: 'Baja', label: 'Baja' },
    ],
  },
];

export const recomendacionesColumns = [
  { header: 'ID', accessor: 'idrec' },
  { header: 'Título', accessor: 'titulorec' },
  { header: 'Descripción', accessor: 'descripcionrec' },
  { header: 'Prioridad', accessor: 'prioridadNombre' },
  { header: 'Estado', accessor: 'estadoNombre' },
];

export const estadoBadgeClass = {
  Activo: 'activo',
  Borrador: 'borrador',
  Archivado: 'archivado',
};
