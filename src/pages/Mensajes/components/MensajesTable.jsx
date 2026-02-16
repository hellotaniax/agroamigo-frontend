import { useState } from 'react';
import TableCard from '../../../components/TableCard';
import { mensajesColumns } from '../mensajes.config';
import { ButtonPrimary } from '../../../components/Buttons'; 
import { BiEdit } from 'react-icons/bi'; 
import MensajeForm from './MensajeForm';
import Modal from '../../../components/Modal';
import mensajesService from '../../../services/mensajes.service';
import { getBadgeClass } from '../../../utils/badgeStates';

export default function MensajesTable({ data, loading, onDataChange, configForm, showActions = true }) {
  const [editingMensaje, setEditingMensaje] = useState(null);

  // =========================
  // Renderizado de badges
  // =========================
  const renderEstado = (row) => (
    <span className={`badge ${getBadgeClass(row.estadoNombre)}`}>
      {row.estadoNombre}
    </span>
  );

  // =========================
  // Columnas
  // =========================
  const columns = mensajesColumns.map(col => {
    if (col.accessor === 'estadoNombre') return { ...col, render: renderEstado };
    return col;
  });

  // =========================
  // Acciones por fila
  // =========================
  const rowActions = showActions
    ? (row) => (
        <div className="table-row-actions" style={{ display: 'flex', gap: '0.5rem' }}>
          <ButtonPrimary icon={BiEdit} onClick={() => setEditingMensaje(row)}>
            Editar
          </ButtonPrimary>
        </div>
      )
    : null;

  // =========================
  // Cerrar modal
  // =========================
  const handleFormClose = () => setEditingMensaje(null);

  // =========================
  // Submit del formulario (edición)
  // =========================
  const handleFormSubmit = async (updatedMensaje) => {
    try {
      if (editingMensaje) {
        // Llamar al servicio directamente
        await mensajesService.update(editingMensaje.idmen, updatedMensaje);
      }

      setEditingMensaje(null);

      // Recargar datos en el Page
      if (onDataChange) await onDataChange();
    } catch (error) {
      console.error('Error actualizando mensaje:', error);
      alert('No se pudo actualizar el mensaje. Verifique los datos.');
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