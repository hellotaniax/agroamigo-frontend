import { useState } from 'react';
import TableCard from '../../../components/TableCard';
import { usuariosColumns } from '../usuarios.config';
import { ButtonPrimary } from '../../../components/Buttons';
import { BiEdit } from 'react-icons/bi';
import UsuarioForm from './UsuarioForm';
import Modal from '../../../components/Modal';
import { getBadgeClass } from '../../../utils/badgeStates';

export default function UsuariosTable({ data, loading, onUpdate, onDataChange, configForm }) {
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
      <ButtonPrimary icon={BiEdit} onClick={() => setEditing(row)}>
        Editar
      </ButtonPrimary>
    </div>
  );

  const handleFormSubmit = async (formData) => {
    try {
      if (editing) {
        await onUpdate(editing.idusu, formData);
      }
      setEditing(null);
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
        <Modal onClose={() => setEditing(null)}>
          <UsuarioForm
            initialValues={editing}
            config={configForm}
            onCancel={() => setEditing(null)}
            onSubmit={handleFormSubmit}
          />
        </Modal>
      )}
    </>
  );
}