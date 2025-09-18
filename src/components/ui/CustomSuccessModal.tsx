import React from 'react';
import { CheckCircle } from 'lucide-react';

interface CustomSuccessModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onClose?: () => void;
  className?: string;
}

const CustomSuccessModal: React.FC<CustomSuccessModalProps> = ({ 
  isOpen,
  title = "Profile Saved successfully",
  message,
  onClose,
  className = ""
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white rounded-lg p-8 max-w-md w-full mx-4 ${className}`}>
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          {message && (
            <p className="text-gray-600 text-sm">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomSuccessModal;
