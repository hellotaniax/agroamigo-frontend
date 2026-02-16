import React, { useState, useMemo } from 'react'; // ✅ Importar useMemo
import AdminLayout from '../../layouts/AdminLayout';
import useCultivosData from './useCultivosData';
import CultivosTable from './components/CultivosTable';
import CultivosFilter from './components/CultivosFilter';
import CultivoForm from './components/CultivoForm';
import { AddButton } from '../../components/Buttons';

export default function CultivosPage() {
  const { cultivos, loading, addCultivo, updateCultivo, reload } = useCultivosData();
  const [filters, setFilters] = useState({ search: '', state: '', date: '' });
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState(null);

  const filteredCultivos = useMemo(() => {
    return cultivos.filter(c => {
      const rowDate = new Date(c.creacioncul).toISOString().slice(0, 10);
      return c.nombrecul.toLowerCase().includes(filters.search.toLowerCase()) &&
             (filters.state === '' || c.idest === parseInt(filters.state)) &&
             (filters.date === '' || rowDate === filters.date);
    });
  }, [cultivos, filters]);

  const handleAdd = async (data) => {
    try {
      setFormError(null);
      await addCultivo(data);
      setShowForm(false);
    } catch (error) {
      setFormError('Revisa los datos e intenta de nuevo.');
    }
  };

  return (
    <AdminLayout breadcrumbs={[{ label: 'Cultivos' }]}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-semibold">Lista de Cultivos</h4>
        <AddButton onClick={() => setShowForm(true)}>Agregar cultivo</AddButton>
      </div>

      {showForm && (
        <div className="mb-4">
          {formError && <div className="alert alert-danger">{formError}</div>}
          <CultivoForm
            onSubmit={handleAdd}
            onCancel={() => { setShowForm(false); setFormError(null); }}
          />
        </div>
      )}

      <CultivosFilter onFiltersChange={setFilters} />

      <CultivosTable 
        data={filteredCultivos} 
        loading={loading}
        onUpdate={updateCultivo} // ✅ VITAL: Pasar función del hook
        onDataChange={reload}
      />
    </AdminLayout>
  );
}