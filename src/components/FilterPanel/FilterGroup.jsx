import React from 'react';
import FilterItem from './FilterItem';
import { ResetButton } from '../Buttons';
import './FilterPanel.css';

export default function FilterGroup({ filtersConfig, values, onChange, onReset }) {
  return (
    <div className="filter-group">
      {filtersConfig.map(f => (
        <FilterItem
          key={f.key}
          filter={f}
          value={values[f.key]}
          onChange={onChange(f.key)} 
        />
      ))}
      <ResetButton onClick={onReset} />
    </div>
  );
}
