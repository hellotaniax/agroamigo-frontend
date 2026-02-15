// src/pages/Cultivos/CultivosPage.jsx
import AdminLayout from '../../layouts/AdminLayout';
import useCultivosData from './useCultivosData';
import CultivosTable from './components/CultivosTable';
import CultivosFilter from './components/CultivosFilter';
import CultivoForm from './components/CultivoForm';
import { AddButton } from '../../components/Buttons';
import { useState } from 'react';

export default function CultivosPage() {
  const { cultivos, loading, addCultivo, reload } = useCultivosData(); // ✅ Agregar reload
  const [filters, setFilters] = useState({ search: '', state: '', date: '' });
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState(null);

  // Filtrado de cultivos según filtros activos
  const filteredCultivos = cultivos.filter(c => {
    const rowDate = new Date(c.creacioncul).toISOString().slice(0,10);
    return c.nombrecul.toLowerCase().includes(filters.search.toLowerCase()) &&
           (filters.state === '' || c.idest === parseInt(filters.state)) &&
           (filters.date === '' || rowDate === filters.date);
  });

  // Callback para agregar un cultivo
  const handleAdd = async (data) => {
    try {
      setFormError(null);
      await addCultivo(data);
      setShowForm(false);
    } catch (error) {
      setFormError('Error al guardar el cultivo. Inténtalo de nuevo.');
      console.error(error);
    }
  };

  return (
    <AdminLayout breadcrumbs={[{ label: 'Cultivos' }]}>
      {/* Header con título y botón de agregar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-semibold">Lista de Cultivos</h4>
        <AddButton onClick={() => setShowForm(true)}>Agregar cultivo</AddButton>
      </div>

      {/* Formulario modal / panel para agregar cultivo */}
      {showForm && (
        <div>
          {formError && (
            <div className="alert alert-danger" role="alert">
              {formError}
            </div>
          )}
          <CultivoForm
            onSubmit={handleAdd}
            onCancel={() => {
              setShowForm(false);
              setFormError(null);
            }}
          />
        </div>
      )}

      {/* Panel de filtros */}
      <CultivosFilter onFiltersChange={setFilters} />

      {/* Tabla de cultivos filtrados */}
      <CultivosTable 
        data={filteredCultivos} 
        loading={loading}
        onDataChange={reload} // ✅ Pasar función reload
      />
    </AdminLayout>
  );
}