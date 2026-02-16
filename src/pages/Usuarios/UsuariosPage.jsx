import AdminLayout from '../../layouts/AdminLayout';
import useUsuariosData from './useUsuariosData';
import UsuariosTable from './components/UsuariosTable';
import UsuariosFilter from './components/UsuariosFilter';
import UsuarioForm from './components/UsuarioForm';
import { AddButton } from '../../components/Buttons';
import { useState } from 'react';
import { usuarioFormConfig, usuariosFiltersConfig } from './usuarios.config';

export default function UsuariosPage() {
  // Inicializamos el estado del filtro 'rol'
  const [filters, setFilters] = useState({ search: '', estado: '', rol: '' });
  const [showForm, setShowForm] = useState(false);
  
  // Pasamos los filtros al hook
  const { usuarios, loading, addUsuario, updateUsuario, reload, estados, roles } = useUsuariosData(filters);

  // Configuración del Formulario (Crear/Editar)
  const dynamicFormConfig = usuarioFormConfig.map(field => {
    if (field.key === 'idest') {
      return { ...field, options: estados.map(e => ({ value: String(e.idest), label: e.nombreest })) };
    }
    if (field.key === 'idrol') {
      return { ...field, options: roles.map(r => ({ value: String(r.idrol), label: r.nombrerol })) };
    }
    return field; 
  });

  // 👇 2. Configuración de Filtros (Inyectamos opciones de Roles)
  const dynamicFiltersConfig = usuariosFiltersConfig.map(filter => {
    if (filter.key === 'estado') {
      return { ...filter, options: estados.map(e => ({ value: e.nombreest, label: e.nombreest })) };
    }
    // ✅ Aquí llenamos el select de Roles para el filtro
    if (filter.key === 'rol') {
      return { ...filter, options: roles.map(r => ({ value: r.nombrerol, label: r.nombrerol })) };
    }
    return filter;
  });

  if (loading && usuarios.length === 0) return <AdminLayout breadcrumbs={[{ label: 'Usuarios' }]}><div>Cargando...</div></AdminLayout>;

  return (
    <AdminLayout breadcrumbs={[{ label: 'Usuarios' }]}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-semibold">Gestión de Usuarios</h4>
        <AddButton onClick={() => setShowForm(true)}>Agregar usuario</AddButton>
      </div>

      {showForm && (
        <div className="mb-4">
          <UsuarioForm 
            config={dynamicFormConfig} 
            onSubmit={async (d) => { await addUsuario(d); setShowForm(false); }} 
            onCancel={() => setShowForm(false)} 
          />
        </div>
      )}

      {/* Pasamos la configuración dinámica con roles inyectados */}
      <UsuariosFilter config={dynamicFiltersConfig} onFiltersChange={setFilters} />
      
      <UsuariosTable 
        data={usuarios} 
        loading={loading} 
        onUpdate={updateUsuario} 
        onDataChange={reload} 
        configForm={dynamicFormConfig} 
      />
    </AdminLayout>
  );
}