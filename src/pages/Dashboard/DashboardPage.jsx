import AdminLayout from '../../layouts/AdminLayout';
import MetricCard from '../../components/MetricCard';
import TableCard from '../../components/TableCard';

import './Dashboard.css';
import useDashboardData from './useDashboardData';
import { dashboardTableColumns } from './dashboard.config';

export default function DashboardPage() {
  const { metrics, lastCultivos } = useDashboardData();

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-semibold">Panel General</h3>
      </div>

      <div className="row g-4 mb-4">
        {metrics.map((m, idx) => (
          <div className="col-md-3" key={idx}>
            <MetricCard {...m} />
          </div>
        ))}
      </div>

      <TableCard
        title="Últimos cultivos registrados"
        columns={dashboardTableColumns}
        data={lastCultivos}
      />
    </AdminLayout>
  );
}
