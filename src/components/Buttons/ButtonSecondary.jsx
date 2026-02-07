import React from 'react';
import './Button.css';

export default function ButtonSecondary({ children, onClick, type = 'button', className = '', icon: Icon }) {
  return (
    <button
      type={type}
      className={`btn btn-secondary ${className}`}
      onClick={onClick}
    >
      {Icon && <Icon style={{ marginRight: children ? '0.5rem' : 0 }} />}
      {children}
    </button>
  );
}
