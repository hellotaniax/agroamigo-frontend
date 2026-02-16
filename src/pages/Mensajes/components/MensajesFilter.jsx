import React, { useMemo } from 'react';
import FilterPanel from '../../../components/FilterPanel';
import { mensajesFiltersConfig } from '../mensajes.config';

/**
 * Filtro de mensajes con opciones dinámicas desde el hook
 */
export default function MensajesFilter({ onFiltersChange, estados, loading }) {
  // ===============================
  // Inyectar opciones dinámicas
  // ===============================
  const dynamicFilters = useMemo(() => {
    return mensajesFiltersConfig.map((filter) => {
      if (filter.key === 'estado') {
        return {
          ...filter,
          options: [
            ...estados.map(e => ({ value: e.nombreest, label: e.nombreest }))
          ],
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