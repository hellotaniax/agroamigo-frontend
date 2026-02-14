export const dashboardMetricsConfig = [
  { key: 'cultivos', title: 'Cultivos activos' },
  { key: 'fertilizantes', title: 'Fertilizantes' },
  { key: 'recomendaciones', title: 'Recomendaciones' },
  { key: 'usuarios', title: 'Usuarios' },
];

export const dashboardTableColumns = [
  {
    accessor: 'cultivo',
    header: 'Cultivo',
  },
  {
    accessor: 'tipo',
    header: 'Tipo',
  },
  {
    accessor: 'fecha',
    header: 'Fecha',
  },
  {
    accessor: 'estado',
    header: 'Estado',
  },
];