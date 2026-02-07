import { useState, useEffect } from 'react';
import TableCard from '../../../components/TableCard';
import { mensajesColumns, estadoBadgeClass } from '../mensajes.config';
import { ButtonPrimary } from '../../../components/Buttons';
import { BiEdit } from 'react-icons/bi';
import MensajeForm from './MensajeForm';
import Modal from '../../../components/Modal';

export default function MensajesTable({ data, loading, showActions = true }) {
  const [editingMensaje, setEditingMensaje] = useState(null);
  const [tableData, setTableData] = useState(data);

  useEffect(() => setTableData(data), [data]);

  // Renderiza estado con badge
  const renderEstado = (row) => (
    <span className={`badge ${estadoBadgeClass[row.estadoNombre] || ''}`}>
      {row.estadoNombre}
    </span>
  );

  // Mapear columnas para usar renderers
  const columns = mensajesColumns.map(col => {
    if (col.accessor === 'estadoNombre') return { ...col, render: renderEstado };
    return col;
  });

  // Acciones por fila
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

  // Mapeos para convertir IDs a nombres
  const estadosMap = {
    '1': 'Activo',
    '2': 'Borrador',
    '3': 'Archivado',
  };

  const handleFormSubmit = (updatedMensaje) => {
    // Convertir ID a nombre antes de guardar
    const mensajeConNombre = {
      ...updatedMensaje,
      estadoNombre: estadosMap[String(updatedMensaje.idest)] || updatedMensaje.estadoNombre,
    };

    // Actualiza tabla localmente
    setTableData(prev =>
      prev.map(m => (m.idmen === mensajeConNombre.idmen ? mensajeConNombre : m))
    );
    setEditingMensaje(null);
  };

  return (
    <>
      <TableCard
        title="Mensajes registrados"
        columns={columns}
        data={tableData}
        loading={loading}
        rowActions={rowActions}
      />

      {editingMensaje && (
        <Modal onClose={handleFormClose}>
          <MensajeForm
            initialValues={editingMensaje}
            onCancel={handleFormClose}
            onSubmit={handleFormSubmit}
          />
        </Modal>
      )}
    </>
  );
}
