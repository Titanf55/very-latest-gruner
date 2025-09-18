import React from 'react';

export interface DisplayFieldProps {
  value: string | number;
  placeholder?: string;
  className?: string;
  height?: 'h-11' | 'h-12';
  fontWeight?: 'font-medium' | 'font-semibold';
  borderRadius?: 'rounded-lg' | 'rounded-xl';
  textAlign?: 'text-left' | 'text-center' | 'text-right';
}

const DisplayField: React.FC<DisplayFieldProps> = ({ 
  value, 
  placeholder = "---", 
  className = "",
  height = "h-12",
  fontWeight = "font-medium",
  borderRadius = "rounded-xl",
  textAlign = "text-left"
}) => {
  // Check if custom width/height is provided in className
  const hasCustomWidth = className.includes('w-');
  const hasCustomHeight = className.includes('h-');
  
  const widthClass = hasCustomWidth ? '' : 'w-full';
  const heightClass = hasCustomHeight ? '' : height;
  
  return (
    <div className={`${widthClass} ${heightClass} px-4 py-3 bg-gray-50 border border-gray-200 ${borderRadius} flex items-center shadow-sm ${className}`}>
      <span className={`text-sm ${fontWeight} text-gray-500 ${textAlign} w-full`}>
        {value || placeholder}
      </span>
    </div>
  );
};

export default DisplayField;
