import FilterPanel from '../../../components/FilterPanel';
import { recomendacionesFiltersConfig } from '../recomendaciones.config';

export default function RecomendacionesFilter({ onFiltersChange }) {
  return (
    <FilterPanel
      filtersConfig={recomendacionesFiltersConfig}
      onFiltersChange={onFiltersChange}
    />
  );
}
