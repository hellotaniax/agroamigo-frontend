import AdminLayout from '../../layouts/AdminLayout';
import MetricCard from '../../components/MetricCard';
import TableCard from '../../components/TableCard';
import { getBadgeClass } from '../../utils/badgeStates';
import './Dashboard.css';
import useDashboardData from './useDashboardData';
import { dashboardTableColumns } from './dashboard.config';

export default function DashboardPage() {
  const { metrics, lastCultivos, loading } = useDashboardData();

  // =========================
  // Configurar columnas con render personalizado
  // =========================
  const tableColumns = dashboardTableColumns.map(col => {
    if (col.accessor === 'estadoNombre') {
      return {
        ...col,
        render: (row) => (
          <span className={`badge ${getBadgeClass(row.estadoNombre)}`}>
            {row.estadoNombre}
          </span>
        ),
      };
    }
    if (col.accessor === 'creacioncul') {
      return {
        ...col,
        render: (row) => row.creacioncul
          ? new Date(row.creacioncul).toLocaleDateString('es-ES')
          : '—',
      };
    }
    return col;
  });

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-semibold">Panel General</h3>
      </div>

      {/* Métricas principales */}
      <div className="row g-4 mb-4">
        {metrics.map((m, idx) => (
          <div className="col-md-3" key={idx}>
            <MetricCard {...m} loading={loading} />
          </div>
        ))}
      </div>

      {/* Tabla de últimos cultivos */}
      <TableCard
        title="Últimos cultivos registrados"
        columns={tableColumns}
        data={lastCultivos}
        loading={loading}
      />
    </AdminLayout>
  );
}