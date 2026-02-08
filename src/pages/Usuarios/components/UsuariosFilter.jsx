import FilterPanel from '../../../components/FilterPanel';
import { usuariosFiltersConfig } from '../usuarios.config';

export default function UsuariosFilter({ onFiltersChange }) {
  return (
    <FilterPanel
      filtersConfig={usuariosFiltersConfig}
      onFiltersChange={onFiltersChange}
    />
  );
}
