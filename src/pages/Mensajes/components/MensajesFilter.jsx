
import FilterPanel from '../../../components/FilterPanel';
import { mensajesFiltersConfig } from '../mensajes.config';

export default function MensajesFilter({ onFiltersChange }) {
  return (
    <FilterPanel
      filtersConfig={mensajesFiltersConfig}
      onFiltersChange={onFiltersChange}
    />
  );
}
