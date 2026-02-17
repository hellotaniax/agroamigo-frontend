import { useState } from 'react';
import TableCard from '../../../components/TableCard';
import { fertilizantesColumns } from '../fertilizantes.config';
import { getBadgeClass } from '../../../utils/badgeStates';
import FertilizanteForm from './FertilizanteForm';
import Modal from '../../../components/Modal';
import { BiEdit } from 'react-icons/bi';
import { ButtonPrimary } from '../../../components/Buttons';
import { hasPermission } from '../../../utils/permissions';

export default function FertilizantesTable({ 
  data, 
  loading, 
  onDataChange, 
  onUpdate, 
  onDelete, 
  showActions = true,
  onEditStart,  // ✅ Nueva prop
  onEditEnd     // ✅ Nueva prop
}) {
  const [editingFert, setEditingFert] = useState(null);

  const renderEstado = (row) => (
    <span className={`badge ${getBadgeClass(row.estadoNombre)}`}>
      {row.estadoNombre}
    </span>
  );

  const columns = fertilizantesColumns.map(col => {
    if (col.accessor === 'estadoNombre') return { ...col, render: renderEstado };
    return col;
  });

  const rowActions = showActions
    ? (row) => {
        if (!hasPermission('fertilizantes', 'update')) return null;
        return (
          <div className="table-row-actions" style={{ display: 'flex', gap: '0.5rem' }}>
            <ButtonPrimary 
              icon={BiEdit} 
              onClick={() => {
                setEditingFert(row);
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
    setEditingFert(null);
    onEditEnd?.(); // ✅ Notificar que terminó la edición
  };

  const handleFormSubmit = async (updatedFert) => {
    try {
      if (editingFert && onUpdate) {
        await onUpdate(editingFert.idfer, updatedFert);
      }
      setEditingFert(null);
      onEditEnd?.(); // ✅ Notificar que terminó la edición
    } catch (error) {
      console.error('Error en submit tabla:', error);
    }
  };

  return (
    <>
      <TableCard
        title="Fertilizantes registrados"
        columns={columns}
        data={data}
        loading={loading}
        rowActions={rowActions}
      />
      {editingFert && (
        <Modal onClose={handleFormClose}>
          <FertilizanteForm
            initialValues={editingFert}
            onSubmit={handleFormSubmit}
            onCancel={handleFormClose}
          />
        </Modal>
      )}
    </>
  );
}