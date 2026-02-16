import React from 'react';

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
            value={value || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
          />
        </div>
      );

  
    case 'password':
      return (
        <div className="mb-2">
          {field.label && <label className="form-label">{field.label}</label>}
          <input
            type="password"
            className="form-control"
            value={value || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            autoComplete="new-password"
          />
        </div>
      );

  
    case 'email':
      return (
        <div className="mb-2">
          {field.label && <label className="form-label">{field.label}</label>}
          <input
            type="email"
            className="form-control"
            value={value || ''}
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
            value={value || ''}
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
          <select 
            className="form-select" 
            value={value || ''}
            onChange={handleChange} 
            required={field.required}
          >
            <option value="" disabled>Seleccione una opción</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );

    case 'textarea':
      return (
        <div className="mb-2">
          {field.label && <label className="form-label">{field.label}</label>}
          <textarea
            className="form-control"
            value={value || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            rows={field.rows || 4}
            required={field.required}
          />
        </div>
      );

    default:
      return null;
  }
}