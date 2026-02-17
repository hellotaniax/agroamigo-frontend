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
      const [apps, formas, etapas, ferts, estados] = await Promise.all([
        aplicacionesService.getAll(),
        catalogosService.getFormasAplicacion(),
        catalogosService.getEtapas(),
        fertilizantesService.getAll(),
        catalogosService.getEstados(), // Nueva llamada a catálogo
      ]);

      const enriched = apps.map(a => {
        const appIdFer = a.idfer ?? null;
        const appIdFor = a.idfor ?? null;
        const appIdEta = a.ideta ?? null;
        const appIdEst = a.idest ?? null; // Nuevo

        const fert = ferts.find(f => String(f.idfer) === String(appIdFer));
        const forma = (formas || []).find(fa => String(fa.idfor || fa.value) === String(appIdFor));
        const etapa = (etapas || []).find(e => String(e.ideta) === String(appIdEta));
        const estado = (estados || []).find(es => String(es.idest) === String(appIdEst)); // Nuevo

        return {
          ...a,
          fertilizanteNombre: fert ? fert.nombrefer : '—',
          formaNombre: forma ? (forma.nombrefor || forma.label) : '—',
          etapaNombre: etapa ? (etapa.nombreeta || etapa.label) : '—',
          estadoNombre: estado ? (estado.nombreest || estado.label) : '—', // Nuevo
          formaId: appIdFor !== null ? String(appIdFor) : '',
          etapaId: appIdEta !== null ? String(appIdEta) : '',
          estadoId: appIdEst !== null ? String(appIdEst) : '', // Nuevo
        };
      });

      setAplicRaw(enriched);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addAplicacion = async (data) => {
    const payload = { ...data, idest: Number(data.idest) }; // Asegura envío de idest
    return toast.promise(
      (async () => { await aplicacionesService.create(payload); await loadData(); })(),
      { loading: 'Registrando...', success: '¡Éxito!', error: 'Error al guardar.' }
    );
  };

  const updateAplicacion = async (id, data) => {
    const payload = { ...data, idest: Number(data.idest) };
    return toast.promise(
      (async () => { await aplicacionesService.update(id, payload); await loadData(); })(),
      { loading: 'Actualizando...', success: '¡Éxito!', error: 'Error.' }
    );
  };

  useEffect(() => { loadData(); }, [loadData]);

  return { aplicaciones: aplicRaw, loading, error, reload: loadData, addAplicacion, updateAplicacion };
}