import React, { useState } from 'react';
import { FormPanel } from '../../../components/FormPanel';
import { fertilizanteFormConfig } from '../fertilizantes.config';

export default function FertilizanteForm({ onSubmit, onCancel }) {
  const initialValues = Object.fromEntries(fertilizanteFormConfig.map(f => [f.key, '']));
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (key) => (value) => setFormValues(prev => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
    setFormValues(initialValues);
  };

  return (
    <FormPanel
      formConfig={fertilizanteFormConfig}
      values={formValues}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
}
