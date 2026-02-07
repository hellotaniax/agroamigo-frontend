import { useState, useEffect } from 'react';
import TableCard from '../../../components/TableCard';
import { fertilizantesColumns, estadoBadgeClass } from '../fertilizantes.config';
import { ButtonPrimary} from '../../../components/Buttons';
import { BiEdit } from 'react-icons/bi';
import FertilizanteForm from './FertilizanteForm';
import Modal from '../../../components/Modal';

export default function FertilizantesTable({ data, loading, showActions = true }) {
  const [editingFertilizante, setEditingFertilizante] = useState(null);
  const [tableData, setTableData] = useState(data);

  useEffect(() => setTableData(data), [data]);

  const renderEstado = (row) => (
    <span className={`badge ${estadoBadgeClass[row.estadoNombre] || ''}`}>
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
          <ButtonPrimary icon={BiEdit} onClick={() => setEditingFertilizante(row)}>
            Editar
          </ButtonPrimary>
        </div>
      )
    : null;

  const handleFormClose = () => setEditingFertilizante(null);

  const handleFormSubmit = (updatedFertilizante) => {
    setTableData(prev =>
      prev.map(f => (f.idfer === updatedFertilizante.idfer ? updatedFertilizante : f))
    );
    setEditingFertilizante(null);
  };

  return (
    <>
      <TableCard
        title="Fertilizantes registrados"
        columns={columns}
        data={tableData}
        loading={loading}
        rowActions={rowActions}
      />

      {editingFertilizante && (
        <Modal onClose={handleFormClose}>
          <FertilizanteForm
            initialValues={editingFertilizante}
            onCancel={handleFormClose}
            onSubmit={handleFormSubmit}
          />
        </Modal>
      )}
    </>
  );
}
