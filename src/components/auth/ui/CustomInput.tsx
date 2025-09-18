import React from 'react';

export interface CustomInputProps {
  type?: 'text' | 'email' | 'tel' | 'date' | 'password' | 'number';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  // Textarea props
  multiline?: boolean;
  rows?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  // Custom styling props
  inputBgColor?: string;
  inputBorderColor?: string;
  focusRingColor?: string;
  focusBorderColor?: string;
  errorBorderColor?: string;
  errorRingColor?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  touched,
  disabled = false,
  required = false,
  className = '',
  multiline = false,
  rows = 3,
  resize = 'none',
  inputBgColor = 'bg-white',
  inputBorderColor = 'border-gray-200',
  focusRingColor = 'focus:ring-green-500',
  focusBorderColor = 'focus:border-green-500',
  errorBorderColor = 'border-red-400',
  errorRingColor = 'focus:ring-red-400'
}) => {
  // Check if custom width/height is provided in className
  const hasCustomWidth = className.includes('w-');
  const hasCustomHeight = className.includes('h-');
  
  const baseClasses = `
    ${hasCustomWidth ? '' : 'w-full'} px-4 py-3 ${inputBgColor} border rounded-lg text-gray-900 
    placeholder-gray-500 transition-all duration-200 
    ${focusRingColor} ${focusBorderColor} focus:outline-none
    ${touched && error ? `${errorBorderColor} ${errorRingColor}` : `${inputBorderColor} hover:border-gray-300`}
    ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}
    ${className}
  `.trim();

  const inputClasses = multiline 
    ? `${baseClasses} resize-${resize}` 
    : `${baseClasses} ${hasCustomHeight ? '' : 'h-11'}`;

  return (
    <div>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          className={inputClasses}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={inputClasses}
        />
      )}
      {touched && error && (
        <div className="text-red-500 text-xs mt-1">{error}</div>
      )}
    </div>
  );
};

export default CustomInput;
