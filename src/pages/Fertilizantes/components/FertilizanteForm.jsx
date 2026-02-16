import React, { useState, useEffect } from 'react';
import { FormPanel } from '../../../components/FormPanel';
import { fertilizanteFormConfig } from '../fertilizantes.config';
import useCatalogos from '../../../hooks/useCatalogos';

export default function FertilizanteForm({ onSubmit, onCancel, initialValues }) {
  const { tiposFertilizantes, estados, loading } = useCatalogos();

  // =========================
  // Inicializar valores del formulario
  // =========================
  const [formValues, setFormValues] = useState({
    nombrefer: '',
    idtfer: '',
    descripcionfer: '',
    idest: '',
  });

  useEffect(() => {
    if (initialValues) {
      setFormValues({
        idfer: initialValues.idfer, // importante para edición
        nombrefer: initialValues.nombrefer || '',
        idtfer: initialValues.idtfer || '',
        descripcionfer: initialValues.descripcionfer || '',
        idest: initialValues.idest || '',
      });
    } else {
      setFormValues({
        nombrefer: '',
        idtfer: '',
        descripcionfer: '',
        idest: '',
      });
    }
  }, [initialValues]);

  // =========================
  // Config dinámica del formulario
  // =========================
  const dynamicConfig = fertilizanteFormConfig.map(field => {
    if (field.key === 'idtfer') return { ...field, options: tiposFertilizantes };
    if (field.key === 'idest') return { ...field, options: estados };
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
    e.preventDefault();

    // Validar campos requeridos
    if (!formValues.nombrefer || !formValues.idtfer || !formValues.idest) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const dataToSend = {
      nombrefer: formValues.nombrefer.trim(),
      idtfer: parseInt(formValues.idtfer),
      descripcionfer: formValues.descripcionfer || '',
      idest: parseInt(formValues.idest),
    };

    if (formValues.idfer) dataToSend.idfer = formValues.idfer;

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
      loading={loading} // opcional: si quieres deshabilitar mientras cargan catálogos
    />
  );
}
