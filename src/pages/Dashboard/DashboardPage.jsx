import Sidebar from '../../components/Sidebar';
import MetricCard from '../../components/MetricCard';
import TableCard from '../../components/TableCard';

import './Dashboard.css';
import { useState } from 'react';
import { BiLeaf, BiDroplet, BiLightbulb, BiPeople } from 'react-icons/bi';

export default function DashboardPage() {
  // Datos de métricas
  const metrics = [
    { title: 'Cultivos activos', value: 18, icon: <BiLeaf /> },
    { title: 'Fertilizantes', value: 12, icon: <BiDroplet /> },
    { title: 'Recomendaciones', value: 7, icon: <BiLightbulb /> },
    { title: 'Usuarios', value: 4, icon: <BiPeople /> },
  ];

  // Columnas y datos de la tabla
  const columns = ['Cultivo', 'Tipo', 'Fecha', 'Estado'];
  const lastCultivos = [
    { cultivo: 'Maíz', tipo: 'Cereal', fecha: '2026-02-01', estado: 'Activo', statusClass: 'bg-success-subtle' },
    { cultivo: 'Tomate', tipo: 'Hortaliza', fecha: '2026-01-28', estado: 'Seguimiento', statusClass: 'bg-warning-subtle' },
  ];

  return (
    <div className="d-flex dashboard-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="main-content">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-semibold">Panel General</h4>
        </div>

        {/* Métricas */}
        <div className="row g-4 mb-4">
          {metrics.map((m, idx) => (
            <div className="col-md-3" key={idx}>
              <MetricCard title={m.title} value={m.value} icon={m.icon} />
            </div>
          ))}
        </div>

        {/* Tabla */}
        <TableCard title="Últimos cultivos registrados" columns={columns} data={lastCultivos} />
      </main>
    </div>
  );
}
