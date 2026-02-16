import FilterPanel from '../../../components/FilterPanel';

export default function RecomendacionesFilter({ config, onFiltersChange }) {
  return (
    <FilterPanel
      filtersConfig={config} 
      onFiltersChange={onFiltersChange}
    />
  );
}
