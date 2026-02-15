import { useState } from 'react';
import TableCard from '../../../components/TableCard';
import { cultivosColumns } from '../cultivos.config';
import { getBadgeClass } from '../../../utils/badgeStates';
import { formatDate } from '../../../utils/date';
import { ButtonPrimary } from '../../../components/Buttons';
import { BiEdit } from 'react-icons/bi';
import CultivoForm from './CultivoForm';
import Modal from '../../../components/Modal';
import cultivosService from '../../../services/cultivos.service';

export default function CultivosTable({ data, loading, showActions = true, onDataChange }) {
  const [editingCultivo, setEditingCultivo] = useState(null);

  // =========================
  // Renderizadores
  // =========================

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

  // =========================
  // Acciones por fila
  // =========================

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

  // =========================
  // Actualizar cultivo (API)
  // =========================

  const handleFormSubmit = async (updatedCultivo) => {
    try {
      const id = editingCultivo.idcul;
      await cultivosService.update(id, updatedCultivo);

      setEditingCultivo(null);
      
      // ✅ Notificar al padre para recargar los datos
      if (onDataChange) {
        onDataChange();
      }
    } catch (error) {
      console.error('Error actualizando cultivo:', error);
      alert('Error al actualizar el cultivo');
    }
  };

  // =========================
  // Render
  // =========================

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