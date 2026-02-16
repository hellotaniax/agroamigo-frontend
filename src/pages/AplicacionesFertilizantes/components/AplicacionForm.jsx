import React, { useState, useEffect } from 'react';
import { FormPanel } from '../../../components/FormPanel';
import { aplicacionFormConfig } from '../aplicaciones.config';
import useCatalogos from '../../../hooks/useCatalogos';
import fertilizantesService from '../../../services/fertilizantes.service';

export default function AplicacionForm({ onSubmit, onCancel, initialValues }) {
  const { formasAplicacion, etapas, loading } = useCatalogos();
  const [fertilizantes, setFertilizantes] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fertilizantesService.getAll();
        setFertilizantes(res.map(f => ({ value: String(f.idfer), label: f.nombrefer })));
      } catch (err) {
        console.error('Error cargando fertilizantes', err);
      }
    };
    load();
  }, []);

  const [formValues, setFormValues] = useState({
    idfer: '', idfap: '', ideta: '', dosisminapl: '', dosismaxapl: '', recomendacionapl: ''
  });

  useEffect(() => {
    if (initialValues) {
      setFormValues({
        idapl: initialValues.idapl || initialValues.id,
        idfer: initialValues.idfer || '',
        idfap: initialValues.idfap || '',
        ideta: initialValues.ideta || '',
        dosisminapl: initialValues.dosisminapl || '',
        dosismaxapl: initialValues.dosismaxapl || '',
        recomendacionapl: initialValues.recomendacionapl || '',
      });
    } else {
      setFormValues({ idfer: '', idfap: '', ideta: '', dosisminapl: '', dosismaxapl: '', recomendacionapl: '' });
    }
  }, [initialValues]);

  const dynamicConfig = aplicacionFormConfig.map(f => {
    if (f.key === 'idfer') return { ...f, options: fertilizantes };
    if (f.key === 'idfap') return { ...f, options: (formasAplicacion || []).map(o => ({ value: String(o.value), label: o.label })) };
    if (f.key === 'ideta') return { ...f, options: etapas };
    return f;
  });

  const handleChange = (key) => (value) => setFormValues(prev => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación básica
    if (!formValues.idfer || !formValues.idfap || !formValues.ideta) {
      alert('Complete los campos obligatorios');
      return;
    }

    const payload = {
      idfer: formValues.idfer, 
      idfor: Number(formValues.idfap),
      ideta: Number(formValues.ideta),
      dosisminapl: String(formValues.dosisminapl || ''),
      dosismaxapl: String(formValues.dosismaxapl || ''),
      recomendacionapl: formValues.recomendacionapl || '',
    };

    // Debug: show payload before sending
    console.debug('AplicacionForm - payload (to send)', payload);

    if (formValues.idapl) payload.idapl = formValues.idapl;

    onSubmit(payload);
  };

  return (
    <FormPanel formConfig={dynamicConfig} values={formValues} onChange={handleChange} onSubmit={handleSubmit} onCancel={onCancel} loading={loading} />
  );
}
