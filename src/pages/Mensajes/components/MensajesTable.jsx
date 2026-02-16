import { useState } from 'react';
import TableCard from '../../../components/TableCard';
import { mensajesColumns } from '../mensajes.config';
import { ButtonPrimary } from '../../../components/Buttons'; 
import { BiEdit } from 'react-icons/bi'; 
import MensajeForm from './MensajeForm';
import Modal from '../../../components/Modal';
import { getBadgeClass } from '../../../utils/badgeStates';

// ✅ Agregamos 'onUpdate' a las props del componente
export default function MensajesTable({ data, loading, onDataChange, onUpdate, configForm, showActions = true }) {
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
    ? (row) => (
        <div className="table-row-actions" style={{ display: 'flex', gap: '0.5rem' }}>
          <ButtonPrimary icon={BiEdit} onClick={() => setEditingMensaje(row)}>
            Editar
          </ButtonPrimary>
        </div>
      )
    : null;

  const handleFormClose = () => setEditingMensaje(null);

  // =========================
  // Submit del formulario (Corregido para mostrar notificación)
  // =========================
  const handleFormSubmit = async (updatedMensaje) => {
    try {
      if (editingMensaje && onUpdate) {
        // ✅ CAMBIO CLAVE: Llamamos a la prop que viene del Hook
        // Esto activará el toast.promise de éxito/error/cargando
        await onUpdate(editingMensaje.idmen, updatedMensaje);
      }

      setEditingMensaje(null);
      // No necesitas llamar a onDataChange() porque el Hook ya recarga los datos solo
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