// src/pages/Cultivos/CultivosPage.jsx
import AdminLayout from '../../layouts/AdminLayout';
import useCultivosData from './useCultivosData';
import CultivosTable from './components/CultivosTable';
import CultivosFilter from './components/CultivosFilter';
import CultivoForm from './components/CultivosForm';
import { AddButton } from '../../components/Buttons';
import { useState } from 'react';

export default function CultivosPage() {
  const { cultivos, loading, addCultivo } = useCultivosData(); // addCultivo para guardar
  const [filters, setFilters] = useState({ search: '', state: '', date: '' });
  const [showForm, setShowForm] = useState(false);

  // Filtrado de cultivos según filtros activos
  const filteredCultivos = cultivos.filter(c => {
    const rowDate = new Date(c.creacioncul).toISOString().slice(0,10);
    return c.nombrecul.toLowerCase().includes(filters.search.toLowerCase()) &&
           (filters.state === '' || c.estadoNombre === filters.state) &&
           (filters.date === '' || rowDate === filters.date);
  });

  // Callback para agregar un cultivo
  const handleAdd = (data) => {
    addCultivo(data);        // Inserta en backend / state
    setShowForm(false);       // Cierra el formulario
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
        <CultivoForm
          onSubmit={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Panel de filtros */}
      <CultivosFilter onFiltersChange={setFilters} />

      {/* Tabla de cultivos filtrados */}
      <CultivosTable data={filteredCultivos} loading={loading} />
    </AdminLayout>
  );
}
