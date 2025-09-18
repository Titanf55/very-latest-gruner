import React from 'react';

interface CustomConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  className?: string;
}

const CustomConfirmationDialog: React.FC<CustomConfirmationDialogProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No",
  className = ""
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white p-8 rounded-lg shadow-lg relative w-[400px] ${className}`}>
        <h2 className="text-lg font-bold">
          {title}
        </h2>
        <p className="mt-2">
          {message}
        </p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-black hover:bg-gray-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomConfirmationDialog;
