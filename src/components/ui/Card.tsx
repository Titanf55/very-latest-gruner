import React from 'react';

export interface CardProps {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'tab' | 'compact';
}

const Card: React.FC<CardProps> = ({ 
  title, 
  icon, 
  children, 
  className = '', 
  variant = 'default' 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'tab':
        return 'bg-gray-50 rounded-lg p-1 border border-gray-200 shadow-md';
      case 'compact':
        return 'bg-white rounded-lg p-4 border border-gray-150 shadow-md';
      default:
        return 'bg-white rounded-xl p-8 border border-gray-150 shadow-md transition-all duration-300';
    }
  };

  const renderHeader = () => {
    if (!title) return null;
    
    return (
      <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
        {icon && (
          <div className="p-2 rounded-lg">
            {icon}
          </div>
        )}
        {title}
      </h3>
    );
  };

  return (
    <div className={`${getVariantStyles()} ${className}`}>
      {renderHeader()}
      {children}
    </div>
  );
};

export default Card;
