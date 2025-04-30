import React from 'react';

const Input = ({ type = 'text', value, onChange, placeholder, id, name, required = false, className = '' }) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`input-field ${className}`}
    />
  );
};

export default Input; 