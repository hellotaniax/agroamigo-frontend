import AdminLayout from '../../layouts/AdminLayout';
import useRecomendacionesData from './useRecomendacionesData';
import RecomendacionesTable from './components/RecomendacionesTable';
import RecomendacionesFilter from './components/RecomendacionesFilter';
import RecomendacionForm from './components/RecomendacionForm';
import { AddButton } from '../../components/Buttons';
import { useState } from 'react';

// Importamos las constantes de configuración estática
import { 
  recomendacionFormConfig, 
  recomendacionesFiltersConfig 
} from './recomendaciones.config';

export default function RecomendacionesPage() {
  // ✅ Extraemos todas las funciones necesarias, incluyendo updateRecomendacion
  const { 
    recomendaciones, 
    loading, 
    addRecomendacion, 
    updateRecomendacion, // Para guardar cambios en la edición
    deleteRecomendacion, 
    reload, 
    estados, 
    prioridades 
  } = useRecomendacionesData(); 

  const [filters, setFilters] = useState({ search: '', estado: '', priority: '' });
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState(null);

  /**
   * 🔹 Inyección dinámica de opciones (Mapeo)
   * Transformamos los catálogos de la DB en opciones para los selects
   */
  const dynamicFormConfig = recomendacionFormConfig.map(field => {
    if (field.key === 'idest') {
      return { ...field, options: [
        { value: '', label: 'Seleccione estado...' },
        ...estados.map(e => ({ value: String(e.idest), label: e.nombreest }))
      ]};
    }
    if (field.key === 'idpri') {
      return { ...field, options: [
        { value: '', label: 'Seleccione prioridad...' },
        ...prioridades.map(p => ({ value: String(p.idpri), label: p.nombrepri }))
      ]};
    }
    return field;
  });

  const dynamicFiltersConfig = recomendacionesFiltersConfig.map(filter => {
    if (filter.key === 'estado') {
      return { ...filter, options: [
        ...estados.map(e => ({ value: e.nombreest, label: e.nombreest }))
      ]};
    }
    if (filter.key === 'priority') {
      return { ...filter, options: [
        ...prioridades.map(p => ({ value: p.nombrepri, label: p.nombrepri }))
      ]};
    }
    return filter;
  });

  // Filtrado en memoria
  const filteredRecomendaciones = recomendaciones.filter(r => 
    (r.titulorec.toLowerCase().includes(filters.search.toLowerCase()) ||
     r.descripcionrec.toLowerCase().includes(filters.search.toLowerCase())) &&
    (filters.estado === '' || r.estadoNombre === filters.estado) &&
    (filters.priority === '' || r.prioridadNombre === filters.priority)
  );

  // Callback para agregar recomendación
  const handleAdd = async (data) => {
    try {
      setFormError(null);
      await addRecomendacion(data);
      setShowForm(false);
    } catch (error) {
      setFormError('Error al guardar la recomendación. Inténtalo de nuevo.');
      console.error(error);
    }
  };

  return (
    <AdminLayout breadcrumbs={[{ label: 'Recomendaciones' }]}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-semibold">Lista de Recomendaciones</h4>
        <AddButton onClick={() => setShowForm(true)}>Agregar recomendación</AddButton>
      </div>

      {/* Formulario de Creación */}
      {showForm && (
        <div className="mb-4">
          {formError && (
            <div className="alert alert-danger" role="alert">
              {formError}
            </div>
          )}
          <RecomendacionForm
            config={dynamicFormConfig}
            onSubmit={handleAdd}
            onCancel={() => {
              setShowForm(false);
              setFormError(null);
            }}
          />
        </div>
      )}

      <RecomendacionesFilter 
      config={dynamicFiltersConfig} 
      onFiltersChange={setFilters} 
      />

      <RecomendacionesTable 
        data={filteredRecomendaciones} 
        loading={loading}
        onDelete={deleteRecomendacion} // Función para eliminar
        onUpdate={updateRecomendacion} // ✅ Función para guardar ediciones
        onDataChange={reload}          // Refresco tras acciones
        configForm={dynamicFormConfig} // ✅ Configuración para el modal de edición
      />
    </AdminLayout>
  );
}