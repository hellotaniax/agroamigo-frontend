import AdminLayout from '../../layouts/AdminLayout';
import useUsuariosData from './useUsuariosData';
import UsuariosTable from './components/UsuariosTable';
import UsuariosFilter from './components/UsuariosFilter';
import UsuarioForm from './components/UsuarioForm';
import { AddButton } from '../../components/Buttons';
import { useState } from 'react';
import { usuarioFormConfig, usuariosFiltersConfig } from './usuarios.config';

export default function UsuariosPage() {
  const [filters, setFilters] = useState({ search: '', estado: '' });
  const [showForm, setShowForm] = useState(false);
  const { usuarios, loading, addUsuario, updateUsuario, reload, estados, roles } = useUsuariosData(filters);

  const dynamicFormConfig = usuarioFormConfig.map(field => {
  if (field.key === 'idest') {
    return { ...field, options: estados.map(e => ({ value: String(e.idest), label: e.nombreest })) };
  }
  if (field.key === 'idrol') {
    return { ...field, options: roles.map(r => ({ value: String(r.idrol), label: r.nombrerol })) };
  }
  return field; 
});

  const dynamicFiltersConfig = usuariosFiltersConfig.map(filter => {
    if (filter.key === 'estado') return { ...filter, options: estados.map(e => ({ value: e.nombreest, label: e.nombreest })) };
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
          <UsuarioForm config={dynamicFormConfig} onSubmit={async (d) => { await addUsuario(d); setShowForm(false); }} onCancel={() => setShowForm(false)} />
        </div>
      )}

      <UsuariosFilter config={dynamicFiltersConfig} onFiltersChange={setFilters} />
      <UsuariosTable data={usuarios} loading={loading} onUpdate={updateUsuario} onDataChange={reload} configForm={dynamicFormConfig} />
    </AdminLayout>
  );
}