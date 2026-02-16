// src/pages/Fertilizantes/components/FertilizantesFilter.jsx
import React, { useMemo } from 'react';
import FilterPanel from '../../../components/FilterPanel';
import { fertilizantesFiltersConfig } from '../fertilizantes.config';
import useCatalogos from '../../../hooks/useCatalogos';

export default function FertilizantesFilter({ onFiltersChange }) {
  const { estados, tiposFertilizantes, loading } = useCatalogos();

  const dynamicFilters = useMemo(() => {
  return fertilizantesFiltersConfig.map((filter) => {
    if (filter.key === 'state') {
      return {
        ...filter,
        options: estados, 
        placeholder: 'Todos los estados',
      };
    }
    if (filter.key === 'type') {
      return {
        ...filter,
        options: tiposFertilizantes, 
        placeholder: 'Todos los tipos',
      };
    }
    return filter;
  });
}, [estados, tiposFertilizantes]);
  return (
    <FilterPanel
      filtersConfig={dynamicFilters}
      onFiltersChange={onFiltersChange}
      loading={loading}
    />
  );
}