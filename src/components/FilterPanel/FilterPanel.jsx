import React, { useState } from 'react';
import FilterGroup from './FilterGroup';
import { ToggleButton } from '../Buttons';

export default function FilterPanel({ filtersConfig = [], onFiltersChange }) {
  const [values, setValues] = useState(
    filtersConfig.reduce((acc, f) => ({ ...acc, [f.key]: '' }), {})
  );
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
    <div className="mb-3">
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
