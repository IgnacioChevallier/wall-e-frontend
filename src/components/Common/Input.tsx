import React, { ChangeEvent } from 'react';

interface InputProps {
  type?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  id: string;
  name?: string;
  required?: boolean;
  className?: string;
  step?: string;
  min?: string;
  max?: string;
}

const Input: React.FC<InputProps> = ({ 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  id, 
  name, 
  required = false, 
  className = '',
  step,
  min,
  max
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name || id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`input-field ${className}`}
      step={step}
      min={min}
      max={max}
    />
  );
};

export default Input; 