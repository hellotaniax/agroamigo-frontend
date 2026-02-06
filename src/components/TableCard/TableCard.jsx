import './TableCard.css';

export default function TableCard({ title, columns, data }) {
  return (
    <div className="table-card">
      <h6 className="mb-3 fw-semibold">{title}</h6>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col, cidx) => (
                  <td key={cidx}>
                    {col.toLowerCase() === 'estado' ? (
                      <span className={`badge ${row.statusClass}`}>{row[col.toLowerCase()]}</span>
                    ) : (
                      row[col.toLowerCase()]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
