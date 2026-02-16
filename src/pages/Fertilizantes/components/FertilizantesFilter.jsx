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
          options: estados.map(e => ({ 
            value: String(e.idest), // Lo que se guarda
            label: e.nombreest     // Lo que el usuario VE
          })),
        };
      }

      if (filter.key === 'type') {
        return {
          ...filter,
          options: tiposFertilizantes.map(t => ({ 
            value: String(t.idtfer), 
            label: t.nombretfer 
          })),
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