import { useState, useEffect, useMemo, useCallback } from 'react';
import recomendacionesService from '../../services/recomendaciones.service'; 
import catalogosService from '../../services/catalogos.service';

export default function useRecomendacionesData(filters = {}) {
  const [recomendacionesRaw, setRecomendacionesRaw] = useState([]);
  // NUEVOS ESTADOS: Necesarios para que la página genere los config
  const [estados, setEstados] = useState([]); 
  const [prioridades, setPrioridades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { estado = '', priority = '', search = '' } = filters;

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [recData, estData, priData] = await Promise.all([
        recomendacionesService.getAll(),
        catalogosService.getEstados(),
        catalogosService.getPrioridades(),
      ]);

      // Guardamos los catálogos crudos para los selectores
      setEstados(estData);
      setPrioridades(priData);

      const enriched = recData.map(r => ({
        ...r,
        estadoNombre: estData.find(e => e.idest === r.idest)?.nombreest || '—',
        prioridadNombre: priData.find(p => p.idpri === r.idpri)?.nombrepri || '—',
      }));

      setRecomendacionesRaw(enriched);
    } catch (err) {
      console.error('Error cargando recomendaciones:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const recomendaciones = useMemo(() => {
    return recomendacionesRaw.filter(r =>
      (!estado || r.estadoNombre === estado) &&
      (!priority || r.prioridadNombre === priority) &&
      (!search || 
        r.titulorec.toLowerCase().includes(search.toLowerCase()) || 
        r.descripcionrec.toLowerCase().includes(search.toLowerCase()))
    );
  }, [recomendacionesRaw, estado, priority, search]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    recomendaciones,
    recomendacionesRaw,
    estados,      
    prioridades,  
    loading,
    error,
    reload: loadData,
    addRecomendacion: async (data) => {
      await recomendacionesService.create(data);
      await loadData();
    },
    deleteRecomendacion: async (id) => {
      await recomendacionesService.remove(id);
      await loadData();
    }
  };
}