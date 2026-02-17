import { useState } from 'react';
import TableCard from '../../../components/TableCard';
import { cultivosColumns } from '../cultivos.config';
import { getBadgeClass } from '../../../utils/badgeStates';
import CultivoForm from './CultivoForm';
import Modal from '../../../components/Modal';
import { BiEdit } from 'react-icons/bi';
import { ButtonPrimary } from '../../../components/Buttons';

export default function CultivosTable({ 
  data, 
  loading, 
  showActions = true, 
  onUpdate, 
  onDataChange,
  onEditStart,  // ✅ Nueva prop
  onEditEnd     // ✅ Nueva prop
}) {
  const [editingCultivo, setEditingCultivo] = useState(null);

  const renderEstado = (row) => (
    <span className={`badge ${getBadgeClass(row.estadoNombre)}`}>
      {row.estadoNombre}
    </span>
  );

  const renderFecha = (row) => new Date(row.creacioncul).toLocaleDateString();

  const columns = cultivosColumns.map(col => {
    if (col.accessor === 'estadoNombre') return { ...col, render: renderEstado };
    if (col.accessor === 'creacioncul') return { ...col, render: renderFecha };
    return col;
  });

  const rowActions = showActions
    ? (row) => (
        <div className="table-row-actions" style={{ display: 'flex', gap: '0.5rem' }}>
          <ButtonPrimary 
            icon={BiEdit} 
            onClick={() => {
              setEditingCultivo(row);
              onEditStart?.(); // ✅ Notificar que comenzó la edición
            }}
          >
            Editar
          </ButtonPrimary>
        </div>
      )
    : null;

  const handleFormClose = () => {
    setEditingCultivo(null);
    onEditEnd?.(); // ✅ Notificar que terminó la edición
  };

  const handleFormSubmit = async (updatedCultivo) => {
    try {
      if (onUpdate && editingCultivo) {
        await onUpdate(editingCultivo.idcul, updatedCultivo);
        setEditingCultivo(null);
        onEditEnd?.(); // ✅ Notificar que terminó la edición
      }
    } catch (error) {
      console.error('Error en el submit de cultivos:', error);
    }
  };

  return (
    <>
      <TableCard 
        title="Cultivos registrados" 
        columns={columns} 
        data={data} 
        loading={loading} 
        rowActions={rowActions} 
      />
      {editingCultivo && (
        <Modal onClose={handleFormClose}>
          <CultivoForm 
            initialValues={editingCultivo} 
            onCancel={handleFormClose} 
            onSubmit={handleFormSubmit} 
          />
        </Modal>
      )}
    </>
  );
}