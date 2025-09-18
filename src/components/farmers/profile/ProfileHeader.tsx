import React from 'react';
import { ArrowLeft, Edit, Phone, MapPin, Calendar } from 'lucide-react';
import { FarmerPrimaryDetails } from '../farmerprofile';
import { Card } from '../../ui';

interface ProfileHeaderProps {
  farmerPrimary: FarmerPrimaryDetails | null;
  navigate: (path: string) => void;
  isEditMode: boolean;
  handleEdit: () => void;
  handleCancel: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  onToggleStatus?: (newStatus: 'Active' | 'Inactive') => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  farmerPrimary, 
  navigate, 
  isEditMode, 
  handleEdit, 
  handleCancel, 
  handleSubmit,
  onToggleStatus
}) => {
  const handleToggleStatus = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleStatus) {
      const newStatus = personal.isActive ? 'Inactive' : 'Active';
      onToggleStatus(newStatus);
    }
  };

  if (!farmerPrimary) {
    return <div>Loading...</div>;
  }

  const { personal, address } = farmerPrimary;

  return (
    <div className="space-y-6" style={{ fontFamily: 'Roboto' }}>
      {/* Header with Back Button and Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/farmers')}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg border border-gray-300"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Roboto' }}>
              Farmer Profile
            </h1>
          </div>
        </div>
        
        {!isEditMode && (
          <button
            onClick={handleEdit}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
            style={{ fontFamily: 'Roboto', fontSize: '13.02px', fontWeight: 600 }}
          >
            <Edit size={18} />
            Edit Profile
          </button>
        )}
        
        {isEditMode && (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save
            </button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <Card>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-600">
              {personal.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Roboto' }}>
                {personal.name}
              </h2>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium text-white ${
                    personal.isActive 
                      ? 'bg-green-500' 
                      : 'bg-red-500'
                  } ${!isEditMode ? 'opacity-75' : ''}`}
                >
                  {personal.isActive ? 'Active' : 'Inactive'}
                </span>
                <button
                  type="button"
                  onClick={isEditMode ? handleToggleStatus : undefined}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                    isEditMode 
                      ? 'cursor-pointer hover:opacity-80' 
                      : 'cursor-not-allowed opacity-50'
                  } ${personal.isActive ? 'bg-green-500' : 'bg-gray-400'}`}
                  title={isEditMode 
                    ? 'Toggle status' 
                    : 'Click Edit to change status'
                  }
                  style={{ zIndex: 10, pointerEvents: isEditMode ? 'auto' : 'none' }}
                  disabled={!isEditMode}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      personal.isActive ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Phone size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600" style={{ fontFamily: 'Roboto' }}>
                  {personal.phoneNumber}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-600" style={{ fontFamily: 'Roboto' }}>
                  # {personal.memberId}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600" style={{ fontFamily: 'Roboto' }}>
                  {address.district}, {address.state}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600" style={{ fontFamily: 'Roboto' }}>
                  Joined {personal.createdAt.split('T')[0]}
                </span>
              </div>
            </div>
            
            {/* Assigned Kisani Didi */}
            <div className="mt-3">
              <span className="text-sm text-gray-600" style={{ fontFamily: 'Roboto' }}>
                Assigned Kisani Didi
              </span>
              <div className="mt-1">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-md font-medium">
                  {personal.supervisorStaffId || 'Not Assigned'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileHeader;