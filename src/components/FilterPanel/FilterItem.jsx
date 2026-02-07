export default function FilterItem({ filter, value, onChange }) {
  const handleChange = e => onChange(e.target.value);

  switch (filter.type) {
    case 'text':
      return (
        <div className="d-flex flex-column">
          {filter.label && <label htmlFor={filter.key} className="form-label">{filter.label}</label>}
          <div className="input-group" style={{ minWidth: '400px' }}>
            {filter.icon && <span className="input-group-text">{filter.icon}</span>}
            <input
              id={filter.key}
              type="text"
              className="form-control"
              placeholder={filter.placeholder}
              value={value}
              onChange={handleChange}
            />
          </div>
        </div>
      );
    case 'select':
      return (
        <div className="d-flex flex-column">
          {filter.label && <label htmlFor={filter.key} className="form-label">{filter.label}</label>}
          <select
            id={filter.key}
            className="form-select"
            value={value}
            onChange={handleChange}
          >
            {filter.options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      );
    case 'date':
      return (
        <div className="d-flex flex-column">
          {filter.label && <label htmlFor={filter.key} className="form-label">{filter.label}</label>}
          <input
            id={filter.key}
            type="date"
            className="form-control"
            value={value}
            onChange={handleChange}
          />
        </div>
      );
    default:
      return null;
  }
}
