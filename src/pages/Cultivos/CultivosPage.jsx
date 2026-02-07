import AdminLayout from '../../layouts/AdminLayout';
import useCultivosData from './useCultivosData';
import CultivosTable from './components/CultivosTable';
import CultivosFilter from './components/CultivosFilter';
import { useState } from 'react';

export default function CultivosPage() {
  const { cultivos, loading } = useCultivosData();
  const [filters, setFilters] = useState({
    search: '',
    state: '',
    date: ''
  });

  const filteredCultivos = cultivos.filter(c => {
    const rowDate = new Date(c.creacioncul).toISOString().slice(0,10);
    return c.nombrecul.toLowerCase().includes(filters.search.toLowerCase()) &&
           (filters.state === '' || c.estadoNombre === filters.state) &&
           (filters.date === '' || rowDate === filters.date);
  });

  return (
    <AdminLayout breadcrumbs={[{ label: 'Cultivos' }]}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-semibold">Lista de Cultivos</h4>
      </div>

      <CultivosFilter onFiltersChange={setFilters} />
      <CultivosTable data={filteredCultivos} loading={loading} />
    </AdminLayout>
  );
}
