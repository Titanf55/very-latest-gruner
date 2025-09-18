import React from 'react';

interface CustomTableProps {
  children: React.ReactNode;
  className?: string;
}

const CustomTable: React.FC<CustomTableProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`px-6 py-4 bg-white rounded-xl shadow-lg border border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export default CustomTable;
