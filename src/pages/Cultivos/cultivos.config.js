
import { BiSearch } from 'react-icons/bi';


export const cultivoFormConfig = [
  { key: 'nombrecul', label: 'Nombre', type: 'text', required: true, placeholder: 'Ingrese nombre del cultivo' },
  { key: 'idtcul', label: 'Tipo de cultivo', type: 'select', required: true, options: [
    { value: '', label: 'Seleccione tipo...' },
    { value: '1', label: 'Hortaliza' },
    { value: '2', label: 'Fruta' },
    { value: '3', label: 'Grano' },
    { value: '99', label: 'Otro' },
  ] },
  { key: 'idest', label: 'Estado', type: 'select', required: true, options: [
    { value: '', label: 'Seleccione estado...' },
    { value: '1', label: 'Activo' },
    { value: '2', label: 'Archivado' },
    { value: '3', label: 'Borrador' },
  ] },
];

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
    options: [
      { value: '', label: 'Todos' },
      { value: 'Activo', label: 'Activo' },
      { value: 'Borrador', label: 'Borrador' },  
      { value: 'Archivado', label: 'Archivado' },   
    ],
  },
  {
    key: 'date',
    label: 'Fecha',
    type: 'date',
  },
];

export const cultivosColumns = [
  { header: 'ID', accessor: 'idcul' },
  { header: 'Nombre', accessor: 'nombrecul' },
  { header: 'Tipo', accessor: 'tipoNombre' },
  { header: 'Estado', accessor: 'estadoNombre' },
  { header: 'Creación', accessor: 'creacioncul' },
];
