import AdminLayout from '../../layouts/AdminLayout';
import useFertilizantesData from './useFertilizantesData';
import FertilizantesTable from './components/FertilizantesTable';
import FertilizantesFilter from './components/FertilizantesFilter';
import FertilizanteForm from './components/FertilizanteForm';
import { AddButton } from '../../components/Buttons';
import { useState } from 'react';

export default function FertilizantesPage() {
  const { fertilizantes, loading, addFertilizante } = useFertilizantesData();
  const [filters, setFilters] = useState({ search: '', type: '', state: '' });
  const [showForm, setShowForm] = useState(false);

  // Filtrado local de fertilizantes según filtros activos
  const filteredFertilizantes = fertilizantes.filter(f =>
    f.nombrefer.toLowerCase().includes(filters.search.toLowerCase()) &&
    (filters.type === '' || f.tipoNombre === filters.type) &&
    (filters.state === '' || f.estadoNombre === filters.state)
  );

  const handleAdd = (data) => {
    addFertilizante(data);
    setShowForm(false);
  };

  return (
    <AdminLayout breadcrumbs={[{ label: 'Fertilizantes' }]}>
      {/* Header con título y botón */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-semibold">Lista de Fertilizantes</h4>
        <AddButton onClick={() => setShowForm(true)}>Agregar fertilizante</AddButton>
      </div>

      {/* Formulario para agregar fertilizante */}
      {showForm && (
        <FertilizanteForm
          onSubmit={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Filtros */}
      <FertilizantesFilter onFiltersChange={setFilters} />

      {/* Tabla de fertilizantes */}
      <FertilizantesTable data={filteredFertilizantes} loading={loading} />
    </AdminLayout>
  );
}
