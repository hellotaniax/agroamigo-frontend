import TableCard from '../../../components/TableCard';
import { cultivosColumns } from '../cultivos.config';
import { getBadgeClass } from '../../../utils/badgeStates';
import { formatDate } from '../../../utils/date';
import { ButtonPrimary, ButtonWarning } from '../../../components/Buttons';
import { BiEdit, BiArchive } from 'react-icons/bi';

export default function CultivosTable({ data, loading, showActions = true }) {
  const renderEstado = (row) => (
    <span className={`badge ${getBadgeClass(row.estadoNombre)}`}>
      {row.estadoNombre}
    </span>
  );

  const renderFecha = (row) => formatDate(row.creacioncul);

  const columns = cultivosColumns.map(col => {
    if (col.accessor === 'estadoNombre') return { ...col, render: renderEstado };
    if (col.accessor === 'creacioncul') return { ...col, render: renderFecha };
    return col;
  });

  const rowActions = showActions
    ? (row) => (
        <div className="table-row-actions" style={{ display: 'flex', gap: '0.5rem' }}>
          <ButtonPrimary icon={BiEdit} onClick={() => console.log('Editar', row.idcul)}>Editar</ButtonPrimary>
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
