import { useEffect, useState } from 'react';
import catalogosService from '../services/catalogos.service';

export default function useCatalogos() {
  const [tiposCultivo, setTiposCultivo] = useState([]);
  const [tiposFertilizantes, setTiposFertilizantes] = useState([]);
  const [estados, setEstados] = useState([]);
  const [formasAplicacion, setFormasAplicacion] = useState([]);
  const [etapas, setEtapas] = useState([]);
  const [prioridades, setPrioridades] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCatalogos = async () => {
      setLoading(true);
      try {
        const results = await Promise.allSettled([
          catalogosService.getTiposCultivo(),
          catalogosService.getTiposFertilizantes(),
          catalogosService.getEstados(),
          catalogosService.getFormasAplicacion(),
          catalogosService.getEtapas(),
          catalogosService.getPrioridades(),
          catalogosService.getRoles(),
        ]);

        // Extraer valores o usar array vacío si falló
        const [tc, tf, es, fa, et, pr, rl] = results.map((result, index) => {
          if (result.status === 'fulfilled') {
            return result.value;
          } else {
            // Identificar qué catálogo falló
            const catalogNames = ['tipos cultivo', 'tipos fertilizantes', 'estados', 'formas aplicación', 'etapas', 'prioridades', 'roles'];
            console.warn(`No se pudo cargar catálogo "${catalogNames[index]}":`, result.reason?.response?.status || result.reason?.message);
            return [];
          }
        });

        // Mapear solo si hay datos
        setTiposCultivo(tc.map(t => ({ value: t.idtcul, label: t.nombretcul })));
        setTiposFertilizantes(tf.map(t => ({ value: t.idtfer, label: t.nombretfer })));
        setEstados(es.map(e => ({ value: e.idest, label: e.nombreest })));
        
        // Debug: mostrar respuesta cruda de formas-aplicacion en consola
        console.debug('formas-aplicacion raw:', fa);

        setFormasAplicacion(
          (fa || [])
            .map((f) => {
              if (!f && f !== 0) return null;
              if (typeof f === 'string') return { value: String(f), label: f };
              // support API shape for formas: { idfor, nombrefor }
              const value = f.idfor ?? f.idfap ?? f.id ?? f.value ?? f.codigo ?? null;
              const label = f.nombrefor ?? f.nombrefap ?? f.nombre ?? f.label ?? f.name ?? (value !== null ? String(value) : '');
              if (value === null || value === undefined || value === '') return null;
              return { value: String(value), label };
            })
            .filter(Boolean)
        );
        
        setEtapas(et.map(e => ({ value: String(e.ideta), label: e.nombreeta })));
        setPrioridades(pr.map(p => ({ value: p.idpri, label: p.nombrepri })));
        setRoles(rl.map(r => ({ value: r.idrol, label: r.nombrerol })));
        
      } catch (error) {
        console.error('Error cargando catálogos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCatalogos();
  }, []);

  return { tiposCultivo, tiposFertilizantes, estados, formasAplicacion, etapas, prioridades, roles, loading };
}