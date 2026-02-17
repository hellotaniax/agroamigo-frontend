import { useState } from 'react';
import TableCard from '../../../components/TableCard';
import { aplicacionesColumns } from '../aplicaciones.config';
import { getBadgeClass } from '../../../utils/badgeStates'; // ✅ Importación necesaria
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
  onEditStart,  
  onEditEnd     
}) {
  const [editing, setEditing] = useState(null);

  // ✅ Función de renderizado idéntica a FertilizantesTable para mantener el tamaño
  const renderEstado = (row) => (
    <span className={`badge ${getBadgeClass(row.estadoNombre)}`}>
      {row.estadoNombre}
    </span>
  );

  const columns = aplicacionesColumns.map(col => {
    if (col.accessor === 'dosisRange') {
      return { ...col, render: (row) => `${row.dosisminapl} - ${row.dosismaxapl}` };
    }

    if (col.accessor === 'estadoNombre') {
      return {
        ...col,
        render: renderEstado
      };
    }
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
                onEditStart?.(); 
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
    onEditEnd?.(); 
  };

  const handleSubmit = async (updated) => {
    try {
      const id = updated.idapl || updated.id;
      if (onUpdate) {
        await onUpdate(id, updated);
        setEditing(null);
        onEditEnd?.(); 
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