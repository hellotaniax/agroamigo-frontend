import TableCard from '../../../components/TableCard';
import { cultivosColumns, estadoBadgeClass } from '../cultivos.config';
import { formatDate } from '../../../utils/date';
import { ButtonPrimary, ButtonWarning } from '../../../components/Buttons';
import { BiEdit, BiArchive } from 'react-icons/bi';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

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
          <OverlayTrigger
            overlay={<Tooltip id={`tooltip-editar-${row.idcul}`}>Editar cultivo</Tooltip>}
          >
            <ButtonPrimary
              icon={BiEdit}
              onClick={() => console.log('Editar', row.idcul)}
              className="btn-sm"
            >
              Editar
            </ButtonPrimary>
          </OverlayTrigger>

          <OverlayTrigger
            overlay={<Tooltip id={`tooltip-archivar-${row.idcul}`}>Archivar cultivo</Tooltip>}
          >
            <ButtonWarning
              icon={BiArchive}
              onClick={() => {
                if (window.confirm('¿Seguro que quieres archivar este cultivo?')) {
                  console.log('Archivar', row.idcul);
                }
              }}
              className="btn-sm"
            />
          </OverlayTrigger>
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
