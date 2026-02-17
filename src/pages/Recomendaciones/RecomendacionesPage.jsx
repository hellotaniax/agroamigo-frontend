import AdminLayout from '../../layouts/AdminLayout';
import useRecomendacionesData from './useRecomendacionesData';
import RecomendacionesTable from './components/RecomendacionesTable';
import RecomendacionesFilter from './components/RecomendacionesFilter';
import RecomendacionForm from './components/RecomendacionForm';
import { AddButton } from '../../components/Buttons';
import { hasPermission } from '../../utils/permissions';
import { useState, useMemo } from 'react'; 

// Importamos las constantes de configuración estática
import { 
  recomendacionFormConfig, 
  recomendacionesFiltersConfig 
} from './recomendaciones.config';

export default function RecomendacionesPage() {
  const { 
    recomendaciones, 
    loading, 
    addRecomendacion, 
    updateRecomendacion, 
    deleteRecomendacion, 
    reload, 
    estados, 
    prioridades 
  } = useRecomendacionesData(); 

  const [filters, setFilters] = useState({ search: '', estado: '', priority: '' });
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // ✅ Nuevo estado

  /**
   * ✅ CORRECCIÓN 1: Usar useMemo para la configuración del Formulario
   * Esto evita que se recargue infinitamente al editar o abrir el modal.
   */
  const dynamicFormConfig = useMemo(() => {
    return recomendacionFormConfig.map(field => {
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
  }, [estados, prioridades]); // Solo se recalcula si cambian los catálogos

  /**
   * ✅ CORRECCIÓN 2: Usar useMemo para la configuración de Filtros
   */
  const dynamicFiltersConfig = useMemo(() => {
    return recomendacionesFiltersConfig.map(filter => {
      if (filter.key === 'estado') {
        return { ...filter, options: [
          ...estados.map(e => ({ value: e.nombreest, label: e.nombreest }))
        ]};
      }
      if (filter.key === 'priority') {
        return { ...filter, options: [
          { value: '', label: 'Todas' },
          ...prioridades.map(p => ({ value: p.nombrepri, label: p.nombrepri }))
        ]};
      }
      return filter;
    });
  }, [estados, prioridades]);

  /**
   * ✅ CORRECCIÓN 3: Optimizar el filtrado de datos
   * Evita cálculos innecesarios en cada pulsación de tecla si hay muchos datos.
   */
  const filteredRecomendaciones = useMemo(() => {
    return recomendaciones.filter(r => 
      (r.titulorec.toLowerCase().includes(filters.search.toLowerCase()) ||
       r.descripcionrec.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.estado === '' || r.estadoNombre === filters.estado) &&
      (filters.priority === '' || r.prioridadNombre === filters.priority)
    );
  }, [recomendaciones, filters]);

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

  // Loader preventivo si no hay datos
  if (loading && recomendaciones.length === 0) {
    return (
      <AdminLayout breadcrumbs={[{ label: 'Recomendaciones' }]}>
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      breadcrumbs={[{ label: 'Recomendaciones' }]}
      hideHeader={isEditing} // ✅ Ocultar header cuando se está editando
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-semibold">Lista de Recomendaciones</h4>
        {hasPermission('recomendaciones', 'create') && (
          <AddButton onClick={() => setShowForm(true)}>Agregar recomendación</AddButton>
        )}
      </div>

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
        onDelete={deleteRecomendacion} 
        onUpdate={updateRecomendacion} 
        onDataChange={reload} 
        configForm={dynamicFormConfig}
        onEditStart={() => setIsEditing(true)}  // ✅ Cuando comienza edición
        onEditEnd={() => setIsEditing(false)}   // ✅ Cuando termina edición
      />
    </AdminLayout>
  );
}