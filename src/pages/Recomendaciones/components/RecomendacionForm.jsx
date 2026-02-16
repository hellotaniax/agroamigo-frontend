// src/pages/Recomendaciones/components/RecomendacionForm.jsx
import React, { useState, useEffect } from 'react';
import { FormPanel } from '../../../components/FormPanel';

export default function RecomendacionForm({ onSubmit, onCancel, initialValues, config }) {
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    if (initialValues) {
      // ✅ IMPORTANTE: Solo cargamos los campos que la API acepta para el body
      setFormValues({
        titulorec: initialValues.titulorec || '',
        descripcionrec: initialValues.descripcionrec || '',
        idest: initialValues.idest || '', 
        idpri: initialValues.idpri || ''
      });
    } else {
      const emptyState = Object.fromEntries(config.map(f => [f.key, '']));
      setFormValues(emptyState);
    }
  }, [initialValues, config]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    // ✅ Convertimos a números para cumplir con el esquema de la DB
    const dataToSend = {
      titulorec: formValues.titulorec,
      descripcionrec: formValues.descripcionrec,
      idest: parseInt(formValues.idest),
      idpri: parseInt(formValues.idpri)
    };
    
    onSubmit(dataToSend);
  };

  return (
    <FormPanel
      formConfig={config}
      values={formValues}
      onChange={(key) => (value) => setFormValues(prev => ({ ...prev, [key]: value }))}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
}