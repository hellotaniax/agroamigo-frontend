import React, { useState, useEffect, useMemo } from 'react';
import { FormPanel } from '../../../components/FormPanel';

export default function UsuarioForm({ onSubmit, onCancel, initialValues, config }) {
  const [formValues, setFormValues] = useState({});

  // Filtrar configuración (ocultar password en edición)
  const activeConfig = useMemo(() => {
    if (initialValues) {
      return config.filter(field => field.key !== 'passwordusu');
    }
    return config;
  }, [config, initialValues]);

  useEffect(() => {
    if (initialValues) {
      setFormValues({ ...initialValues, passwordusu: '' });
    } else {
      const emptyState = {};
      config.forEach(f => { emptyState[f.key] = ''; });
      setFormValues(emptyState);
    }
  }, [initialValues, config]);

  //  Validar formato de Email
  const isValidEmail = (email) => {
    // Expresión regular simple para validar correos
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    // Validar Email antes de hacer nada
    if (formValues.emailusu && !isValidEmail(formValues.emailusu)) {
      alert('Por favor, ingrese un correo electrónico válido (ejemplo: usuario@agroamigo.com).');
      return; // ⛔ DETIENE EL ENVÍO AQUÍ
    }

    const dataToSend = { 
      ...formValues, 
      idrol: parseInt(formValues.idrol), 
      idest: parseInt(formValues.idest) 
    };

    if (initialValues) {
      delete dataToSend.passwordusu;
    } else {
      if (!dataToSend.passwordusu?.trim()) {
        alert('La contraseña es obligatoria.');
        return;
      }
    }

    onSubmit(dataToSend);
  };

  return (
    <FormPanel 
      formConfig={activeConfig} 
      values={formValues} 
      onChange={(k)=>(v)=>setFormValues(p=>({...p,[k]:v}))} 
      onSubmit={handleSubmit} 
      onCancel={onCancel} 
    />
  );
}