import AdminLayout from '../../layouts/AdminLayout';
import useCultivosData from './useCultivosData';
import CultivosTable from './components/CultivosTable';
import CultivosFilter from './components/CultivosFilter';
import { useState } from 'react';

export default function CultivosPage() {
  const { cultivos, loading } = useCultivosData();
  const [filter, setFilter] = useState('');

  const filteredCultivos = cultivos.filter(c =>
    c.nombrecul.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <AdminLayout breadcrumbs={[{ label: 'Cultivos' }]}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-semibold">Lista de Cultivos</h4>
      </div>

      <CultivosFilter onFilter={setFilter} />
      <CultivosTable data={filteredCultivos} loading={loading} />
    </AdminLayout>
  );
}
