import React, { useState, useEffect } from 'react';
import { FormPanel } from '../../../components/FormPanel';
import { cultivoFormConfig } from '../cultivos.config';

// Constantes extraídas para evitar re-renderizados innecesarios y errores de dependencia
const TIPOS_MAP_INVERSE = {
  'Hortaliza': '1',
  'Fruta': '2',
  'Grano': '3',
  'Otro': '99',
};

const ESTADOS_MAP_INVERSE = {
  'Activo': '1',
  'Archivado': '2',
  'Borrador': '3',
};

export default function CultivoForm({ initialValues, onSubmit, onCancel }) {
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    if (initialValues) {
      const processedValues = {
        ...initialValues,
        // Si no tiene ID, lo buscamos por el nombre usando el mapa estático
        idtcul: initialValues.idtcul || TIPOS_MAP_INVERSE[initialValues.tipoNombre] || '',
        idest: initialValues.idest || ESTADOS_MAP_INVERSE[initialValues.estadoNombre] || '',
      };
      setFormValues(processedValues);
    }
  }, [initialValues]); // Ahora el array de dependencias está limpio y correcto

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