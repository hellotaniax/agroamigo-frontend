import { useState, useEffect, useMemo } from 'react';
import aplicacionesService from '../../services/aplicacionesfertilizantes.service';
import catalogosService from '../../services/catalogos.service';
import fertilizantesService from '../../services/fertilizantes.service';

export default function useAplicacionesData() {
  const [aplicRaw, setAplicRaw] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
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
        // normalize ids from the application record
        const appIdFer = a.idfer ?? a.idFertilizante ?? a.id_fer ?? null; // may be code string like 'FER-0003'
        const appIdFor = a.idfor ?? a.idfap ?? a.id_for ?? a.id_forma ?? null; // numeric or string
        const appIdEta = a.ideta ?? a.ideta ?? null;

        // find fertilizante by id/code (string match)
        const fert = ferts.find(f => String(f.idfer) === String(appIdFer));

        // find forma by common id fields
        const forma = (formas || []).find(fa => {
          const faId = fa.idfor ?? fa.idfap ?? fa.id ?? fa.value ?? null;
          return faId !== null && String(faId) === String(appIdFor);
        });

        // find etapa
        const etapa = (etapas || []).find(e => String(e.ideta) === String(appIdEta));

        return {
          ...a,
          fertilizanteNombre: fert ? (fert.nombrefer || fert.nombre || fert.label) : '—',
          formaNombre: forma ? (forma.nombrefor || forma.nombrefap || forma.nombre || forma.label) : '—',
          etapaNombre: etapa ? (etapa.nombreeta || etapa.nombre || etapa.label) : '—',
          // expose ids as strings so filters compare ids consistently
          formaId: appIdFor !== null && appIdFor !== undefined ? String(appIdFor) : '',
          etapaId: appIdEta !== null && appIdEta !== undefined ? String(appIdEta) : '',
        };
      });

      setAplicRaw(enriched);
    } catch (err) {
      console.error('Error cargando aplicaciones:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const aplicaciones = useMemo(() => aplicRaw, [aplicRaw]);

  const addAplicacion = async (data) => {
    try {
      // Normalizar payload: enviar idfer como string (ej. "FER-0003") y idfor como number
      const payload = {
        ...data,
        idfer: data.idfer ?? (data.fertilizanteCodigo ?? null),
        idfor: data.idfor ? Number(data.idfor) : (data.idfap ? Number(data.idfap) : null),
      };
      // eliminar posibles claves redundantes que la API no espera
      if (payload.idfap) delete payload.idfap;

      console.debug('addAplicacion - payload ->', payload);

      if (!payload.idfer || payload.idfor === null || payload.idfor === undefined) {
        throw new Error('Faltan identificadores obligatorios (idfer o idfor). Revisa el formulario.');
      }

      await aplicacionesService.create(payload);
      await loadData();
    } catch (err) {
      console.error('Error agregando aplicación:', err);
      throw err;
    }
  };

  const updateAplicacion = async (id, data) => {
    try {
      await aplicacionesService.update(id, data);
      await loadData();
    } catch (err) {
      console.error('Error actualizando aplicación:', err);
      throw err;
    }
  };

  const deleteAplicacion = async (id) => {
    try {
      await aplicacionesService.remove(id);
      await loadData();
    } catch (err) {
      console.error('Error eliminando aplicación:', err);
      throw err;
    }
  };

  useEffect(() => { loadData(); }, []);

  return {
    aplicaciones,
    loading,
    error,
    reload: loadData,
    addAplicacion,
    updateAplicacion,
    deleteAplicacion,
  };
}
