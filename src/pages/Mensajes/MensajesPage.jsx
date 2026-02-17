import { useState, useMemo } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import useMensajesData from './useMensajesData';
import MensajesTable from './components/MensajesTable';
import MensajesFilter from './components/MensajesFilter';
import MensajeForm from './components/MensajeForm';
import { AddButton } from '../../components/Buttons';
import { hasPermission } from '../../utils/permissions';
import { mensajeFormConfig } from './mensajes.config';

export default function MensajesPage() {
  // =========================
  // Estados locales
  // =========================
  const [filters, setFilters] = useState({ search: '', estado: '' });
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // ✅ Nuevo estado

  // =========================
  // Hook de datos
  // =========================
  const { 
    mensajes, 
    estados, 
    loading, 
    reload, 
    addMensaje,
    updateMensaje 
  } = useMensajesData(filters);

  // =========================
  // Config dinámica del formulario
  // =========================
  const formConfigWithOptions = useMemo(() => {
    return mensajeFormConfig.map(field => {
      if (field.key === 'idest') {
        return {
          ...field,
          options: [
            ...estados.map(e => ({ value: String(e.idest), label: e.nombreest }))
          ]
        };
      }
      return field;
    });
  }, [estados]);

  // =========================
  // Handlers
  // =========================
  const handleAdd = async (data) => {
    try {
      setFormError(null);
      await addMensaje(data);
      setShowForm(false);
    } catch (error) {
      setFormError('Error al guardar el mensaje. Inténtalo de nuevo.');
      console.error(error);
    }
  };

  // =========================
  // Render
  // =========================
  return (
    <AdminLayout 
      breadcrumbs={[{ label: 'Mensajes' }]}
      hideHeader={isEditing} // ✅ Ocultar header cuando se está editando
    >
      {/* Header con título y botón */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-semibold">Lista de Mensajes</h4>
        {hasPermission('mensajes', 'create') && (
          <AddButton onClick={() => setShowForm(true)}>
            Agregar mensaje
          </AddButton>
        )}
      </div>

      {/* Formulario inline para agregar */}
      {showForm && (
        <div className="mb-4">
          {formError && (
            <div className="alert alert-danger" role="alert">
              {formError}
            </div>
          )}
          <MensajeForm
            config={formConfigWithOptions}
            onSubmit={handleAdd}
            onCancel={() => {
              setShowForm(false);
              setFormError(null);
            }}
          />
        </div>
      )}

      {/* Panel de filtros */}
      <MensajesFilter 
        onFiltersChange={setFilters}
        estados={estados}
        loading={loading}
      />

      {/* Tabla de mensajes */}
      <MensajesTable 
        data={mensajes}
        loading={loading}
        onUpdate={updateMensaje}
        onDataChange={reload}
        configForm={formConfigWithOptions}
        onEditStart={() => setIsEditing(true)}  // ✅ Cuando comienza edición
        onEditEnd={() => setIsEditing(false)}   // ✅ Cuando termina edición
      />
    </AdminLayout>
  );
}