import FilterPanel from '../../../components/FilterPanel';

export default function UsuariosFilter({ config, onFiltersChange }) {
  return (
    <FilterPanel
      filtersConfig={config}
      onFiltersChange={onFiltersChange}
    />
  );
}