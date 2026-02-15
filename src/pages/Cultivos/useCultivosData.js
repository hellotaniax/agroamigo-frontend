import { useEffect, useState } from 'react';
import cultivosService from '../../services/cultivos.service';
import catalogosService from '../../services/catalogos.service';

export default function useCultivosData() {
  const [cultivos, setCultivos] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);

      const [cultivosData, tipos, estados] = await Promise.all([
        cultivosService.getAll(),
        catalogosService.getTiposCultivo(),
        catalogosService.getEstados(),
      ]);

      // 🔥 Mapear nombres correctamente
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
  };

  // ✅ NUEVA FUNCIÓN: Agregar cultivo
  const addCultivo = async (data) => {
    try {
      await cultivosService.create(data);
      await loadData(); // Recargar lista después de agregar
    } catch (error) {
      console.error('Error agregando cultivo:', error);
      throw error; // Propagar el error para manejarlo en el componente
    }
  };

  // ✅ NUEVA FUNCIÓN: Actualizar cultivo
  const updateCultivo = async (id, data) => {
    try {
      await cultivosService.update(id, data);
      await loadData(); // Recargar lista después de actualizar
    } catch (error) {
      console.error('Error actualizando cultivo:', error);
      throw error;
    }
  };

  // ✅ NUEVA FUNCIÓN: Eliminar cultivo
  const deleteCultivo = async (id) => {
    try {
      await cultivosService.remove(id);
      await loadData(); // Recargar lista después de eliminar
    } catch (error) {
      console.error('Error eliminando cultivo:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { 
    cultivos, 
    loading, 
    reload: loadData,
    addCultivo,      // ✅ Ahora sí existe
    updateCultivo,   // ✅ Para edición futura
    deleteCultivo,   // ✅ Para eliminación futura
  };
}