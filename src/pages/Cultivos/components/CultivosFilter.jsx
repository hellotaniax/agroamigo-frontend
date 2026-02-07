
import React from 'react';
import FilterPanel from '../../../components/FilterPanel';
import { cultivosFiltersConfig } from '../cultivos.config';

export default function CultivosFilter({ onFiltersChange }) {
  return (
    <FilterPanel
      filtersConfig={cultivosFiltersConfig} // array directamente
      onFiltersChange={onFiltersChange}     // callback centralizado
    />
  );
}
