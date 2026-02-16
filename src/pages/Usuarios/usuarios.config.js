import { BiSearch } from 'react-icons/bi';

export const usuarioFormConfig = [
  { key: 'nombreusu', label: 'Nombre', type: 'text', required: true, placeholder: 'Ingrese nombre' },
  { key: 'apellidosusu', label: 'Apellidos', type: 'text', required: true, placeholder: 'Ingrese apellidos' },
  { key: 'emailusu', label: 'Email', type: 'text', required: true, placeholder: 'Ingrese correo electrónico' },
  { 
    key: 'contraseniausu', 
    label: 'Contraseña', 
    type: 'text', 
    required: true, 
    placeholder: 'Defina una contraseña inicial' 
  },
  { key: 'idrol', label: 'Rol de Usuario', type: 'select', required: true, options: [] },
  { key: 'idest', label: 'Estado', type: 'select', required: true, options: [] },
];

export const usuariosFiltersConfig = [
  {
    key: 'search',
    label: 'Buscar usuario',
    type: 'text',
    placeholder: 'Buscar por nombre o email...',
    icon: <BiSearch />,
  },
  {
    key: 'estado',
    label: 'Estado',
    type: 'select',
    options: [], 
  },
];

export const usuariosColumns = [
  { header: 'ID', accessor: 'idusu' },
  { header: 'Nombre', accessor: 'nombreusu' },
  { header: 'Apellidos', accessor: 'apellidosusu' },
  { header: 'Email', accessor: 'emailusu' },
  { header: 'Rol', accessor: 'rolNombre' },
  { header: 'Estado', accessor: 'estadoNombre' },
];