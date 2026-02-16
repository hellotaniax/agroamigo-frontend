import React, { useMemo } from 'react';
import FilterPanel from '../../../components/FilterPanel';
import { aplicacionesFiltersConfig } from '../aplicaciones.config';
import useCatalogos from '../../../hooks/useCatalogos';
import fertilizantesService from '../../../services/fertilizantes.service';
import { useEffect, useState } from 'react';

export default function AplicacionesFilter({ onFiltersChange }) {
  const { formasAplicacion, etapas, loading } = useCatalogos();
  const [fertilizantesOptions, setFertilizantesOptions] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const ferts = await fertilizantesService.getAll();
        setFertilizantesOptions(ferts.map(f => ({ value: f.idfer, label: f.nombrefer })));
      } catch (err) {
        console.error('Error cargando fertilizantes para filtro', err);
      }
    };
    load();
  }, []);

  const dynamic = useMemo(() => aplicacionesFiltersConfig.map(f => {
    if (f.key === 'forma') return { ...f, options: formasAplicacion, placeholder: 'Todas las formas' };
    if (f.key === 'etapa') return { ...f, options: etapas, placeholder: 'Todas las etapas' };
    if (f.key === 'search') return { ...f, placeholder: 'Buscar por fertilizante' };
    return f;
  }), [formasAplicacion, etapas]);

  return (
    <FilterPanel filtersConfig={dynamic} onFiltersChange={onFiltersChange} loading={loading} />
  );
}
