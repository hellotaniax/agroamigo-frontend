// pages/Dashboard/useDashboardData.js
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
        cultivo: 'Maíz',
        tipo: 'Cereal',
        fecha: '2026-02-01',
        estado: 'Activo',
        statusClass: 'bg-success-subtle',
      },
      {
        cultivo: 'Tomate',
        tipo: 'Hortaliza',
        fecha: '2026-01-28',
        estado: 'Seguimiento',
        statusClass: 'bg-warning-subtle',
      },
    ],
  };
}
