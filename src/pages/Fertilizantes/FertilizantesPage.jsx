import React, { useState, useMemo } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import useFertilizantesData from './useFertilizantesData';
import FertilizantesTable from './components/FertilizantesTable';
import FertilizantesFilter from './components/FertilizantesFilter';
import FertilizanteForm from './components/FertilizanteForm';
import { AddButton } from '../../components/Buttons';

export default function FertilizantesPage() {
  const [filters, setFilters] = useState({ search: '', type: '', state: '' });
  const [isEditing, setIsEditing] = useState(false); // ✅ Nuevo estado

  const { fertilizantes, loading, addFertilizante, updateFertilizante, reload } = useFertilizantesData(filters);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState(null);

  const filteredFertilizantes = useMemo(() => {
    return fertilizantes.filter(f =>
      f.nombrefer.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.type === '' || String(f.idtfer) === String(filters.type)) && 
      (filters.state === '' || String(f.idest) === String(filters.state))   
    );
  }, [fertilizantes, filters]);

  const handleAdd = async (data) => {
    try {
      setFormError(null);
      await addFertilizante(data); 
      setShowForm(false);
    } catch (error) {
      setFormError('Error al guardar. Inténtalo de nuevo.');
      console.error(error);
    }
  };

  return (
    <AdminLayout 
      breadcrumbs={[{ label: 'Fertilizantes' }]}
      hideHeader={isEditing} // ✅ Ocultar header cuando se está editando
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-semibold">Lista de Fertilizantes</h4>
        <AddButton onClick={() => setShowForm(true)}>Agregar fertilizante</AddButton>
      </div>

      {showForm && (
        <div className="mb-4">
          {formError && <div className="alert alert-danger">{formError}</div>}
          <FertilizanteForm
            onSubmit={handleAdd}
            onCancel={() => { setShowForm(false); setFormError(null); }}
          />
        </div>
      )}

      <FertilizantesFilter onFiltersChange={setFilters} />

      <FertilizantesTable
        data={filteredFertilizantes}
        loading={loading}
        onUpdate={updateFertilizante} 
        onDataChange={reload}
        onEditStart={() => setIsEditing(true)}  // ✅ Cuando comienza edición
        onEditEnd={() => setIsEditing(false)}   // ✅ Cuando termina edición
      />
    </AdminLayout>
  );
}