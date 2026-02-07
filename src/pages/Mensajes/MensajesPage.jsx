// src/pages/Mensajes/MensajesPage.jsx
import AdminLayout from '../../layouts/AdminLayout';
import useMensajesData from './useMensajesData';
import MensajesTable from './components/MensajesTable';
import MensajesFilter from './components/MensajesFilter';
import MensajeForm from './components/MensajeForm';
import { AddButton } from '../../components/Buttons';
import { useState } from 'react';

export default function MensajesPage() {
  const { mensajes, loading, addMensaje } = useMensajesData();
  const [filters, setFilters] = useState({ search: '', state: '' });
  const [showForm, setShowForm] = useState(false);

  // Filtrado local de mensajes según filtros activos
  const filteredMensajes = mensajes.filter(m => 
    (m.codigomen.toLowerCase().includes(filters.search.toLowerCase()) ||
     m.contenidomen.toLowerCase().includes(filters.search.toLowerCase())) &&
    (filters.state === '' || m.estadoNombre === filters.state)
  );

  const handleAdd = (data) => {
    addMensaje(data);
    setShowForm(false);
  };

  return (
    <AdminLayout breadcrumbs={[{ label: 'Mensajes' }]}>
      {/* Header con título y botón */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-semibold">Lista de Mensajes</h4>
        <AddButton onClick={() => setShowForm(true)}>Agregar mensaje</AddButton>
      </div>

      {/* Formulario para agregar mensaje */}
      {showForm && (
        <MensajeForm
          onSubmit={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Filtros */}
      <MensajesFilter onFiltersChange={setFilters} />

      {/* Tabla de mensajes */}
      <MensajesTable data={filteredMensajes} loading={loading} />
    </AdminLayout>
  );
}
