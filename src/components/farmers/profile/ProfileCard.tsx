import React from 'react';
import { Phone, MapPin } from 'lucide-react';
import { Farmer } from '../farmerprofile';

interface ProfileCardProps {
  farmer: Farmer;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ farmer }) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
      <div className="flex items-center gap-4">
        <img
          src={farmer.profileImage}
          alt={farmer.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-xl font-semibold text-gray-900">{farmer.name}</h2>
            <span className="inline-block px-3 py-1 bg-green-600 text-white text-sm rounded-full">
              {farmer.kycStatus}
            </span>
            <span className="text-gray-500">●</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Phone size={16} />
              <span>{farmer.basicDetails.mobileNumber}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>#</span>
              <span>{farmer.memberId}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>{farmer.addressInfo.district}, {farmer.addressInfo.state}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>📅</span>
              <span>Joined 2024-01-10</span>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-500">Assigned Kisan Didi</p>
            <p className="text-sm font-medium text-blue-600 border border-gray-200 rounded-md py-1 px-3 inline-block">
              {farmer.kd}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
