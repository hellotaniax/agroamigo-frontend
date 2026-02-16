import { useState, useEffect, useMemo } from 'react';
import fertilizantesService from '../../services/fertilizantes.service';
import catalogosService from '../../services/catalogos.service';

export default function useFertilizantesData(filters = {}) {
  const [fertilizantesRaw, setFertilizantesRaw] = useState([]); // datos originales sin filtrar
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { estado = '', nombre = '', tipo = '' } = filters;

  // Cargar datos desde backend (solo una vez)
  const loadData = async () => {
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
  };

  // Filtrar en memoria con useMemo (se recalcula solo si cambian filtros o datos)
  const fertilizantes = useMemo(() => {
    return fertilizantesRaw.filter(f =>
      (!estado || f.estadoNombre === estado) &&
      (!tipo || f.tipoNombre === tipo) &&
      (!nombre || f.nombrefer.toLowerCase().includes(nombre.toLowerCase()))
    );
  }, [fertilizantesRaw, estado, tipo, nombre]);

  // Agregar fertilizante
  const addFertilizante = async (data) => {
    try {
      await fertilizantesService.create(data);
      await loadData(); // recargar lista original
    } catch (err) {
      console.error('Error agregando fertilizante:', err);
      throw err;
    }
  };

  // Actualizar fertilizante
  const updateFertilizante = async (id, data) => {
    try {
      await fertilizantesService.update(id, data);
      await loadData();
    } catch (err) {
      console.error('Error actualizando fertilizante:', err);
      throw err;
    }
  };

  // Eliminar fertilizante
  const deleteFertilizante = async (id) => {
    try {
      await fertilizantesService.remove(id);
      await loadData();
    } catch (err) {
      console.error('Error eliminando fertilizante:', err);
      throw err;
    }
  };

  useEffect(() => {
    loadData(); // cargar datos al montar
  }, []);

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
