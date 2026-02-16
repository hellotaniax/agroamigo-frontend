import React, { useState, useEffect, useMemo } from 'react'; 
import { FormPanel } from '../../../components/FormPanel';
import { fertilizanteFormConfig } from '../fertilizantes.config';
import useCatalogos from '../../../hooks/useCatalogos';

export default function FertilizanteForm({ onSubmit, onCancel, initialValues }) {
  // 1. Verificamos que los nombres coincidan con lo que devuelve useCatalogos
  const { tiposFertilizantes, estados, loading } = useCatalogos();

  const [formValues, setFormValues] = useState({
    nombrefer: '',
    idtfer: '',
    descripcionfer: '',
    idest: '',
  });

  useEffect(() => {
    if (initialValues) {
      setFormValues({
        idfer: initialValues.idfer,
        nombrefer: initialValues.nombrefer || '',
        idtfer: String(initialValues.idtfer),
        descripcionfer: initialValues.descripcionfer || '',
        idest: String(initialValues.idest),
      });
    } else {
      // ✅ RESET PARA CREACIÓN NUEVA
      setFormValues({ nombrefer: '', idtfer: '', descripcionfer: '', idest: '', });
    }
  }, [initialValues]);

  const dynamicConfig = useMemo(() => {
  return fertilizanteFormConfig.map(field => {
    if (field.key === 'idtfer') {
      return { 
        ...field, 
        options: tiposFertilizantes 
      };
    }
    if (field.key === 'idest') {
      return { 
        ...field, 
        options: estados 
      };
    }
    return field;
  });
}, [tiposFertilizantes, estados]);

  const handleChange = (key) => (value) =>
    setFormValues(prev => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();

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

  return (
    <FormPanel
      formConfig={dynamicConfig}
      values={formValues}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      loading={loading} 
    />
  );
}