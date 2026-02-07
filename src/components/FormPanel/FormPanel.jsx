
import FormItem from './FormItem';
import { ButtonPrimary } from '../Buttons';

export default function FormPanel({ formConfig = [], values, onChange, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="p-3 border rounded bg-light mb-3">
      {formConfig.map((field) => (
        <FormItem
          key={field.key}
          field={field}
          value={values[field.key]}
          onChange={onChange(field.key)}
        />
      ))}

      <div className="d-flex gap-2 mt-2">
        <ButtonPrimary type="submit">Guardar</ButtonPrimary>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
