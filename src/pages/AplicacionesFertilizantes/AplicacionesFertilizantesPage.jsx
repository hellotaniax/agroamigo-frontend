import AdminLayout from '../../layouts/AdminLayout';
import useAplicacionesData from './useAplicacionesData';
import AplicacionesTable from './components/AplicacionesTable';
import AplicacionesFilter from './components/AplicacionesFilter';
import AplicacionForm from './components/AplicacionForm';
import { AddButton } from '../../components/Buttons';
import { hasPermission } from '../../utils/permissions';
import { useState, useMemo } from 'react';

export default function AplicacionesFertilizantesPage() {
  const [filters, setFilters] = useState({ search: '', forma: '', etapa: '' });
  const [isEditing, setIsEditing] = useState(false); // ✅ Nuevo estado

  const { aplicaciones, loading, addAplicacion, updateAplicacion, reload } = useAplicacionesData();
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState(null);

  const filtered = useMemo(() => {
    return aplicaciones.filter(a =>
      a.fertilizanteNombre.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.forma === '' || String(a.idfor) === filters.forma) &&
      (filters.etapa === '' || String(a.ideta) === filters.etapa) &&
      (filters.estado === '' || String(a.idest) === filters.estado) // Nuevo filtro lógico
    );
  }, [aplicaciones, filters]);

  const handleAdd = async (data) => {
    try {
      setFormError(null);
      await addAplicacion(data);
      setShowForm(false);
    } catch (err) {
      setFormError('Revisa los datos ingresados e intenta de nuevo.');
    }
  };

  return (
    <AdminLayout 
      breadcrumbs={[{ label: 'Aplicaciones de fertilizantes' }]}
      hideHeader={isEditing} // ✅ Ocultar header cuando se está editando
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-semibold">Aplicaciones de fertilizantes</h4>
        {hasPermission('aplicacionesfertilizantes', 'create') && (
          <AddButton onClick={() => setShowForm(true)}>Agregar aplicación</AddButton>
        )}
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
        onUpdate={updateAplicacion}
        onDataChange={reload}
        onEditStart={() => setIsEditing(true)}  // ✅ Cuando comienza edición
        onEditEnd={() => setIsEditing(false)}   // ✅ Cuando termina edición
      />
    </AdminLayout>
  );
}