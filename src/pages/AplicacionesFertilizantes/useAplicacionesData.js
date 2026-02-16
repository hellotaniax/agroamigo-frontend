import { useState, useEffect, useCallback } from 'react';
import aplicacionesService from '../../services/aplicacionesfertilizantes.service';
import catalogosService from '../../services/catalogos.service';
import fertilizantesService from '../../services/fertilizantes.service';
import { toast } from 'react-hot-toast'; 

export default function useAplicacionesData() {
  const [aplicRaw, setAplicRaw] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [apps, formas, etapas, ferts] = await Promise.all([
        aplicacionesService.getAll(),
        catalogosService.getFormasAplicacion(),
        catalogosService.getEtapas(),
        fertilizantesService.getAll(),
      ]);

      const enriched = apps.map(a => {
        const appIdFer = a.idfer ?? a.idFertilizante ?? a.id_fer ?? null;
        const appIdFor = a.idfor ?? a.idfap ?? a.id_for ?? a.id_forma ?? null;
        const appIdEta = a.ideta ?? a.ideta ?? null;

        const fert = ferts.find(f => String(f.idfer) === String(appIdFer));
        const forma = (formas || []).find(fa => {
          const faId = fa.idfor ?? fa.idfap ?? fa.id ?? fa.value ?? null;
          return faId !== null && String(faId) === String(appIdFor);
        });
        const etapa = (etapas || []).find(e => String(e.ideta) === String(appIdEta));

        return {
          ...a,
          fertilizanteNombre: fert ? (fert.nombrefer || fert.nombre || fert.label) : '—',
          formaNombre: forma ? (forma.nombrefor || forma.nombrefap || forma.nombre || forma.label) : '—',
          etapaNombre: etapa ? (etapa.nombreeta || etapa.nombre || etapa.label) : '—',
          formaId: appIdFor !== null ? String(appIdFor) : '',
          etapaId: appIdEta !== null ? String(appIdEta) : '',
        };
      });

      setAplicRaw(enriched);
    } catch (err) {
      console.error('Error cargando aplicaciones:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addAplicacion = async (data) => {
    const payload = {
      ...data,
      idfer: data.idfer ?? null,
      idfor: data.idfor ? Number(data.idfor) : null,
    };

    return toast.promise(
      (async () => {
        await aplicacionesService.create(payload);
        await loadData();
      })(),
      {
        loading: 'Registrando aplicación...',
        success: '¡Aplicación guardada con éxito!',
        error: 'Error al registrar la aplicación.',
      }
    );
  };

  const updateAplicacion = async (id, data) => {
    return toast.promise(
      (async () => {
        await aplicacionesService.update(id, data);
        await loadData();
      })(),
      {
        loading: 'Actualizando registro...',
        success: '¡Cambios aplicados correctamente!',
        error: 'No se pudo actualizar el registro.',
      }
    );
  };

  const deleteAplicacion = async (id) => {
    return toast.promise(
      (async () => {
        await aplicacionesService.remove(id);
        await loadData();
      })(),
      {
        loading: 'Eliminando registro...',
        success: 'Aplicación eliminada.',
        error: 'Error al eliminar.',
      }
    );
  };

  useEffect(() => { loadData(); }, [loadData]);

  return {
    aplicaciones: aplicRaw,
    loading,
    error,
    reload: loadData,
    addAplicacion,
    updateAplicacion,
    deleteAplicacion,
  };
}