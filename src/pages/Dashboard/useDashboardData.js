import { useState, useEffect } from 'react';
import cultivosService from '../../services/cultivos.service';
import recomendacionesService from '../../services/recomendaciones.service';
import mensajesService from '../../services/mensajes.service';
import fertilizantesService from '../../services/fertilizantes.service';
import catalogosService from '../../services/catalogos.service';

import { 
  BiLeaf, 
  BiMessageSquareDetail, 
  BiDroplet, 
  BiCheckCircle 
} from 'react-icons/bi';

export default function useDashboardData() {
  const [metrics, setMetrics] = useState([]);
  const [lastCultivos, setLastCultivos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [
          cultivosData,
          recomendacionesData,
          mensajesData,
          fertilizantesData,
          estadosData,
          tiposCultivosData
        ] = await Promise.all([
          cultivosService.getAll(),
          recomendacionesService.getAll(),
          mensajesService.getAll(),
          fertilizantesService.getAll(),
          catalogosService.getEstados(),
          catalogosService.getTiposCultivo(),
        ]);

        const metricsData = [
          {
            title: 'Total Cultivos',
            value: cultivosData.length,
            icon: BiLeaf, // ← Pasa el componente (sin </>)
            color: 'success',
          },
          {
            title: 'Recomendaciones',
            value: recomendacionesData.length,
            icon: BiCheckCircle,
            color: 'info',
          },
          {
            title: 'Mensajes',
            value: mensajesData.length,
            icon: BiMessageSquareDetail,
            color: 'warning',
          },
          {
            title: 'Fertilizantes',
            value: fertilizantesData.length,
            icon: BiDroplet,
            color: 'primary',
          },
        ];

        setMetrics(metricsData);

        const cultivosEnriquecidos = cultivosData
          .map(c => ({
            ...c,
            estadoNombre: estadosData.find(e => e.idest === c.idest)?.nombreest || '—',
            tipoNombre: tiposCultivosData.find(t => t.idtcul === c.idtcul)?.nombretcul || '—',
          }))
          .sort((a, b) => {
            const fechaA = a.creacioncul ? new Date(a.creacioncul) : new Date(0);
            const fechaB = b.creacioncul ? new Date(b.creacioncul) : new Date(0);
            return fechaB - fechaA;
          })
          .slice(0, 5);

        setLastCultivos(cultivosEnriquecidos);

      } catch (error) {
        console.error('Error cargando datos del dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { metrics, lastCultivos, loading };
}