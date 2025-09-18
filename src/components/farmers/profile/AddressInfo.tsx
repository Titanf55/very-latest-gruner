import React from 'react';
import { MapPin } from 'lucide-react';
import { FarmerPrimaryDetails } from '../farmerprofile';
import { CustomInput, Card, DisplayField, CustomLabel } from '../../ui';

interface AddressInfoProps {
  farmerPrimary: FarmerPrimaryDetails | null;
  isEditMode: boolean;
  formData: any;
  setFormData: (data: any) => void;
}

const AddressInfo: React.FC<AddressInfoProps> = ({ farmerPrimary, isEditMode, formData, setFormData }) => {
  if (!farmerPrimary) {
    return <div>Loading...</div>;
  }

  const { address } = farmerPrimary;
  return (
    <Card 
      title="Address Information" 
      icon={<MapPin size={22} />}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 space-y-2">
            <CustomLabel text="Complete Address" />
            {isEditMode ? (
              <CustomInput
                type="text"
                value={formData.address.addressLine}
                onChange={(value) => setFormData({ 
                  ...formData, 
                  address: { ...formData.address, addressLine: value }
                })}
                placeholder="Enter complete address"
              />
            ) : (
              <DisplayField value={address.addressLine || ''} height="h-11" borderRadius="rounded-lg" />
            )}
            <div className="h-4"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="min-w-0 space-y-2">
            <CustomLabel text="District" />
            {isEditMode ? (
              <CustomInput
                type="text"
                value={formData.address.district}
                onChange={(value) => setFormData({ 
                  ...formData, 
                  address: { ...formData.address, district: value }
                })}
                placeholder="Enter district name"
              />
            ) : (
              <DisplayField value={address.district || ''} height="h-11" borderRadius="rounded-lg" />
            )}
            <div className="h-4"></div>
          </div>
          <div className="min-w-0 space-y-2">
            <CustomLabel text="Village" />
            {isEditMode ? (
              <CustomInput
                type="text"
                value={formData.address.village}
                onChange={(value) => setFormData({ 
                  ...formData, 
                  address: { ...formData.address, village: value }
                })}
                placeholder="Enter village name"
              />
            ) : (
              <DisplayField value={address.village || ''} height="h-11" borderRadius="rounded-lg" />
            )}
            <div className="h-4"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="min-w-0 space-y-2">
            <CustomLabel text="Mandal" />
            {isEditMode ? (
              <CustomInput
                type="text"
                value={formData.address.mandal}
                onChange={(value) => setFormData({ 
                  ...formData, 
                  address: { ...formData.address, mandal: value }
                })}
                placeholder="Enter mandal name"
              />
            ) : (
              <DisplayField value={address.mandal || ''} height="h-11" borderRadius="rounded-lg" />
            )}
            <div className="h-4"></div>
          </div>
          <div className="min-w-0 space-y-2">
            <CustomLabel text="State" />
            {isEditMode ? (
              <CustomInput
                type="text"
                value={formData.address.state}
                onChange={(value) => setFormData({ 
                  ...formData, 
                  address: { ...formData.address, state: value }
                })}
                placeholder="Enter state name"
              />
            ) : (
              <DisplayField value={address.state || ''} height="h-11" borderRadius="rounded-lg" />
            )}
            <div className="h-4"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="min-w-0 space-y-2">
            <CustomLabel text="PIN Code" />
            {isEditMode ? (
              <CustomInput
                type="text"
                value={formData.address.pincode}
                onChange={(value) => setFormData({ 
                  ...formData, 
                  address: { ...formData.address, pincode: value }
                })}
                placeholder="Enter PIN code"
              />
            ) : (
              <DisplayField value={address.pincode || ''} height="h-11" borderRadius="rounded-lg" />
            )}
            <div className="h-4"></div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AddressInfo;
