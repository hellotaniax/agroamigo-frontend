import { useState, useEffect, useMemo, useCallback } from 'react';
import mensajesService from '../../services/mensajes.service'; 
import catalogosService from '../../services/catalogos.service';
import { toast } from 'react-hot-toast'; // 

export default function useMensajesData(filters = {}) {
  const [mensajesRaw, setMensajesRaw] = useState([]);
  const [estados, setEstados] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { estado = '', search = '' } = filters;

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [menData, estData] = await Promise.all([
        mensajesService.getAll(),
        catalogosService.getEstados(),
      ]);

      setEstados(estData);

      const enriched = menData.map(m => ({
        ...m,
        estadoNombre: estData.find(e => e.idest === m.idest)?.nombreest || '—',
      }));

      setMensajesRaw(enriched);
    } catch (err) {
      console.error('Error cargando mensajes:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const mensajes = useMemo(() => {
    return mensajesRaw.filter(m =>
      (!estado || m.estadoNombre === estado) &&
      (!search || 
        m.codigomen.toLowerCase().includes(search.toLowerCase()) || 
        m.contenidomen.toLowerCase().includes(search.toLowerCase()))
    );
  }, [mensajesRaw, estado, search]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ✅ 2. Implementación de funciones con toast.promise
  return {
    mensajes,
    mensajesRaw,
    estados,      
    loading,
    error,
    reload: loadData,

    // CREAR MENSAJE
    addMensaje: async (data) => {
      return toast.promise(
        (async () => {
          await mensajesService.create(data);
          await loadData();
        })(),
        {
          loading: 'Enviando mensaje...',
          success: '¡Mensaje guardado exitosamente!',
          error: 'Error al guardar el mensaje.',
        }
      );
    },

    // ACTUALIZAR MENSAJE (Necesario para que la edición muestre toast)
    updateMensaje: async (id, data) => {
      return toast.promise(
        (async () => {
          await mensajesService.update(id, data);
          await loadData();
        })(),
        {
          loading: 'Actualizando mensaje...',
          success: '¡Cambios guardados correctamente!',
          error: 'No se pudo actualizar el mensaje.',
        }
      );
    },

    // ELIMINAR MENSAJE
    deleteMensaje: async (id) => {
      return toast.promise(
        (async () => {
          await mensajesService.remove(id);
          await loadData();
        })(),
        {
          loading: 'Eliminando mensaje...',
          success: 'Mensaje eliminado con éxito.',
          error: 'Error al intentar eliminar el mensaje.',
        }
      );
    }
  };
}