import React from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

export default function ToggleButton({ collapsed, onClick }) {
  return (
    <button
      type="button"
      className="btn btn-outline-primary mb-2 d-flex align-items-center"
      onClick={onClick}
    >
      {collapsed ? 'Mostrar filtros' : 'Ocultar filtros'}
      {collapsed ? <BiChevronDown className="ms-1" /> : <BiChevronUp className="ms-1" />}
    </button>
  );
}
