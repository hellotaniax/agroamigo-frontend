// Mapeo global de estados a clases CSS
export const badgeStates = {
  Activo: 'activo',
  Borrador: 'borrador',
  Inactivo: 'inactivo',
};

// Función para obtener la clase CSS según el estado
export const getBadgeClass = (estado) => badgeStates[estado] || '';
