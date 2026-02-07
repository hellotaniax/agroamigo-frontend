import React, { useState, useEffect } from 'react';
import { FormPanel } from '../../../components/FormPanel';
import { fertilizanteFormConfig } from '../fertilizantes.config';

export default function FertilizanteForm({ onSubmit, onCancel, initialValues }) {
  const emptyValues = Object.fromEntries(fertilizanteFormConfig.map(f => [f.key, '']));
  const [formValues, setFormValues] = useState(emptyValues);

  // Mapeos inversos para convertir nombres a IDs
  const tiposMapInverse = {
    'Nitrogenado': '1',
    'Fosfatado': '2',
    'Potásico': '3',
    'Complejo NPK': '4',
    'Micronutrientes': '5',
    'Otro': '99',
  };

  const estadosMapInverse = {
    'Activo': '1',
    'Archivado': '2',
    'Borrador': '3',
  };

  // Actualizar valores cuando initialValues cambia
  useEffect(() => {
    if (initialValues) {
      const processedValues = {
        ...initialValues,
        // Convertir tipoNombre a idtfer si necesario
        idtfer: initialValues.idtfer || tiposMapInverse[initialValues.tipoNombre] || '',
        // Convertir estadoNombre a idest si necesario
        idest: initialValues.idest || estadosMapInverse[initialValues.estadoNombre] || '',
      };
      setFormValues(processedValues);
    } else {
      setFormValues(emptyValues);
    }
  }, [initialValues]);

  const handleChange = (key) => (value) => setFormValues(prev => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
    setFormValues(emptyValues);
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
