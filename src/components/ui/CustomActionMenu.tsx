import React from 'react';

interface CustomActionMenuProps {
  children: React.ReactNode;
  isOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
  className?: string;
}

const CustomActionMenu: React.FC<CustomActionMenuProps> = ({ 
  children, 
  isOpen,
  menuRef,
  className = '' 
}) => {
  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className={`absolute right-0 top-full mt-1 w-48 bg-white border border-gray-300 rounded-xl shadow-xl z-[9999] ${className}`}
    >
      <div className="py-1">
        {children}
      </div>
    </div>
  );
};

export default CustomActionMenu;
