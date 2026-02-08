import React, { useState, useEffect } from 'react';
import { FormPanel } from '../../../components/FormPanel';
import { usuarioFormConfig } from '../usuarios.config';

const ESTADOS_MAP_INVERSE = {
  'Activo': '1',
  'Borrador': '2',
  'Archivado': '3',
};

const INITIAL_EMPTY_STATE = Object.fromEntries(
  usuarioFormConfig.map(f => [f.key, ''])
);

export default function UsuarioForm({ onSubmit, onCancel, initialValues }) {
  const [formValues, setFormValues] = useState(INITIAL_EMPTY_STATE);

  useEffect(() => {
    if (initialValues) {
      const processed = {
        ...initialValues,
        idest: initialValues.idest || ESTADOS_MAP_INVERSE[initialValues.estadoNombre] || '',
      };
      setFormValues(processed);
    } else {
      setFormValues(INITIAL_EMPTY_STATE);
    }
  }, [initialValues]);

  const handleChange = (key) => (value) =>
    setFormValues(prev => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
    if (!initialValues) setFormValues(INITIAL_EMPTY_STATE);
  };

  return (
    <FormPanel
      formConfig={usuarioFormConfig}
      values={formValues}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
}
