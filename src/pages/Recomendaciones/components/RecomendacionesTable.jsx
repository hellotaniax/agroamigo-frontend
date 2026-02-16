import { useState } from 'react';
import TableCard from '../../../components/TableCard';
import { recomendacionesColumns, estadoBadgeClass } from '../recomendaciones.config';
import { ButtonPrimary } from '../../../components/Buttons'; 
import { BiEdit } from 'react-icons/bi'; 
import RecomendacionForm from './RecomendacionForm';
import Modal from '../../../components/Modal';

export default function RecomendacionesTable({ data, loading, onUpdate, onDataChange, configForm }) {
  const [editing, setEditing] = useState(null);

  // 1. Renderizado de Badges (Igual que en Cultivos)
  const renderEstado = (row) => (
    <span className={`badge ${estadoBadgeClass[row.estadoNombre] || ''}`}>
      {row.estadoNombre}
    </span>
  );

  const renderPrioridad = (row) => (
    <span className="text-muted fw-medium">{row.prioridadNombre || '—'}</span>
  );

  // 2. Mapeo de columnas con renderizadores
  const columns = recomendacionesColumns.map(col => {
    if (col.accessor === 'estadoNombre') return { ...col, render: renderEstado };
    if (col.accessor === 'prioridadNombre') return { ...col, render: renderPrioridad };
    return col;
  });

  // 3. Acciones: Solo botón Editar
  // src/pages/Recomendaciones/components/RecomendacionesTable.jsx

const rowActions = (row) => (
  <div className="table-row-actions">
    <ButtonPrimary icon={BiEdit} onClick={() => setEditing(row)}>
      Editar
    </ButtonPrimary>
    {/* ✅ Botón de eliminar removido según tu solicitud */}
  </div>
);

  const handleClose = () => setEditing(null);

  const handleFormSubmit = async (formData) => {
  try {
    if (editing) {
      await onUpdate(editing.idrec, formData);
    }
    setEditing(null);
    if (onDataChange) await onDataChange(); // Refresca la tabla
  } catch (error) {
    console.error("Error al actualizar:", error);
    alert("No se pudo actualizar la recomendación. Verifique los datos.");
  }
};

  return (
    <>
      <TableCard
        title="Recomendaciones registradas"
        columns={columns}
        data={data}
        loading={loading}
        rowActions={rowActions}
      />

      {editing && (
        <Modal onClose={handleClose}>
          <RecomendacionForm
            initialValues={editing}
            config={configForm}
            onCancel={handleClose}
            onSubmit={handleFormSubmit}
          />
        </Modal>
      )}
    </>
  );
}