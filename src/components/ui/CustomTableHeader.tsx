import React from 'react';

interface CustomTableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const CustomTableHeader: React.FC<CustomTableHeaderProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <thead className={className}>
      <tr className="border-b border-gray-300">
        {children}
      </tr>
    </thead>
  );
};

export default CustomTableHeader;
