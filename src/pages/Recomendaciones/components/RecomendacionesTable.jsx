import { useState } from 'react';
import TableCard from '../../../components/TableCard';
import { recomendacionesColumns } from '../recomendaciones.config';
import { ButtonPrimary } from '../../../components/Buttons'; 
import { BiEdit } from 'react-icons/bi'; 
import RecomendacionForm from './RecomendacionForm';
import Modal from '../../../components/Modal';
import { getBadgeClass } from '../../../utils/badgeStates';

export default function RecomendacionesTable({ 
  data, 
  loading, 
  onDataChange, 
  onUpdate, 
  configForm, 
  showActions = true,
  onEditStart,  // ✅ Nueva prop
  onEditEnd     // ✅ Nueva prop
}) {
  const [editingRec, setEditingRec] = useState(null);

  const renderEstado = (row) => (
    <span className={`badge ${getBadgeClass(row.estadoNombre)}`}>
      {row.estadoNombre}
    </span>
  );

  const renderPrioridad = (row) => (
    <span className="text-muted fw-medium">{row.prioridadNombre || '—'}</span>
  );

  const columns = recomendacionesColumns.map(col => {
    if (col.accessor === 'estadoNombre') return { ...col, render: renderEstado };
    if (col.accessor === 'prioridadNombre') return { ...col, render: renderPrioridad };
    return col;
  });

  const rowActions = showActions
    ? (row) => (
        <div className="table-row-actions" style={{ display: 'flex', gap: '0.5rem' }}>
          <ButtonPrimary 
            icon={BiEdit} 
            onClick={() => {
              setEditingRec(row);
              onEditStart?.(); // ✅ Notificar que comenzó la edición
            }}
          >
            Editar
          </ButtonPrimary>
        </div>
      )
    : null;

  const handleFormClose = () => {
    setEditingRec(null);
    onEditEnd?.(); // ✅ Notificar que terminó la edición
  };

  // =========================
  // Submit del formulario (Corregido)
  // =========================
  const handleFormSubmit = async (updatedRec) => {
    try {
      if (editingRec && onUpdate) {
        await onUpdate(editingRec.idrec, updatedRec);
      }
      setEditingRec(null);
      onEditEnd?.(); // ✅ Notificar que terminó la edición
    } catch (error) {
      console.error('Error en el submit de tabla:', error);
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

      {editingRec && (
        <Modal onClose={handleFormClose}>
          <RecomendacionForm
            initialValues={editingRec}
            config={configForm}
            onCancel={handleFormClose}
            onSubmit={handleFormSubmit}
          />
        </Modal>
      )}
    </>
  );
}