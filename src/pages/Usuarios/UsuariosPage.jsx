import AdminLayout from '../../layouts/AdminLayout';
import useUsuariosData from './useUsuariosData';
import UsuariosTable from './components/UsuariosTable';
import UsuariosFilter from './components/UsuariosFilter';
import UsuarioForm from './components/UsuarioForm';
import { AddButton } from '../../components/Buttons';
import { useState } from 'react';

export default function UsuariosPage() {
  const { usuarios, loading, addUsuario } = useUsuariosData();
  const [filters, setFilters] = useState({ search: '', state: '' });
  const [showForm, setShowForm] = useState(false);

  const filtered = usuarios.filter(u =>
    (u.nombreusu.toLowerCase().includes(filters.search.toLowerCase()) ||
     u.apellidosusu.toLowerCase().includes(filters.search.toLowerCase()) ||
     u.emailusu.toLowerCase().includes(filters.search.toLowerCase())) &&
    (filters.state === '' || u.estadoNombre === filters.state)
  );

  const handleAdd = (data) => {
    addUsuario(data);
    setShowForm(false);
  };

  return (
    <AdminLayout breadcrumbs={[{ label: 'Usuarios' }]}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-semibold">Lista de Usuarios</h4>
        <AddButton onClick={() => setShowForm(true)}>Agregar usuario</AddButton>
      </div>

      {showForm && (
        <UsuarioForm
          onSubmit={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}

      <UsuariosFilter onFiltersChange={setFilters} />

      <UsuariosTable data={filtered} loading={loading} />
    </AdminLayout>
  );
}
