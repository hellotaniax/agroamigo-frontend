import React, { useState, useEffect } from 'react';
import { FormPanel } from '../../../components/FormPanel';
import { cultivoFormConfig } from '../cultivos.config';
import useCatalogos from '../../../hooks/useCatalogos';

export default function CultivoForm({ initialValues, onSubmit, onCancel }) {
  const { tiposCultivo, estados } = useCatalogos();
  
  // ✅ Inicializar TODOS los campos con valores por defecto
  const [formValues, setFormValues] = useState({
    nombrecul: '',
    idtcul: '',
    idest: '',
  });

  // =========================
  // Cargar valores iniciales (para edición)
  // =========================
  useEffect(() => {
    if (initialValues) {
      setFormValues({
        idcul: initialValues.idcul, // ✅ IMPORTANTE: guardar el ID
        nombrecul: initialValues.nombrecul || '',
        idtcul: initialValues.idtcul || '',
        idest: initialValues.idest || '',
      });
    }
  }, [initialValues]);

  // =========================
  // Config dinámica del formulario
  // =========================
  const dynamicConfig = cultivoFormConfig.map(field => {
    if (field.key === 'idtcul') {
      return { ...field, options: tiposCultivo };
    }
    if (field.key === 'idest') {
      return { ...field, options: estados };
    }
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
    
    // ✅ Validar que los campos requeridos estén llenos
    if (!formValues.nombrecul || !formValues.idtcul || !formValues.idest) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    // ✅ Preparar datos - INCLUIR idcul si existe (modo edición)
    const dataToSend = {
      nombrecul: formValues.nombrecul.trim(),
      idtcul: parseInt(formValues.idtcul),
      idest: parseInt(formValues.idest),
    };

    // ✅ Si es edición, incluir el ID
    if (formValues.idcul) {
      dataToSend.idcul = formValues.idcul;
    }

    console.log('Datos a enviar:', dataToSend); // ✅ Para debug
    onSubmit(dataToSend);
  };

  return (
    <FormPanel
      formConfig={dynamicConfig}
      values={formValues}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
}