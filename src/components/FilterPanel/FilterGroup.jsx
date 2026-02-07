import React from 'react';
import FilterItem from './FilterItem';
import { ResetButton } from '../Buttons';

export default function FilterGroup({ filtersConfig, values, onChange, onReset }) {
  return (
    <div className="d-flex gap-3 flex-wrap align-items-end">
      {filtersConfig.map(f => (
        <FilterItem
          key={f.key}
          filter={f}
          value={values[f.key]}
          onChange={onChange(f.key)} // ahora onChange solo recibe key
        />
      ))}

      <ResetButton onClick={onReset} />
    </div>
  );
}
