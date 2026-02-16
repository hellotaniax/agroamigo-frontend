import { BiSearch } from 'react-icons/bi';

export const aplicacionFormConfig = [
  { key: 'idfer', label: 'Fertilizante', type: 'select', required: true, options: [] },
  { key: 'idfap', label: 'Forma de aplicación', type: 'select', required: true, options: [] },
  { key: 'ideta', label: 'Etapa', type: 'select', required: true, options: [] },
  { key: 'dosisminapl', label: 'Dosis mínima', type: 'number', required: true, placeholder: 'Valor mínimo' },
  { key: 'dosismaxapl', label: 'Dosis máxima', type: 'number', required: true, placeholder: 'Valor máximo' },
  { key: 'recomendacionapl', label: 'Recomendación', type: 'textarea', required: false, placeholder: 'Instrucciones de aplicación (opcional)' },
];

export const aplicacionesFiltersConfig = [
  { key: 'search', label: 'Buscar fertilizante', type: 'text', placeholder: 'Buscar por fertilizante...', icon: <BiSearch /> },
  { key: 'forma', label: 'Forma', type: 'select', options: [] },
  { key: 'etapa', label: 'Etapa', type: 'select', options: [] },
];

export const aplicacionesColumns = [
  {header: 'ID', accessor: 'idapl' },
  { header: 'Fertilizante', accessor: 'fertilizanteNombre' },
  { header: 'Forma', accessor: 'formaNombre' },
  { header: 'Etapa', accessor: 'etapaNombre' },
  { header: 'Dosis (min - max)', accessor: 'dosisRange' },
  { header: 'Recomendación', accessor: 'recomendacionapl' },
];
