import './TableCard.css';
import { Spinner } from 'react-bootstrap';

export default function TableCard({ title, columns, data, loading, rowActions }) {
  const colSpan = columns.length + (rowActions ? 1 : 0);

  return (
    <div className="table-card">
      {title && <h6 className="mb-3 fw-semibold">{title}</h6>}
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.accessor} scope="col">{col.header}</th>
              ))}
              {rowActions && <th scope="col">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={colSpan} className="text-center py-4">
                  <Spinner animation="border" role="status" className="me-2" />
                  <span>Cargando...</span>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={colSpan} className="text-center py-4 text-muted fst-italic">
                  No hay datos
                </td>
              </tr>
            ) : (
              data.map(row => (
                <tr key={row.id} className="table-row-hover">
                  {columns.map(col => (
                    <td key={col.accessor}>
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                  {rowActions && (
                    <td className="table-row-actions">
                      {rowActions(row)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
