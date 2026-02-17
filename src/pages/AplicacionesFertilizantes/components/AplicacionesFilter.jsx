import React, { useMemo } from 'react';
import FilterPanel from '../../../components/FilterPanel';
import { aplicacionesFiltersConfig } from '../aplicaciones.config';
import useCatalogos from '../../../hooks/useCatalogos';

export default function AplicacionesFilter({ onFiltersChange }) {
  const { formasAplicacion, etapas, estados, loading } = useCatalogos();

  const dynamic = useMemo(() => aplicacionesFiltersConfig.map(f => {
    if (f.key === 'forma') return { ...f, options: formasAplicacion };
    if (f.key === 'etapa') return { ...f, options: etapas };
    if (f.key === 'estado') return { ...f, options: estados };
    return f;
  }), [formasAplicacion, etapas, estados]);

  return <FilterPanel filtersConfig={dynamic} onFiltersChange={onFiltersChange} loading={loading} />;
}