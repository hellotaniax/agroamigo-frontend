import { BiSearch } from 'react-icons/bi';

export const fertilizanteFormConfig = [
  { key: 'nombrefer', label: 'Nombre', type: 'text', required: true, placeholder: 'Ingrese nombre del fertilizante' },
  { key: 'idtfer', label: 'Tipo de fertilizante', type: 'select', required: true, options: [
    { value: '', label: 'Seleccione tipo...' },
    { value: '1', label: 'Nitrogenado' },
    { value: '2', label: 'Fosfatado' },
    { value: '3', label: 'Potásico' },
    { value: '4', label: 'Complejo NPK' },
    { value: '5', label: 'Micronutrientes' },
    { value: '99', label: 'Otro' },
  ] },
  { key: 'descripcionfer', label: 'Descripción', type: 'text', required: false, placeholder: 'Descripción del fertilizante (opcional)' },
  { key: 'idest', label: 'Estado', type: 'select', required: true, options: [
    { value: '', label: 'Seleccione estado...' },
    { value: '1', label: 'Activo' },
    { value: '2', label: 'Archivado' },
    { value: '3', label: 'Borrador' },
  ] },
];

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
    options: [
      { value: '', label: 'Todos' },
      { value: 'Nitrogenado', label: 'Nitrogenado' },
      { value: 'Fosfatado', label: 'Fosfatado' },
      { value: 'Potásico', label: 'Potásico' },
      { value: 'Complejo NPK', label: 'Complejo NPK' },
      { value: 'Micronutrientes', label: 'Micronutrientes' },
      { value: 'Otro', label: 'Otro' },
    ],
  },
  {
    key: 'state',
    label: 'Estado',
    type: 'select',
    options: [
      { value: '', label: 'Todos' },
      { value: 'Activo', label: 'Activo' },
      { value: 'Archivado', label: 'Archivado' },
      { value: 'Borrador', label: 'Borrador' },
    ],
  },
];

export const fertilizantesColumns = [
  { header: 'ID', accessor: 'idfer' },
  { header: 'Nombre', accessor: 'nombrefer' },
  { header: 'Tipo', accessor: 'tipoNombre' },
  { header: 'Descripción', accessor: 'descripcionfer' },
  { header: 'Estado', accessor: 'estadoNombre' },
];



export const tipoFertilizanteBadgeClass = {
  Nitrogenado: 'badge-primary',
  Fosfatado: 'badge-success',
  Potásico: 'badge-info',
  'Complejo NPK': 'badge-warning',
  Micronutrientes: 'badge-secondary',
  Otro: 'badge-light',
};

export const estadoBadgeClass = {
  Activo: 'activo',
  Archivado: 'archivado',
  Borrador: 'borrador',
};
