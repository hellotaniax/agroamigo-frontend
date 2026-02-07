import React, { useState } from 'react';
import { FormPanel } from '../../../components/FormPanel';
import { cultivoFormConfig } from '../cultivos.config';

export default function CultivoForm({ onSubmit, onCancel }) {
  const initialValues = Object.fromEntries(cultivoFormConfig.map(f => [f.key, '']));
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (key) => (value) => setFormValues(prev => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
    setFormValues(initialValues); // limpiar formulario
  };

  return (
    <FormPanel
      formConfig={cultivoFormConfig}
      values={formValues}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
}
