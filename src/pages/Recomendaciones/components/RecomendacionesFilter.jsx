import FilterPanel from '../../../components/FilterPanel';

export default function RecomendacionesFilter({ config, onFiltersChange }) {
  return (
    <FilterPanel
      // ✅ Usamos la config dinámica que ya tiene los estados y prioridades de la DB
      filtersConfig={config} 
      onFiltersChange={onFiltersChange}
    />
  );
}
