import { useState } from 'react';
import TableCard from '../../../components/TableCard';
import { fertilizantesColumns } from '../fertilizantes.config';
import { getBadgeClass } from '../../../utils/badgeStates';
import FertilizanteForm from './FertilizanteForm';
import Modal from '../../../components/Modal';
import fertilizantesService from '../../../services/fertilizantes.service';
import { BiEdit } from 'react-icons/bi';
import { ButtonPrimary } from '../../../components/Buttons';

export default function FertilizantesTable({ data, loading, onDataChange, showActions = true }) {
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
    ? (row) => (
        <div className="table-row-actions" style={{ display: 'flex', gap: '0.5rem' }}>
          <ButtonPrimary icon={BiEdit} onClick={() => setEditingFert(row)}>
            Editar
          </ButtonPrimary>
        </div>
      )
    : null;

  const handleFormClose = () => setEditingFert(null);

  const handleFormSubmit = async (updatedFert) => {
    try {
      await fertilizantesService.update(updatedFert.idfer, updatedFert);
      setEditingFert(null);
      if (onDataChange) onDataChange(); // ✅ Dispara reload en el page
    } catch (error) {
      console.error('Error actualizando fertilizante:', error);
      alert('Error al actualizar el fertilizante');
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
