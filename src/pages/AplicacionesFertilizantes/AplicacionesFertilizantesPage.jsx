import AdminLayout from '../../layouts/AdminLayout';
import useAplicacionesData from './useAplicacionesData';
import AplicacionesTable from './components/AplicacionesTable';
import AplicacionesFilter from './components/AplicacionesFilter';
import AplicacionForm from './components/AplicacionForm';
import { AddButton } from '../../components/Buttons';
import { useState } from 'react';

export default function AplicacionesFertilizantesPage() {
  const { aplicaciones, loading, addAplicacion, reload } = useAplicacionesData();
  const [filters, setFilters] = useState({ search: '', forma: '', etapa: '' });
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState(null);

  const filtered = aplicaciones.filter(a =>
    a.fertilizanteNombre.toLowerCase().includes(filters.search.toLowerCase()) &&
    (filters.forma === '' || a.formaId === filters.forma) &&
    (filters.etapa === '' || a.etapaId === filters.etapa)
  );

  const handleAdd = async (data) => {
    try {
      setFormError(null);
      await addAplicacion(data);
      setShowForm(false);
      reload();
    } catch (err) {
      console.error(err);
      setFormError('Error al guardar la aplicación. Inténtalo de nuevo.');
    }
  };

  // DEBUG: mostrar filtros y primeras aplicaciones (temporal)
  console.debug('AplicacionesPage - filters ->', filters);
  console.debug('AplicacionesPage - aplicaciones sample ->', aplicaciones.slice(0, 5));

  return (
    <AdminLayout breadcrumbs={[{ label: 'Aplicaciones de fertilizantes' }]}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-semibold">Aplicaciones de fertilizantes</h4>
        <AddButton onClick={() => setShowForm(true)}>Agregar aplicación</AddButton>
      </div>

      {showForm && (
        <div>
          {formError && (
            <div className="alert alert-danger" role="alert">{formError}</div>
          )}
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
        onDataChange={reload}
      />
    </AdminLayout>
  );
}
