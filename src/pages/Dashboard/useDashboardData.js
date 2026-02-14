
import { BiBulb, BiGroup, BiLeaf, BiDroplet } from 'react-icons/bi';

export default function useDashboardData() {
  return {
    metrics: [
      { title: 'Cultivos activos', value: 18, icon: <BiLeaf /> },
      { title: 'Fertilizantes', value: 12, icon: <BiDroplet /> },
      { title: 'Recomendaciones', value: 7, icon: <BiBulb /> },
      { title: 'Usuarios', value: 4, icon: <BiGroup /> },
    ],
    lastCultivos: [
      {
        id: 1,
        cultivo: 'Maíz',
        tipo: 'Cereal',
        fecha: '2026-02-07',
        estado: 'Activo',
        statusClass: 'activo',
      },
      {
        id: 2,
        cultivo: 'Tomate',
        tipo: 'Hortaliza',
        fecha: '2026-02-05',
        estado: 'Activo',
        statusClass: 'activo',
      },
      {
        id: 3,
        cultivo: 'Lechuga',
        tipo: 'Hortaliza',
        fecha: '2026-02-03',
        estado: 'Activo',
        statusClass: 'borrador',
      },
      {
        id: 4,
        cultivo: 'Fresa',
        tipo: 'Fruta',
        fecha: '2026-02-01',
        estado: 'Borrador',
        statusClass: 'borrador',
      },
      {
        id: 5,
        cultivo: 'Papa',
        tipo: 'Tubérculo',
        fecha: '2026-01-28',
        estado: 'Activo',
        statusClass: 'activo',
      },
      {
        id: 6,
        cultivo: 'Zanahoria',
        tipo: 'Hortaliza',
        fecha: '2026-01-25',
        estado: 'Archivado',
        statusClass: 'archivado',
      },
    ],
    recentRecommendations: [
      {
        idrec: 'REC-01',
        titulorec: 'Riego matutino',
        descripcionrec: 'Regar temprano en la mañana para mejor absorción de nutrientes.',
        estadoNombre: 'Activo',
        prioridadNombre: 'Media',
      },
      {
        idrec: 'REC-02',
        titulorec: 'Fertilización NPK',
        descripcionrec: 'Aplicar fertilizante NPK cada 30 días en dosis recomendadas.',
        estadoNombre: 'Activo',
        prioridadNombre: 'Alta',
      },
      {
        idrec: 'REC-03',
        titulorec: 'Inspección de plagas',
        descripcionrec: 'Inspeccionar hojas semanalmente por signos de plagas o enfermedades.',
        estadoNombre: 'Activo',
        prioridadNombre: 'Alta',
      },
      {
        idrec: 'REC-04',
        titulorec: 'Control de maleza',
        descripcionrec: 'Realizar limpieza semanal de maleza alrededor de los cultivos.',
        estadoNombre: 'Activo',
        prioridadNombre: 'Media',
      },
    ],
  };
}
