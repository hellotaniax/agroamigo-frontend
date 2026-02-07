
import { BiSearch } from 'react-icons/bi';

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
      { value: 'Inactivo', label: 'Inactivo' },
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

export const estadoBadgeClass = {
  Activo: 'activo',
  Borrador: 'borrador',
  Inactivo: 'inactivo',
};
