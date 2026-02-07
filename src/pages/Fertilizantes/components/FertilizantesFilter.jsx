import React from 'react';
import FilterPanel from '../../../components/FilterPanel';
import { fertilizantesFiltersConfig } from '../fertilizantes.config';

export default function FertilizantesFilter({ onFiltersChange }) {
  return (
    <FilterPanel
      filtersConfig={fertilizantesFiltersConfig}
      onFiltersChange={onFiltersChange}
    />
  );
}
