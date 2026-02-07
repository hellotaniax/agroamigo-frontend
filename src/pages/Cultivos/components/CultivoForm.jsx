import React, { useState } from 'react';
import { FormPanel } from '../../../components/FormPanel';
import { cultivoFormConfig } from '../cultivos.config';

export default function CultivoForm({ initialValues, onSubmit, onCancel }) {
  const [formValues, setFormValues] = useState(initialValues || {});

  const handleChange = (key) => (value) =>
    setFormValues(prev => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
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

