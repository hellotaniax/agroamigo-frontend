
export default function CultivosFilter({ onFilter }) {
  return (
    <div className="mb-3 d-flex gap-2">
      <input
        type="text"
        placeholder="Buscar por nombre"
        className="form-control"
        onChange={e => onFilter(e.target.value)}
      />
      {/* Podrías agregar más filtros: estado, fecha, etc. */}
    </div>
  );
}
