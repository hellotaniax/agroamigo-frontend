import React, { useState, useEffect, useMemo } from 'react';
import { FormPanel } from '../../../components/FormPanel';
import { aplicacionFormConfig } from '../aplicaciones.config';
import useCatalogos from '../../../hooks/useCatalogos';
import fertilizantesService from '../../../services/fertilizantes.service';

export default function AplicacionForm({ onSubmit, onCancel, initialValues }) {
  // 1. Obtenemos los catálogos (formas, etapas y estados) del hook global
  const { formasAplicacion, etapas, estados, loading: loadingCatalogos } = useCatalogos();
  const [fertilizantes, setFertilizantes] = useState([]);
  const [loadingFertilizantes, setLoadingFertilizantes] = useState(true);

  // 2. Cargar la lista de fertilizantes desde el servicio
  useEffect(() => {
    const loadFertilizantes = async () => {
      try {
        setLoadingFertilizantes(true);
        const res = await fertilizantesService.getAll();
        // Mapeamos para que el FormPanel entienda value/label
        setFertilizantes(res.map(f => ({ 
          value: String(f.idfer), 
          label: f.nombrefer 
        })));
      } catch (err) {
        console.error('Error cargando fertilizantes:', err);
      } finally {
        setLoadingFertilizantes(false);
      }
    };
    loadFertilizantes();
  }, []);

  // 3. Estado local del formulario
  const [formValues, setFormValues] = useState({
    idfer: '',
    idfap: '',
    ideta: '',
    idest: '', // Campo de estado
    dosisminapl: '',
    dosismaxapl: '',
    recomendacionapl: ''
  });

  // 4. Efecto para cargar valores iniciales si estamos editando
  useEffect(() => {
    if (initialValues) {
      setFormValues({
        idapl: initialValues.idapl || initialValues.id,
        idfer: String(initialValues.idfer) || '',
        idfap: String(initialValues.idfor || initialValues.idfap) || '', 
        ideta: String(initialValues.ideta) || '',
        idest: String(initialValues.idest) || '', 
        dosisminapl: initialValues.dosisminapl || '',
        dosismaxapl: initialValues.dosismaxapl || '',
        recomendacionapl: initialValues.recomendacionapl || '',
      });
    } else {
      // ✅ RESET PARA CREACIÓN NUEVA
      setFormValues({
        idfer: '',
        idfap: '',
        ideta: '',
        idest: '',
        dosisminapl: '',
        dosismaxapl: '',
        recomendacionapl: ''
      });
    }
  }, [initialValues]);

  // 5. Configuración dinámica para inyectar las opciones de los Selects
  const dynamicConfig = useMemo(() => {
    return aplicacionFormConfig.map(f => {
      if (f.key === 'idfer') return { ...f, options: fertilizantes };
      if (f.key === 'idfap') return { 
        ...f, 
        options: formasAplicacion
      };
      if (f.key === 'ideta') return { 
        ...f, 
        options: etapas
      };
      if (f.key === 'idest') return { 
        ...f, 
        options: estados
      };
      return f;
    });
  }, [fertilizantes, formasAplicacion, etapas, estados]);

  const handleChange = (key) => (value) => setFormValues(prev => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validamos que los campos obligatorios tengan valor
    if (!formValues.idfer || !formValues.idfap || !formValues.ideta || !formValues.idest) {
      alert('Por favor, complete todos los campos obligatorios, incluyendo el Estado.');
      return;
    }

    // Preparamos el payload convirtiendo los IDs a números para la base de datos
    const payload = {
      ...formValues,
      idfer: formValues.idfer,
      idfor: Number(formValues.idfap),
      ideta: Number(formValues.ideta),
      idest: Number(formValues.idest), 
      dosisminapl: String(formValues.dosisminapl),
      dosismaxapl: String(formValues.dosismaxapl),
    };

    if (formValues.idapl) payload.idapl = formValues.idapl;

    onSubmit(payload);
  };

  return (
    <FormPanel 
      formConfig={dynamicConfig} 
      values={formValues} 
      onChange={handleChange} 
      onSubmit={handleSubmit} 
      onCancel={onCancel} 
      loading={loadingCatalogos || loadingFertilizantes} 
    />
  );
}