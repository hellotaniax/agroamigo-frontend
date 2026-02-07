import TableCard from '../../../components/TableCard';
import { cultivosColumns, estadoBadgeClass } from '../cultivos.config';

export default function CultivosTable({ data, loading }) {
  // Añadir clase de badge al estado
  const dataWithClass = data.map(row => ({
    ...row,
    statusClass: estadoBadgeClass[row.estadoNombre] || '',
  }));

  return <TableCard title="Cultivos registrados" columns={cultivosColumns} data={dataWithClass} loading={loading} />;
}
