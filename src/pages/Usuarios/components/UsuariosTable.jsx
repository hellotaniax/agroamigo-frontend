import { useState, useEffect } from 'react';
import TableCard from '../../../components/TableCard';
import { usuariosColumns, estadoBadgeClass } from '../usuarios.config';
import { ButtonPrimary } from '../../../components/Buttons';
import { BiEdit } from 'react-icons/bi';
import UsuarioForm from './UsuarioForm';
import Modal from '../../../components/Modal';

export default function UsuariosTable({ data, loading, showActions = true }) {
  const [editing, setEditing] = useState(null);
  const [tableData, setTableData] = useState(data);

  useEffect(() => setTableData(data), [data]);

  const renderEstado = (row) => (
    <span className={`badge ${estadoBadgeClass[row.estadoNombre] || ''}`}>
      {row.estadoNombre}
    </span>
  );

  const columns = usuariosColumns.map(col => {
    if (col.accessor === 'estadoNombre') return { ...col, render: renderEstado };
    return col;
  });

  const rowActions = showActions
    ? (row) => (
        <div className="table-row-actions" style={{ display: 'flex', gap: '0.5rem' }}>
          <ButtonPrimary icon={BiEdit} onClick={() => setEditing(row)}>
            Editar
          </ButtonPrimary>
        </div>
      )
    : null;

  const handleClose = () => setEditing(null);

  const estadosMap = {
    '1': 'Activo',
    '2': 'Borrador',
    '3': 'Archivado',
  };

  const handleFormSubmit = (updated) => {
    const withNombre = {
      ...updated,
      estadoNombre: estadosMap[String(updated.idest)] || updated.estadoNombre,
    };

    setTableData(prev => prev.map(u => (u.idusu === withNombre.idusu ? withNombre : u)));
    setEditing(null);
  };

  return (
    <>
      <TableCard
        title="Usuarios registrados"
        columns={columns}
        data={tableData}
        loading={loading}
        rowActions={rowActions}
      />

      {editing && (
        <Modal onClose={handleClose}>
          <UsuarioForm
            initialValues={editing}
            onCancel={handleClose}
            onSubmit={handleFormSubmit}
          />
        </Modal>
      )}
    </>
  );
}
