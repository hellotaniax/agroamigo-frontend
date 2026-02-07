import TableCard from '../../../components/TableCard';
import { cultivosColumns, estadoBadgeClass } from '../cultivos.config';
import { formatDate } from '../../../utils/date';
import { ButtonPrimary, ButtonWarning } from '../../../components/Buttons';
import { BiEdit, BiArchive } from 'react-icons/bi'; // iconos para las acciones

export default function CultivosTable({ data, loading, showActions = true }) {
  // Renderiza estado con badge
  const renderEstado = (row) => (
    <span className={`badge ${estadoBadgeClass[row.estadoNombre] || ''}`}>
      {row.estadoNombre}
    </span>
  );

  // Renderiza fecha
  const renderFecha = (row) => formatDate(row.creacioncul);

  // Mapea columnas con renderers personalizados
  const columns = cultivosColumns.map(col => {
    if (col.accessor === 'estadoNombre') return { ...col, render: renderEstado };
    if (col.accessor === 'creacioncul') return { ...col, render: renderFecha };
    return col;
  });

  // Acciones por fila
  const rowActions = showActions
    ? (row) => (
        <div className="table-row-actions" style={{ display: 'flex', gap: '0.5rem' }}>
          <ButtonPrimary icon={BiEdit} onClick={() => console.log('Editar', row.idcul)}>
            Editar
          </ButtonPrimary>
          <ButtonWarning icon={BiArchive} onClick={() => console.log('Archivar', row.idcul)} />
        </div>
      )
    : null;

  return (
    <TableCard
      title="Cultivos registrados"
      columns={columns}
      data={data}
      loading={loading}
      rowActions={rowActions}
    />
  );
}
