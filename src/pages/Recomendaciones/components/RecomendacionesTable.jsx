import { useState } from 'react';
import TableCard from '../../../components/TableCard';
import { recomendacionesColumns } from '../recomendaciones.config';
import { ButtonPrimary } from '../../../components/Buttons'; 
import { BiEdit } from 'react-icons/bi'; 
import RecomendacionForm from './RecomendacionForm';
import Modal from '../../../components/Modal';
import recomendacionesService from '../../../services/recomendaciones.service';
import { getBadgeClass } from '../../../utils/badgeStates';

export default function RecomendacionesTable({ data, loading, onDataChange, configForm, showActions = true }) {
  const [editingRec, setEditingRec] = useState(null);

  // =========================
  // Renderizado de badges
  // =========================
const renderEstado = (row) => (
  <span className={`badge ${getBadgeClass(row.estadoNombre)}`}>
    {row.estadoNombre}
  </span>
);


  const renderPrioridad = (row) => (
    <span className="text-muted fw-medium">{row.prioridadNombre || '—'}</span>
  );

  // =========================
  // Columnas
  // =========================
  const columns = recomendacionesColumns.map(col => {
    if (col.accessor === 'estadoNombre') return { ...col, render: renderEstado };
    if (col.accessor === 'prioridadNombre') return { ...col, render: renderPrioridad };
    return col;
  });

  // =========================
  // Acciones por fila
  // =========================
  const rowActions = showActions
    ? (row) => (
        <div className="table-row-actions" style={{ display: 'flex', gap: '0.5rem' }}>
          <ButtonPrimary icon={BiEdit} onClick={() => setEditingRec(row)}>
            Editar
          </ButtonPrimary>
        </div>
      )
    : null;

  // =========================
  // Cerrar modal
  // =========================
  const handleFormClose = () => setEditingRec(null);

  // =========================
  // Submit del formulario (edición o creación)
  // =========================
  const handleFormSubmit = async (updatedRec) => {
    try {
      if (editingRec) {
        // Llamar al servicio directamente
        await recomendacionesService.update(editingRec.idrec, updatedRec);
      }

      setEditingRec(null);

      // Recargar datos en el Page
      if (onDataChange) await onDataChange();
    } catch (error) {
      console.error('Error actualizando recomendación:', error);
      alert('No se pudo actualizar la recomendación. Verifique los datos.');
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
