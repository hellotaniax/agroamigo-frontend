import { useState } from 'react';
import TableCard from '../../../components/TableCard';
import { aplicacionesColumns } from '../aplicaciones.config';
import AplicacionForm from './AplicacionForm';
import Modal from '../../../components/Modal';
import { BiEdit } from 'react-icons/bi';
import { ButtonPrimary } from '../../../components/Buttons';
import { hasPermission } from '../../../utils/permissions';

export default function AplicacionesTable({ 
  data, 
  loading, 
  onUpdate, 
  showActions = true,
  onEditStart,  // ✅ Nueva prop
  onEditEnd     // ✅ Nueva prop
}) {
  const [editing, setEditing] = useState(null);

  const columns = aplicacionesColumns.map(col => {
    if (col.accessor === 'dosisRange') return { ...col, render: (row) => `${row.dosisminapl} - ${row.dosismaxapl}` };
    return col;
  });

  const rowActions = showActions
    ? (row) => {
        if (!hasPermission('aplicacionesfertilizantes', 'update')) return null;
        return (
          <div className="table-row-actions" style={{ display: 'flex', gap: '0.5rem' }}>
            <ButtonPrimary 
              icon={BiEdit} 
              onClick={() => {
                setEditing(row);
                onEditStart?.(); // ✅ Notificar que comenzó la edición
              }}
            >
              Editar
            </ButtonPrimary>
          </div>
        );
      }
    : null;

  const handleClose = () => {
    setEditing(null);
    onEditEnd?.(); // ✅ Notificar que terminó la edición
  };

  const handleSubmit = async (updated) => {
    try {
      const id = updated.idapl || updated.id;
      if (onUpdate) {
        await onUpdate(id, updated);
        setEditing(null);
        onEditEnd?.(); // ✅ Notificar que terminó la edición
      }
    } catch (err) {
      console.error('Error en el submit de la tabla', err);
    }
  };

  return (
    <>
      <TableCard 
        title="Aplicaciones registradas" 
        columns={columns} 
        data={data} 
        loading={loading} 
        rowActions={rowActions} 
      />
      {editing && (
        <Modal onClose={handleClose}>
          <AplicacionForm 
            initialValues={editing} 
            onSubmit={handleSubmit} 
            onCancel={handleClose} 
          />
        </Modal>
      )}
    </>
  );
}