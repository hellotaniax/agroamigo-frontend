import './TableCard.css';

export default function TableCard({ title, columns, data, loading }) {
  return (
    <div className="table-card">
      <h6 className="mb-3 fw-semibold">{title}</h6>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.accessor} scope="col">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  Cargando...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  No hay datos
                </td>
              </tr>
            ) : (
              data.map(row => (
                <tr key={row.idcul}>
                  {columns.map(col => (
                    <td key={col.accessor}>
                      {col.accessor === 'estadoNombre' ? (
                        <span className={`badge ${row.statusClass}`}>{row[col.accessor]}</span>
                      ) : (
                        row[col.accessor]
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
