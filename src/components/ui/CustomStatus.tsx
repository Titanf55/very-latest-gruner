import React from 'react';

interface CustomStatusProps {
  isActive: boolean;
  className?: string;
}

const CustomStatus: React.FC<CustomStatusProps> = ({ 
  isActive, 
  className = '' 
}) => {
  return (
    <span
      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full w-16 justify-center ${
        isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      } ${className}`}
    >
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
};

export default CustomStatus;
