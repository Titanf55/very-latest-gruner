import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  showSuccess: boolean;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ showSuccess }) => {
  if (!showSuccess) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Saved successfully</h3>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
