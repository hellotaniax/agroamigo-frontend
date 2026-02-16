import React, { useMemo } from 'react';
import FilterPanel from '../../../components/FilterPanel';
import { fertilizantesFiltersConfig } from '../fertilizantes.config';
import useCatalogos from '../../../hooks/useCatalogos';

/**
 * Filtro de fertilizantes con opciones dinámicas desde backend
 */
export default function FertilizantesFilter({ onFiltersChange }) {
  // ===============================
  // Catálogos dinámicos
  // ===============================
  const { estados, tiposFertilizantes, loading } = useCatalogos();

  // ===============================
  // Inyectar opciones dinámicas
  // ===============================
  const dynamicFilters = useMemo(() => {
    return fertilizantesFiltersConfig.map((filter) => {
      if (filter.key === 'state') {
        return {
          ...filter,
          options: estados, // { value, label } desde backend
          placeholder: 'Todos los estados',
        };
      }
      if (filter.key === 'type') {
        return {
          ...filter,
          options: tiposFertilizantes, // { value, label } desde backend
          placeholder: 'Todos los tipos',
        };
      }
      return filter;
    });
  }, [estados, tiposFertilizantes]);

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
