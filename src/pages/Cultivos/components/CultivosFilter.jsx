import React, { useMemo } from 'react';
import FilterPanel from '../../../components/FilterPanel';
import { cultivosFiltersConfig } from '../cultivos.config';
import useCatalogos from '../../../hooks/useCatalogos';

/**
 * Filtro de cultivos con opciones dinámicas desde backend
 */
export default function CultivosFilter({ onFiltersChange }) {
  // ===============================
  // Catálogos dinámicos
  // ===============================
  const { estados, loading } = useCatalogos();

  // ===============================
  // Inyectar opciones dinámicas
  // ===============================
  const dynamicFilters = useMemo(() => {
    return cultivosFiltersConfig.map((filter) => {
      if (filter.key === 'state') {
        return {
          ...filter,
          options: estados, 
          placeholder: 'Todos los estados', 
        };
      }
      return filter;
    });
  }, [estados]);

  // ===============================
  // Render
  // ===============================
  return (
    <FilterPanel
      filtersConfig={dynamicFilters}
      onFiltersChange={onFiltersChange}
      loading={loading}
    />
  );
}