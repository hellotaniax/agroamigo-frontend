import { useState, useEffect, useCallback } from 'react';

export default function useMensajesData(options = {}) {
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { estado = '', search = '' } = options;

  const filterData = useCallback(
    (data) => data.filter(m =>
      (!estado || m.estadoNombre === estado) &&
      (!search || m.codigomen.toLowerCase().includes(search.toLowerCase()) ||
       m.contenidomen.toLowerCase().includes(search.toLowerCase()))
    ),
    [estado, search]
  );

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = [
          { idmen: 'MEN-01', codigomen: 'WELCOME', contenidomen: '¡Bienvenido! Soy AgroAmigo, tu asistente agrícola.', idest: 1, estadoNombre: 'Activo' },
          { idmen: 'MEN-02', codigomen: 'HELP', contenidomen: 'Para asistencia, escribe "ayuda".', idest: 1, estadoNombre: 'Activo' },
          { idmen: 'MEN-03', codigomen: 'GOODBYE', contenidomen: 'Gracias por usar AgroAmigo. ¡Hasta pronto!', idest: 2, estadoNombre: 'Borrador' },
        ];

        if (mounted) {
          setMensajes(filterData(data));
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => { mounted = false; };
  }, [filterData]);

  // Mapeo de estados
  const estadosMap = {
    '1': 'Activo',
    '2': 'Borrador',
    '3': 'Archivado',
  };

  // Función para agregar un mensaje
  const addMensaje = (data) => {
    const nextIdNumber = mensajes.length + 1;
    const newId = `MEN-${String(nextIdNumber).padStart(2, '0')}`;
    const newMensaje = {
      idmen: newId,
      codigomen: data.codigomen || '',
      contenidomen: data.contenidomen || '',
      idest: data.idest || '',
      estadoNombre: estadosMap[String(data.idest)] || data.estadoNombre || '',
    };

    setMensajes(prev => [newMensaje, ...prev]);
  };

  return { mensajes, loading, error, addMensaje };
}
