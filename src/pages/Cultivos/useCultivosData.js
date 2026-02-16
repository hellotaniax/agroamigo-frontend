import { useEffect, useState, useCallback } from 'react';
import cultivosService from '../../services/cultivos.service';
import catalogosService from '../../services/catalogos.service';
import { toast } from 'react-hot-toast'; 

export default function useCultivosData() {
  const [cultivos, setCultivos] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [cultivosData, tipos, estados] = await Promise.all([
        cultivosService.getAll(),
        catalogosService.getTiposCultivo(),
        catalogosService.getEstados(),
      ]);

      const enriched = cultivosData.map(c => ({
        ...c,
        tipoNombre: tipos.find(t => t.idtcul === c.idtcul)?.nombretcul || '—',
        estadoNombre: estados.find(e => e.idest === c.idest)?.nombreest || '—',
      }));

      setCultivos(enriched);
    } catch (error) {
      console.error('Error cargando cultivos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addCultivo = async (data) => {
    return toast.promise(
      (async () => {
        await cultivosService.create(data);
        await loadData();
      })(),
      {
        loading: 'Registrando cultivo...',
        success: '¡Cultivo guardado con éxito!',
        error: 'No se pudo guardar el cultivo.',
      }
    );
  };

  const updateCultivo = async (id, data) => {
    return toast.promise(
      (async () => {
        await cultivosService.update(id, data);
        await loadData();
      })(),
      {
        loading: 'Actualizando datos del cultivo...',
        success: '¡Cambios aplicados correctamente!',
        error: 'Error al actualizar el cultivo.',
      }
    );
  };

  const deleteCultivo = async (id) => {
    return toast.promise(
      (async () => {
        await cultivosService.remove(id);
        await loadData();
      })(),
      {
        loading: 'Eliminando cultivo...',
        success: 'Cultivo eliminado.',
        error: 'No se pudo eliminar el cultivo.',
      }
    );
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { 
    cultivos, 
    loading, 
    reload: loadData,
    addCultivo,       
    updateCultivo,   
    deleteCultivo,   
  };
}