import { useState, useEffect, useMemo, useCallback } from 'react'; // Agregamos useCallback
import fertilizantesService from '../../services/fertilizantes.service';
import catalogosService from '../../services/catalogos.service';
import { toast } from 'react-hot-toast'; 

export default function useFertilizantesData(filters = {}) {
  const [fertilizantesRaw, setFertilizantesRaw] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { estado = '', nombre = '', tipo = '' } = filters;

  // Convertimos loadData a useCallback para estabilidad
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [fertData, tipos, estados] = await Promise.all([
        fertilizantesService.getAll(),
        catalogosService.getTiposFertilizantes(),
        catalogosService.getEstados(),
      ]);

      const enriched = fertData.map(f => ({
        ...f,
        tipoNombre: tipos.find(t => t.idtfer === f.idtfer)?.nombretfer || '—',
        estadoNombre: estados.find(e => e.idest === f.idest)?.nombreest || '—',
      }));

      setFertilizantesRaw(enriched);
    } catch (err) {
      console.error('Error cargando fertilizantes:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fertilizantes = useMemo(() => {
    return fertilizantesRaw.filter(f =>
      (!estado || f.estadoNombre === estado) &&
      (!tipo || f.tipoNombre === tipo) &&
      (!nombre || f.nombrefer.toLowerCase().includes(nombre.toLowerCase()))
    );
  }, [fertilizantesRaw, estado, tipo, nombre]);


  const addFertilizante = async (data) => {
    return toast.promise(
      (async () => {
        await fertilizantesService.create(data);
        await loadData();
      })(),
      {
        loading: 'Guardando fertilizante...',
        success: '¡Fertilizante agregado con éxito!',
        error: 'Error al intentar guardar.',
      }
    );
  };

  const updateFertilizante = async (id, data) => {
    return toast.promise(
      (async () => {
        await fertilizantesService.update(id, data);
        await loadData();
      })(),
      {
        loading: 'Actualizando datos...',
        success: '¡Cambios guardados correctamente!',
        error: 'No se pudo actualizar el fertilizante.',
      }
    );
  };

  const deleteFertilizante = async (id) => {
    return toast.promise(
      (async () => {
        await fertilizantesService.remove(id);
        await loadData();
      })(),
      {
        loading: 'Eliminando...',
        success: 'Fertilizante eliminado.',
        error: 'Error al eliminar.',
      }
    );
  };

  useEffect(() => { loadData(); }, [loadData]);

  return {
    fertilizantes,
    loading,
    error,
    reload: loadData,
    addFertilizante,
    updateFertilizante,
    deleteFertilizante,
  };
}