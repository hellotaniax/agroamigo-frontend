import React, { useState, useEffect } from 'react';
import { FormPanel } from '../../../components/FormPanel';
import { recomendacionFormConfig } from '../recomendaciones.config';

const ESTADOS_MAP_INVERSE = {
  'Activo': '1',
  'Borrador': '2',
  'Archivado': '3',
};

const PRIORIDADES_MAP_INVERSE = {
  'Alta': '1',
  'Media': '2',
  'Baja': '3',
};

const INITIAL_EMPTY_STATE = Object.fromEntries(
  recomendacionFormConfig.map(f => [f.key, ''])
);

export default function RecomendacionForm({ onSubmit, onCancel, initialValues }) {
  const [formValues, setFormValues] = useState(INITIAL_EMPTY_STATE);

  useEffect(() => {
    if (initialValues) {
      const processed = {
        ...initialValues,
        idest: initialValues.idest || ESTADOS_MAP_INVERSE[initialValues.estadoNombre] || '',
        idpri: initialValues.idpri || PRIORIDADES_MAP_INVERSE[initialValues.prioridadNombre] || '',
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
      formConfig={recomendacionFormConfig}
      values={formValues}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
}
