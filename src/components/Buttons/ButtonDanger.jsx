import React from 'react';
import './Button.css';

export default function ButtonDanger({ children, onClick, type = 'button', className = '', icon: Icon }) {
  return (
    <button
      type={type}
      className={`btn btn-danger ${className}`}
      onClick={onClick}
    >
      {Icon && <Icon style={{ marginRight: children ? '0.5rem' : 0 }} />}
      {children}
    </button>
  );
}
