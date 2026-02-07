import { useState, useEffect } from 'react';
import TableCard from '../../../components/TableCard';
import { cultivosColumns } from '../cultivos.config';
import { getBadgeClass } from '../../../utils/badgeStates';
import { formatDate } from '../../../utils/date';
import { ButtonPrimary } from '../../../components/Buttons';
import { BiEdit } from 'react-icons/bi';
import CultivoForm from './CultivoForm';
import Modal from '../../../components/Modal';

export default function CultivosTable({ data, loading, showActions = true }) {
  const [editingCultivo, setEditingCultivo] = useState(null);
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const renderEstado = (row) => (
    <span className={`badge ${getBadgeClass(row.estadoNombre)}`}>
      {row.estadoNombre}
    </span>
  );

  const renderFecha = (row) => formatDate(row.creacioncul);

  const columns = cultivosColumns.map(col => {
    if (col.accessor === 'estadoNombre') return { ...col, render: renderEstado };
    if (col.accessor === 'creacioncul') return { ...col, render: renderFecha };
    return col;
  });

  const rowActions = showActions
    ? (row) => (
        <div className="table-row-actions" style={{ display: 'flex', gap: '0.5rem' }}>
          <ButtonPrimary icon={BiEdit} onClick={() => setEditingCultivo(row)}>
            Editar
          </ButtonPrimary>
        </div>
      )
    : null;

  const handleFormClose = () => setEditingCultivo(null);

  const handleFormSubmit = (updatedCultivo) => {
    console.log('Cultivo actualizado:', updatedCultivo);

    // Actualiza tabla localmente
    setTableData(prev =>
      prev.map(c => (c.idcul === updatedCultivo.idcul ? updatedCultivo : c))
    );

    setEditingCultivo(null);
  };

  return (
    <>
      <TableCard
        title="Cultivos registrados"
        columns={columns}
        data={tableData}
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
