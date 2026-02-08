import { useState, useEffect } from 'react';
import TableCard from '../../../components/TableCard';
import { recomendacionesColumns, estadoBadgeClass } from '../recomendaciones.config';
import { ButtonPrimary } from '../../../components/Buttons';
import { BiEdit } from 'react-icons/bi';
import RecomendacionForm from './RecomendacionForm';
import Modal from '../../../components/Modal';

export default function RecomendacionesTable({ data, loading, showActions = true }) {
  const [editing, setEditing] = useState(null);
  const [tableData, setTableData] = useState(data);

  useEffect(() => setTableData(data), [data]);

  const renderEstado = (row) => (
    <span className={`badge ${estadoBadgeClass[row.estadoNombre] || ''}`}>
      {row.estadoNombre}
    </span>
  );

  const renderPrioridad = (row) => (
    <span className="text-muted">{row.prioridadNombre || ''}</span>
  );

  const columns = recomendacionesColumns.map(col => {
    if (col.accessor === 'estadoNombre') return { ...col, render: renderEstado };
    if (col.accessor === 'prioridadNombre') return { ...col, render: renderPrioridad };
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

  const prioridadesMap = {
    '1': 'Alta',
    '2': 'Media',
    '3': 'Baja',
  };

  const handleFormSubmit = (updated) => {
    const withNombre = {
      ...updated,
      estadoNombre: estadosMap[String(updated.idest)] || updated.estadoNombre,
      prioridadNombre: prioridadesMap[String(updated.idpri)] || updated.prioridadNombre,
    };

    setTableData(prev => prev.map(r => (r.idrec === withNombre.idrec ? withNombre : r)));
    setEditing(null);
  };

  return (
    <>
      <TableCard
        title="Recomendaciones registradas"
        columns={columns}
        data={tableData}
        loading={loading}
        rowActions={rowActions}
      />

      {editing && (
        <Modal onClose={handleClose}>
          <RecomendacionForm
            initialValues={editing}
            onCancel={handleClose}
            onSubmit={handleFormSubmit}
          />
        </Modal>
      )}
    </>
  );
}
