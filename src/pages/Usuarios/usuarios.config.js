import { BiSearch } from 'react-icons/bi';

export const usuarioFormConfig = [
  { key: 'nombreusu', label: 'Nombre', type: 'text', required: true, placeholder: 'Ingrese nombre' },
  { key: 'apellidosusu', label: 'Apellidos', type: 'text', required: true, placeholder: 'Ingrese apellidos' },
  { key: 'emailusu', label: 'Email', type: 'text', required: true, placeholder: 'Ingrese correo electrónico' },
  { key: 'contraseniausu', label: 'Contraseña', type: 'text', required: true, placeholder: 'Ingrese contraseña' },
  { key: 'idest', label: 'Estado', type: 'select', required: true, options: [
    { value: '', label: 'Seleccione estado...' },
    { value: '1', label: 'Activo' },
    { value: '2', label: 'Borrador' },
    { value: '3', label: 'Archivado' },
  ] },
];

export const usuariosFiltersConfig = [
  {
    key: 'search',
    label: 'Buscar usuario',
    type: 'text',
    placeholder: 'Buscar por nombre, apellido o email...',
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

export const usuariosColumns = [
  { header: 'ID', accessor: 'idusu' },
  { header: 'Nombre', accessor: 'nombreusu' },
  { header: 'Apellidos', accessor: 'apellidosusu' },
  { header: 'Email', accessor: 'emailusu' },
  { header: 'Estado', accessor: 'estadoNombre' },
];

export const estadoBadgeClass = {
  Activo: 'activo',
  Borrador: 'borrador',
  Archivado: 'archivado',
};
