import React, { useState, useEffect } from 'react';
import { FormPanel } from '../../../components/FormPanel';

export default function MensajeForm({ onSubmit, onCancel, initialValues, config }) {
  // =========================
  // Estado inicial del formulario
  // =========================
  const [formValues, setFormValues] = useState({
    codigomen: '',
    contenidomen: '',
    idest: '',
  });

  useEffect(() => {
    if (initialValues) {
      setFormValues({
        idmen: initialValues.idmen, // importante para edición
        codigomen: initialValues.codigomen || '',
        contenidomen: initialValues.contenidomen || '',
        idest: initialValues.idest || '',
      });
    } else {
      const emptyState = Object.fromEntries(config.map(f => [f.key, '']));
      setFormValues(emptyState);
    }
  }, [initialValues, config]);

  // =========================
  // Manejo de cambios
  // =========================
  const handleChange = (key) => (value) =>
    setFormValues(prev => ({ ...prev, [key]: value }));

  // =========================
  // Submit con validación
  // =========================
  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    // Validar campos requeridos
    if (!formValues.codigomen || !formValues.contenidomen || !formValues.idest) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const dataToSend = {
      codigomen: formValues.codigomen.trim(),
      contenidomen: formValues.contenidomen.trim(),
      idest: parseInt(formValues.idest),
    };

    // Incluir ID si es edición
    if (formValues.idmen) dataToSend.idmen = formValues.idmen;

    onSubmit(dataToSend);
  };

  // =========================
  // Render
  // =========================
  return (
    <FormPanel
      formConfig={config}
      values={formValues}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
}