import AdminLayout from '../../layouts/AdminLayout';
import useRecomendacionesData from './useRecomendacionesData';
import RecomendacionesTable from './components/RecomendacionesTable';
import RecomendacionesFilter from './components/RecomendacionesFilter';
import RecomendacionForm from './components/RecomendacionForm';
import { AddButton } from '../../components/Buttons';
import { useState } from 'react';

export default function RecomendacionesPage() {
  const { recomendaciones, loading, addRecomendacion } = useRecomendacionesData();
  const [filters, setFilters] = useState({ search: '', state: '', priority: '' });
  const [showForm, setShowForm] = useState(false);

  const filtered = recomendaciones.filter(r =>
    (r.titulorec.toLowerCase().includes(filters.search.toLowerCase()) ||
     r.descripcionrec.toLowerCase().includes(filters.search.toLowerCase())) &&
    (filters.state === '' || r.estadoNombre === filters.state) &&
    (filters.priority === '' || r.prioridadNombre === filters.priority)
  );

  const handleAdd = (data) => {
    addRecomendacion(data);
    setShowForm(false);
  };

  return (
    <AdminLayout breadcrumbs={[{ label: 'Recomendaciones' }]}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-semibold">Lista de Recomendaciones</h4>
        <AddButton onClick={() => setShowForm(true)}>Agregar recomendación</AddButton>
      </div>

      {showForm && (
        <RecomendacionForm
          onSubmit={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}

      <RecomendacionesFilter onFiltersChange={setFilters} />

      <RecomendacionesTable data={filtered} loading={loading} />
    </AdminLayout>
  );
}
