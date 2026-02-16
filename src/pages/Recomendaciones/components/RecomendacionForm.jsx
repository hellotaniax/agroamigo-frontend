// src/pages/Recomendaciones/components/RecomendacionForm.jsx
import React, { useState, useEffect } from 'react';
import { FormPanel } from '../../../components/FormPanel';
import useCatalogos from '../../../hooks/useCatalogos';

export default function RecomendacionForm({ onSubmit, onCancel, initialValues, config }) {
  const { estados, prioridades, loading } = useCatalogos(); // Cargar catálogos dinámicos

  // =========================
  // Estado inicial del formulario
  // =========================
  const [formValues, setFormValues] = useState({
    titulorec: '',
    descripcionrec: '',
    idest: '',
    idpri: '',
  });

  useEffect(() => {
    if (initialValues) {
      setFormValues({
        idrec: initialValues.idrec, // importante para edición
        titulorec: initialValues.titulorec || '',
        descripcionrec: initialValues.descripcionrec || '',
        idest: initialValues.idest || '',
        idpri: initialValues.idpri || '',
      });
    } else {
      const emptyState = Object.fromEntries(config.map(f => [f.key, '']));
      setFormValues(emptyState);
    }
  }, [initialValues, config]);

  // =========================
  // Config dinámica del formulario
  // =========================
  const dynamicConfig = config.map(field => {
    if (field.key === 'idest') return { ...field, options: estados };
    if (field.key === 'idpri') return { ...field, options: prioridades };
    return field;
  });

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
    if (!formValues.titulorec || !formValues.idest || !formValues.idpri) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const dataToSend = {
      titulorec: formValues.titulorec.trim(),
      descripcionrec: formValues.descripcionrec.trim(),
      idest: parseInt(formValues.idest),
      idpri: parseInt(formValues.idpri),
    };

    // Incluir ID si es edición
    if (formValues.idrec) dataToSend.idrec = formValues.idrec;

    onSubmit(dataToSend);
  };

  // =========================
  // Render
  // =========================
  return (
    <FormPanel
      formConfig={dynamicConfig}
      values={formValues}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      loading={loading} // opcional: deshabilita inputs mientras cargan catálogos
    />
  );
}
