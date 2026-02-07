
export default function FormItem({ field, value, onChange }) {
  const handleChange = (e) => onChange(e.target.value);

  switch (field.type) {
    case 'text':
      return (
        <div className="mb-2">
          {field.label && <label className="form-label">{field.label}</label>}
          <input
            type="text"
            className="form-control"
            value={value}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
          />
        </div>
      );
    case 'number':
      return (
        <div className="mb-2">
          {field.label && <label className="form-label">{field.label}</label>}
          <input
            type="number"
            className="form-control"
            value={value}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
          />
        </div>
      );
    case 'select':
      return (
        <div className="mb-2">
          {field.label && <label className="form-label">{field.label}</label>}
          <select className="form-select" value={value} onChange={handleChange} required={field.required}>
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );
    default:
      return null;
  }
}
