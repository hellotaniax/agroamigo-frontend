import { useState } from 'react';
import { BiSearch, BiReset } from 'react-icons/bi';

export default function CultivosFilter({ onFilter, onStateFilter, onDateFilter }) {
  const [search, setSearch] = useState('');
  const [state, setState] = useState('');
  const [date, setDate] = useState('');

  const handleReset = () => {
    setSearch('');
    setState('');
    setDate('');
    onFilter('');
    onStateFilter('');
    onDateFilter('');
  };

  return (
    <div className="d-flex gap-3 mb-3 flex-wrap align-items-end">
      
      {/* Buscador */}
      <div className="input-group" style={{ minWidth: '200px' }}>
        <span className="input-group-text"><BiSearch /></span>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre de cultivo..."
          value={search}
          onChange={e => { setSearch(e.target.value); onFilter(e.target.value); }}
        />
      </div>

      {/* Filtro de estado */}
      <div className="d-flex flex-column">
        <label htmlFor="stateFilter" className="form-label">Estado</label>
        <select
          id="stateFilter"
          className="form-select"
          value={state}
          onChange={e => { setState(e.target.value); onStateFilter(e.target.value); }}
        >
          <option value="">Todos</option>
          <option value="Activo">Activo</option>
          <option value="Borrador">Borrador</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>

      {/* Filtro por fecha */}
      <div className="d-flex flex-column">
        <label htmlFor="dateFilter" className="form-label">Fecha</label>
        <input
          type="date"
          id="dateFilter"
          className="form-control"
          value={date}
          onChange={e => { setDate(e.target.value); onDateFilter(e.target.value); }}
        />
      </div>

      {/* Botón de reset */}
      <button
        type="button"
        className="btn btn-outline-secondary d-flex align-items-center"
        onClick={handleReset}
      >
        <BiReset className="me-1" /> Limpiar
      </button>
    </div>
  );
}
