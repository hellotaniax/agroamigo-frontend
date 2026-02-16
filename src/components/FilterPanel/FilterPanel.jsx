import React, { useState, useEffect } from 'react';
import FilterGroup from './FilterGroup';
import { ToggleButton } from '../Buttons';
import './FilterPanel.css';

export default function FilterPanel({ filtersConfig = [], onFiltersChange }) {
  const [values, setValues] = useState(
    filtersConfig.reduce((acc, f) => ({ ...acc, [f.key]: '' }), {})
  );
  useEffect(() => {
    const initial = (filtersConfig || []).reduce((acc, f) => ({ ...acc, [f.key]: '' }), {});
    setValues(initial);
    onFiltersChange?.(initial);
  }, [filtersConfig]);
  const [collapsed, setCollapsed] = useState(false);

  const handleChange = (key) => (value) => {
    const newValues = { ...values, [key]: value };
    setValues(newValues);
    onFiltersChange?.(newValues); 
  };

  const handleReset = () => {
    const resetValues = Object.fromEntries(Object.keys(values).map(k => [k, '']));
    setValues(resetValues);
    onFiltersChange?.(resetValues); 
  };

  return (
    <div className="filter-panel">
      <ToggleButton collapsed={collapsed} onClick={() => setCollapsed(!collapsed)} />
      {!collapsed && (
        <FilterGroup
          filtersConfig={filtersConfig}
          values={values}
          onChange={handleChange}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
