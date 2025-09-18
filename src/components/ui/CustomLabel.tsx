import React from 'react';

export interface CustomLabelProps {
  text: string;
  className?: string;
  required?: boolean;
  variant?: 'default' | 'compact' | 'large';
}

const CustomLabel: React.FC<CustomLabelProps> = ({ 
  text, 
  className = '', 
  required = false,
  variant = 'default' 
}) => {
  const baseClasses = "text-sm font-semibold text-gray-700 block mb-2";
  
  const variantClasses = {
    default: "",
    compact: "text-xs mb-1",
    large: "text-base mb-3"
  };
  
  return (
    <label className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {text}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export default CustomLabel;
