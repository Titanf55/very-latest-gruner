import React from 'react';

interface Farmer {
  id: string;
  name: string;
  phoneNumber: string;
  memberId: string;
  isActive: boolean;
  createdAt: string;
  totalLands: number;
  totalLandAreaAcres: number;
}

// Updated to support unblock action
interface ConfirmationDialogProps {
  showConfirmation: boolean;
  selectedAction: { action: 'delete' | 'block' | 'unblock'; farmer: Farmer } | null;
  handleActionConfirm: () => void;
  handleActionCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  showConfirmation,
  selectedAction,
  handleActionConfirm,
  handleActionCancel
}) => {
  if (!showConfirmation || !selectedAction) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-[400px]">
        <h2 className="text-lg font-bold">
          {selectedAction.action === 'delete' ? 'Delete User' : (selectedAction.farmer.isActive ? 'Block User' : 'Unblock User')}
        </h2>
        <p className="mt-2">
          {selectedAction.action === 'delete' 
            ? 'Are you sure you want to delete this User?' 
            : (selectedAction.farmer.isActive 
                ? 'Are you sure you want to block this User? They will not be able to access the system.' 
                : 'Are you sure you want to unblock this User? They will be able to access the system again.')
          }
        </p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={handleActionCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-black hover:bg-gray-50"
          >
            No
          </button>
          <button
            onClick={handleActionConfirm}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
