export const toastConfig = {
  position: "top-right",
  reverseOrder: false,
  toastOptions: {
    // Clase base (definida en tu index.css)
    className: 'toast-base',
    
    // Configuración ÉXITO
    success: {
      className: 'toast-base toast-success',
      iconTheme: { 
        primary: '#2d5a27',
        secondary: '#e8f5e9'
      },
    },

    // Configuración ERROR
    error: {
      className: 'toast-base toast-error',
      iconTheme: {
        primary: '#c62828',
        secondary: '#ffebee',
      },
    },

    // Configuración CARGANDO
    loading: {
      className: 'toast-base toast-loading',
    },
  }
};