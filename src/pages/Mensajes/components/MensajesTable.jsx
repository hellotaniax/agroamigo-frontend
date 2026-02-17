import { useState } from 'react';
import TableCard from '../../../components/TableCard';
import { mensajesColumns } from '../mensajes.config';
import { ButtonPrimary } from '../../../components/Buttons'; 
import { BiEdit } from 'react-icons/bi'; 
import MensajeForm from './MensajeForm';
import Modal from '../../../components/Modal';
import { getBadgeClass } from '../../../utils/badgeStates';
import { hasPermission } from '../../../utils/permissions';

export default function MensajesTable({ 
  data, 
  loading, 
  onDataChange, 
  onUpdate, 
  configForm, 
  showActions = true,
  onEditStart,  // ✅ Nueva prop
  onEditEnd     // ✅ Nueva prop
}) {
  const [editingMensaje, setEditingMensaje] = useState(null);

  const renderEstado = (row) => (
    <span className={`badge ${getBadgeClass(row.estadoNombre)}`}>
      {row.estadoNombre}
    </span>
  );

  const columns = mensajesColumns.map(col => {
    if (col.accessor === 'estadoNombre') return { ...col, render: renderEstado };
    return col;
  });

  const rowActions = showActions
    ? (row) => {
        if (!hasPermission('mensajes', 'update')) return null;
        return (
          <div className="table-row-actions" style={{ display: 'flex', gap: '0.5rem' }}>
            <ButtonPrimary 
              icon={BiEdit} 
              onClick={() => {
                setEditingMensaje(row);
                onEditStart?.(); // ✅ Notificar que comenzó la edición
              }}
            >
              Editar
            </ButtonPrimary>
          </div>
        );
      }
    : null;

  const handleFormClose = () => {
    setEditingMensaje(null);
    onEditEnd?.(); // ✅ Notificar que terminó la edición
  };

  // =========================
  // Submit del formulario (Corregido para mostrar notificación)
  // =========================
  const handleFormSubmit = async (updatedMensaje) => {
    try {
      if (editingMensaje && onUpdate) {
        await onUpdate(editingMensaje.idmen, updatedMensaje);
      }
      setEditingMensaje(null);
      onEditEnd?.(); // ✅ Notificar que terminó la edición
    } catch (error) {
      console.error('Error actualizando mensaje:', error);
    }
  };

  return (
    <>
      <TableCard
        title="Mensajes registrados"
        columns={columns}
        data={data}
        loading={loading}
        rowActions={rowActions}
      />

      {editingMensaje && (
        <Modal onClose={handleFormClose}>
          <MensajeForm
            initialValues={editingMensaje}
            config={configForm}
            onCancel={handleFormClose}
            onSubmit={handleFormSubmit}
          />
        </Modal>
      )}
    </>
  );
}