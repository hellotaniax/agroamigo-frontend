import React from 'react';
import { BiReset } from 'react-icons/bi';

export default function ResetButton({ onClick }) {
  return (
    <button
      type="button"
      className="btn btn-outline-secondary d-flex align-items-center"
      onClick={onClick}
    >
      <BiReset className="me-1" /> Limpiar
    </button>
  );
}
