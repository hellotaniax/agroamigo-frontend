// Mapa de permisos basado en middlewares del backend (agroamigoapi)
// Key: recurso (coincide con rutas "app.<recurso>"),
// value: acciones y roles permitidos.

export const permissionsMap = {
  usuarios: {
    read: ['administrador'],
    create: ['administrador'],
    update: ['administrador'],
    delete: ['administrador'],
  },

  cultivos: {
    read: ['administrador', 'agronomo', 'investigador'],
    create: ['agronomo', 'administrador'],
    update: ['agronomo', 'administrador'],
    delete: ['agronomo', 'administrador'],
  },

  fertilizantes: {
    read: ['administrador', 'agronomo', 'investigador'],
    create: ['agronomo', 'administrador'],
    update: ['agronomo', 'administrador'],
    delete: ['agronomo', 'administrador'],
  },

  aplicacionesfertilizantes: {
    read: ['administrador', 'agronomo', 'investigador'],
    create: ['agronomo', 'administrador'],
    update: ['agronomo', 'administrador'],
    delete: ['agronomo', 'administrador'],
  },

  formasaplicacion: {
    read: ['administrador', 'agronomo', 'investigador'],
    create: ['agronomo', 'administrador'],
    update: ['agronomo', 'administrador'],
    delete: ['agronomo', 'administrador'],
  },

  etapas: {
    read: ['administrador', 'agronomo', 'investigador'],
    create: ['agronomo', 'administrador'],
    update: ['agronomo', 'administrador'],
    delete: ['agronomo', 'administrador'],
  },

  tiposfertilizantes: {
    read: ['administrador', 'agronomo', 'investigador'],
    create: ['agronomo', 'administrador'],
    update: ['agronomo', 'administrador'],
    delete: ['agronomo', 'administrador'],
  },

  tiposcultivos: {
    read: ['administrador', 'agronomo', 'investigador'],
    create: ['agronomo', 'administrador'],
    update: ['agronomo', 'administrador'],
    delete: ['agronomo', 'administrador'],
  },

  mensajes: {
    read: ['administrador', 'agronomo', 'investigador'],
    create: ['investigador', 'administrador'],
    update: ['investigador', 'administrador'],
    delete: ['investigador', 'administrador'],
  },

  recomendaciones: {
    read: ['administrador', 'agronomo', 'investigador'],
    create: ['investigador', 'administrador'],
    update: ['investigador', 'administrador'],
    delete: ['investigador', 'administrador'],
  },

  estados: {
    read: ['administrador', 'agronomo', 'investigador'],
    create: ['investigador', 'administrador'],
    update: ['investigador', 'administrador'],
    delete: ['investigador', 'administrador'],
  },

  prioridades: {
    read: ['administrador', 'agronomo', 'investigador'],
    create: ['investigador', 'administrador'],
    update: ['investigador', 'administrador'],
    delete: ['investigador', 'administrador'],
  },

  roles: {
    read: ['administrador', 'agronomo', 'investigador'],
    create: ['administrador'],
    update: ['administrador'],
    delete: ['administrador'],
  }
};
