import React, { useState, useEffect } from 'react';
import { FormPanel } from '../../../components/FormPanel';

export default function UsuarioForm({ onSubmit, onCancel, initialValues, config }) {
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
  if (initialValues) {
    // Modo Edición
    setFormValues({
      ...initialValues,
      contraseniausu: '' // Vacío por seguridad
    });
  } else {
    // Modo Creación: Asegura que todos los campos de la config existan en el estado
    const emptyState = {};
    config.forEach(f => { emptyState[f.key] = ''; });
    setFormValues(emptyState);
  }
}, [initialValues, config]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const dataToSend = { ...formValues, idrol: parseInt(formValues.idrol), idest: parseInt(formValues.idest) };

    if (initialValues) {
      if (!dataToSend.contraseniausu?.trim()) delete dataToSend.contraseniausu;
    } else if (!dataToSend.contraseniausu?.trim()) {
      alert('La contraseña es obligatoria.');
      return;
    }
    onSubmit(dataToSend);
  };

  return <FormPanel formConfig={config} values={formValues} onChange={(k)=>(v)=>setFormValues(p=>({...p,[k]:v}))} onSubmit={handleSubmit} onCancel={onCancel} />;
}