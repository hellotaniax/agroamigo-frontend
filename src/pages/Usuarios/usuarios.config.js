import { BiSearch } from 'react-icons/bi';

export const usuarioFormConfig = [
  { key: 'nombreusu', label: 'Nombre', type: 'text', required: true, placeholder: 'Ingrese nombre' },
  { key: 'apellidosusu', label: 'Apellidos', type: 'text', required: true, placeholder: 'Ingrese apellidos' },
  { key: 'emailusu', label: 'Email', type: 'email', required: true, placeholder: 'Ingrese correo electrónico' },
  { 
    key: 'passwordusu', 
    label: 'Contraseña', 
    type: 'password', // Asegúrate de que sea 'password' para ocultar caracteres
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
    key: 'rol',
    label: 'Rol',
    type: 'select',
    options: [], // Se llenará en la página
  },
  {
    key: 'estado',
    label: 'Estado',
    type: 'select',
    options: [], 
  },
];

export const usuariosColumns = [
  { header: 'Nombres', accessor: 'nombreusu' },
  { header: 'Apellidos', accessor: 'apellidosusu' },
  { header: 'Email', accessor: 'emailusu' },
  { header: 'Rol', accessor: 'rolNombre' },
  { header: 'Estado', accessor: 'estadoNombre' },
];