import React from 'react';
import './Button.css';

export default function ButtonPrimary({ children, onClick, type = 'button', className = '', icon: Icon }) {
  return (
    <button
      type={type}
      className={`btn btn-primary ${className}`}
      onClick={onClick}
    >
      {Icon && <Icon />}
      {children}
    </button>
  );
}
