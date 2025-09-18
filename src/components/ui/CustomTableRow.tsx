import React from 'react';

interface CustomTableRowProps {
  children: React.ReactNode;
  isLast?: boolean;
  className?: string;
}

const CustomTableRow: React.FC<CustomTableRowProps> = ({ 
  children, 
  isLast = false,
  className = '' 
}) => {
  return (
    <tr className={`${!isLast ? 'border-b border-gray-200' : ''} ${className}`}>
      {children}
    </tr>
  );
};

export default CustomTableRow;
