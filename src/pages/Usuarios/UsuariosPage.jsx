import React, { useState, useMemo } from 'react'; // 👈 IMPORTANTE: Añadir useMemo
import AdminLayout from '../../layouts/AdminLayout';
import useUsuariosData from './useUsuariosData';
import UsuariosTable from './components/UsuariosTable';
import UsuariosFilter from './components/UsuariosFilter';
import UsuarioForm from './components/UsuarioForm';
import { AddButton } from '../../components/Buttons';
import { usuarioFormConfig, usuariosFiltersConfig } from './usuarios.config';

export default function UsuariosPage() {
  const [filters, setFilters] = useState({ search: '', estado: '', rol: '' });
  const [showForm, setShowForm] = useState(false);
  
  // Hook de datos
  const { usuarios, loading, addUsuario, updateUsuario, reload, estados, roles } = useUsuariosData(filters);

  // ✅ CORRECCIÓN 1: Usar useMemo para evitar el Bucle Infinito en el Formulario
  const dynamicFormConfig = useMemo(() => {
    return usuarioFormConfig.map(field => {
      if (field.key === 'idest') {
        return { ...field, options: estados.map(e => ({ value: String(e.idest), label: e.nombreest })) };
      }
      if (field.key === 'idrol') {
        return { ...field, options: roles.map(r => ({ value: String(r.idrol), label: r.nombrerol })) };
      }
      return field;
    });
  }, [estados, roles]); // 👈 Solo se recalcula si cambian estados o roles

  // ✅ CORRECCIÓN 2: Usar useMemo para evitar el Bucle Infinito en los Filtros
  const dynamicFiltersConfig = useMemo(() => {
    return usuariosFiltersConfig.map(filter => {
      if (filter.key === 'estado') {
        return { ...filter, options: estados.map(e => ({ value: e.nombreest, label: e.nombreest })) };
      }
      if (filter.key === 'rol') {
        return { ...filter, options: roles.map(r => ({ value: r.nombrerol, label: r.nombrerol })) };
      }
      return filter;
    });
  }, [estados, roles]);

  // Si los datos están cargando y no hay nada que mostrar, mostramos loader
  if (loading && usuarios.length === 0) {
    return (
      <AdminLayout breadcrumbs={[{ label: 'Usuarios' }]}>
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

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

      {/* Panel de Filtros */}
      <UsuariosFilter config={dynamicFiltersConfig} onFiltersChange={setFilters} />
      
      {/* Tabla de Resultados */}
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