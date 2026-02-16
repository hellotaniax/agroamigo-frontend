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
        const [tc, tf, es, fa, et, pr, rl] = await Promise.all([
          catalogosService.getTiposCultivo(),
          catalogosService.getTiposFertilizantes(),
          catalogosService.getEstados(),
          catalogosService.getFormasAplicacion(),
          catalogosService.getEtapas(),
          catalogosService.getPrioridades(),
          catalogosService.getRoles(),
        ]);

        setTiposCultivo(tc.map(t => ({ value: t.idtcul, label: t.nombretcul })));
        setTiposFertilizantes(tf.map(t => ({ value: t.idtfer, label: t.nombretfer })));
        setEstados(es.map(e => ({ value: e.idest, label: e.nombreest })));
        setFormasAplicacion(fa.map(f => ({ value: f.idfap, label: f.nombrefap })));
        setEtapas(et.map(e => ({ value: e.ideta, label: e.nombreeta })));
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
