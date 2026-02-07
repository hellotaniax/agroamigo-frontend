import React, { useState, useEffect } from 'react';
import { FormPanel } from '../../../components/FormPanel';
import { cultivoFormConfig } from '../cultivos.config';

export default function CultivoForm({ initialValues, onSubmit, onCancel }) {
  const [formValues, setFormValues] = useState({});

  // Mapeos inversos para convertir nombres a IDs
  const tiposMapInverse = {
    'Hortaliza': '1',
    'Fruta': '2',
    'Grano': '3',
    'Otro': '99',
  };

  const estadosMapInverse = {
    'Activo': '1',
    'Inactivo': '2',
    'Borrador': '3',
  };

  // Procesar initialValues cuando se reciben
  useEffect(() => {
    if (initialValues) {
      const processedValues = {
        ...initialValues,
        idtcul: initialValues.idtcul || tiposMapInverse[initialValues.tipoNombre] || '',
        idest: initialValues.idest || estadosMapInverse[initialValues.estadoNombre] || '',
      };
      setFormValues(processedValues);
    }
  }, [initialValues]);

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

