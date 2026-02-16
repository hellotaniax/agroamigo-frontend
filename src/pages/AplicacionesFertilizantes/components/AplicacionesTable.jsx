import { useState } from 'react';
import TableCard from '../../../components/TableCard';
import { aplicacionesColumns } from '../aplicaciones.config';
import AplicacionForm from './AplicacionForm';
import Modal from '../../../components/Modal';
import aplicacionesService from '../../../services/aplicacionesfertilizantes.service';
import { BiEdit } from 'react-icons/bi';
import { ButtonPrimary } from '../../../components/Buttons';

export default function AplicacionesTable({ data, loading, onDataChange, showActions = true }) {
  const [editing, setEditing] = useState(null);

  const columns = aplicacionesColumns.map(col => {
    if (col.accessor === 'dosisRange') return { ...col, render: (row) => `${row.dosisminapl} - ${row.dosismaxapl}` };
    return col;
  });

  const rowActions = showActions ? (row) => (
    <div className="table-row-actions" style={{ display: 'flex', gap: '0.5rem' }}>
      <ButtonPrimary icon={BiEdit} onClick={() => setEditing(row)}>Editar</ButtonPrimary>
    </div>
  ) : null;

  const handleClose = () => setEditing(null);

  const handleSubmit = async (updated) => {
    try {
      await aplicacionesService.update(updated.idapl || updated.id, updated);
      setEditing(null);
      if (onDataChange) onDataChange();
    } catch (err) {
      console.error('Error actualizando aplicación', err);
      alert('Error al actualizar la aplicación');
    }
  };

  return (
    <>
      <TableCard title="Aplicaciones registradas" columns={columns} data={data} loading={loading} rowActions={rowActions} />

      {editing && (
        <Modal onClose={handleClose}>
          <AplicacionForm initialValues={editing} onSubmit={handleSubmit} onCancel={handleClose} />
        </Modal>
      )}
    </>
  );
}
