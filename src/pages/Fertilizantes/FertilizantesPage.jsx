// src/pages/Fertilizantes/FertilizantesPage.jsx
import AdminLayout from '../../layouts/AdminLayout';
import useFertilizantesData from './useFertilizantesData';
import FertilizantesTable from './components/FertilizantesTable';
import FertilizantesFilter from './components/FertilizantesFilter';
import FertilizanteForm from './components/FertilizanteForm';
import { AddButton } from '../../components/Buttons';
import { useState } from 'react';

export default function FertilizantesPage() {
  const { fertilizantes, loading, addFertilizante, reload } = useFertilizantesData();
  const [filters, setFilters] = useState({ search: '', type: '', state: '' });
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState(null);

  // Filtrado de fertilizantes según filtros activos
  const filteredFertilizantes = fertilizantes.filter(f =>
    f.nombrefer.toLowerCase().includes(filters.search.toLowerCase()) &&
    (filters.type === '' || f.idtfer === parseInt(filters.type)) &&
    (filters.state === '' || f.idest === parseInt(filters.state))
  );

  // Callback para agregar fertilizante
  const handleAdd = async (data) => {
    try {
      setFormError(null);
      await addFertilizante(data);
      setShowForm(false);
      reload(); // recargar tabla después de agregar
    } catch (error) {
      setFormError('Error al guardar el fertilizante. Inténtalo de nuevo.');
      console.error(error);
    }
  };

  return (
    <AdminLayout breadcrumbs={[{ label: 'Fertilizantes' }]}>
      {/* Header con título y botón de agregar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-semibold">Lista de Fertilizantes</h4>
        <AddButton onClick={() => setShowForm(true)}>Agregar fertilizante</AddButton>
      </div>

      {/* Formulario modal / panel para agregar */}
      {showForm && (
        <div>
          {formError && (
            <div className="alert alert-danger" role="alert">
              {formError}
            </div>
          )}
          <FertilizanteForm
            onSubmit={handleAdd}
            onCancel={() => {
              setShowForm(false);
              setFormError(null);
            }}
          />
        </div>
      )}

      {/* Panel de filtros */}
      <FertilizantesFilter onFiltersChange={setFilters} />

      {/* Tabla de fertilizantes filtrados */}
      <FertilizantesTable
        data={filteredFertilizantes}
        loading={loading}
        onDataChange={reload} // recargar tabla si se edita
      />
    </AdminLayout>
  );
}
