import { useState } from 'react';
import TableCard from '../../../components/TableCard';
import { usuariosColumns } from '../usuarios.config';
import { ButtonPrimary } from '../../../components/Buttons';
import { BiEdit } from 'react-icons/bi';
import UsuarioForm from './UsuarioForm';
import Modal from '../../../components/Modal';
import { getBadgeClass } from '../../../utils/badgeStates';

export default function UsuariosTable({ 
  data, 
  loading, 
  onUpdate, 
  onDataChange, 
  configForm,
  onEditStart,  // ✅ Nueva prop
  onEditEnd     // ✅ Nueva prop
}) {
  const [editing, setEditing] = useState(null);

  const renderEstado = (row) => (
    <span className={`badge ${getBadgeClass(row.estadoNombre)}`}>
      {row.estadoNombre}
    </span>
  );

  const renderRol = (row) => (
    <span className="text-muted fw-medium">{row.rolNombre || '—'}</span>
  );

  const columns = usuariosColumns.map(col => {
    if (col.accessor === 'estadoNombre') return { ...col, render: renderEstado };
    if (col.accessor === 'rolNombre') return { ...col, render: renderRol };
    return col;
  });

  const rowActions = (row) => (
    <div className="table-row-actions">
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

  const handleFormClose = () => {
    setEditing(null);
    onEditEnd?.(); // ✅ Notificar que terminó la edición
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editing) {
        await onUpdate(editing.idusu, formData);
      }
      setEditing(null);
      onEditEnd?.(); // ✅ Notificar que terminó la edición
      if (onDataChange) await onDataChange();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  return (
    <>
      <TableCard
        title="Usuarios registrados"
        columns={columns}
        data={data}
        loading={loading}
        rowActions={rowActions}
      />

      {editing && (
        <Modal onClose={handleFormClose}>
          <UsuarioForm
            initialValues={editing}
            config={configForm}
            onCancel={handleFormClose}
            onSubmit={handleFormSubmit}
          />
        </Modal>
      )}
    </>
  );
}