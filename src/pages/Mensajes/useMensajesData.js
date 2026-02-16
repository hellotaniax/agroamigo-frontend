import { useState, useEffect, useMemo, useCallback } from 'react';
import mensajesService from '../../services/mensajes.service'; 
import catalogosService from '../../services/catalogos.service';

export default function useMensajesData(filters = {}) {
  const [mensajesRaw, setMensajesRaw] = useState([]);
  // NUEVOS ESTADOS: Necesarios para que la página genere los config
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

      // Guardamos los catálogos crudos para los selectores
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

  return {
    mensajes,
    mensajesRaw,
    estados,      
    loading,
    error,
    reload: loadData,
    addMensaje: async (data) => {
      await mensajesService.create(data);
      await loadData();
    },
    deleteMensaje: async (id) => {
      await mensajesService.remove(id);
      await loadData();
    }
  };
}