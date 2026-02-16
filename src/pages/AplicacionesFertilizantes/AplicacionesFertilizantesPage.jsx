import AdminLayout from '../../layouts/AdminLayout';
import useAplicacionesData from './useAplicacionesData';
import AplicacionesTable from './components/AplicacionesTable';
import AplicacionesFilter from './components/AplicacionesFilter';
import AplicacionForm from './components/AplicacionForm';
import { AddButton } from '../../components/Buttons';
import { useState, useMemo } from 'react';

export default function AplicacionesFertilizantesPage() {
  const [filters, setFilters] = useState({ search: '', forma: '', etapa: '' });
  

  const { aplicaciones, loading, addAplicacion, updateAplicacion, reload } = useAplicacionesData();
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState(null);


  const filtered = useMemo(() => {
    return aplicaciones.filter(a =>
      a.fertilizanteNombre.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.forma === '' || a.formaId === filters.forma) &&
      (filters.etapa === '' || a.etapaId === filters.etapa)
    );
  }, [aplicaciones, filters]);

  const handleAdd = async (data) => {
    try {
      setFormError(null);
      await addAplicacion(data); // El toast se dispara desde el hook
      setShowForm(false);
    } catch (err) {
      setFormError('Revisa los datos ingresados e intenta de nuevo.');
    }
  };

  return (
    <AdminLayout breadcrumbs={[{ label: 'Aplicaciones de fertilizantes' }]}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-semibold">Aplicaciones de fertilizantes</h4>
        <AddButton onClick={() => setShowForm(true)}>Agregar aplicación</AddButton>
      </div>

      {showForm && (
        <div className="mb-4">
          {formError && <div className="alert alert-danger">{formError}</div>}
          <AplicacionForm
            onSubmit={handleAdd}
            onCancel={() => { setShowForm(false); setFormError(null); }}
          />
        </div>
      )}

      <AplicacionesFilter onFiltersChange={setFilters} />

      <AplicacionesTable
        data={filtered}
        loading={loading}
        onUpdate={updateAplicacion} // ✅ VITAL para la notificación
        onDataChange={reload}
      />
    </AdminLayout>
  );
}