import React from 'react';
import { Users } from 'lucide-react';
import { FarmerPrimaryDetails } from '../farmerprofile';
import { CustomInput, Card, DisplayField, CustomLabel } from '../../ui';

interface FamilyDetailsProps {
  farmerPrimary: FarmerPrimaryDetails | null;
  isEditMode: boolean;
  formData: any;
  setFormData: (data: any) => void;
}

const FamilyDetails: React.FC<FamilyDetailsProps> = ({ farmerPrimary, isEditMode, formData, setFormData }) => {
  if (!farmerPrimary) {
    return <div>Loading...</div>;
  }

  const { family } = farmerPrimary;
  return (
    <Card 
      title="Family Details" 
      icon={<Users size={22} />}
    >
      <div className="min-h-[335px] h-full flex flex-col space-y-12 justify-between">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <CustomLabel text="Total Adults" />
            {isEditMode ? (
              <CustomInput
                type="number"
                value={formData.family.totalAdults}
                onChange={(value) => setFormData({ 
                  ...formData, 
                  family: { ...formData.family, totalAdults: parseInt(value) || 0 }
                })}
                placeholder="Enter number of adults"
              />
            ) : (
              <DisplayField value={family.totalAdults} height="h-11" borderRadius="rounded-lg" />
            )}
            <div className="h-4"></div>
          </div>
          <div className="space-y-2">
            <CustomLabel text="Total Children" />
            {isEditMode ? (
              <CustomInput
                type="number"
                value={formData.family.totalChildren}
                onChange={(value) => setFormData({ 
                  ...formData, 
                  family: { ...formData.family, totalChildren: parseInt(value) || 0 }
                })}
                placeholder="Enter number of children"
              />
            ) : (
              <DisplayField value={family.totalChildren} height="h-11" borderRadius="rounded-lg" />
            )}
            <div className="h-4"></div>
          </div>
        </div>
        <div className="space-y-2">
          <CustomLabel text="Total Members" />
          {isEditMode ? (
            <CustomInput
              type="number"
              value={formData.family.totalMembers}
              onChange={(value) => setFormData({ 
                ...formData, 
                family: { ...formData.family, totalMembers: parseInt(value) || 0 }
              })}
              placeholder="Enter total members"
            />
          ) : (
            <DisplayField value={family.totalMembers} height="h-11" borderRadius="rounded-lg" />
          )}
          <div className="h-4"></div>
        </div>
        {/* Add spacing to fill remaining height */}
        <div className="flex-1"></div>
      </div>
    </Card>
  );
};

export default FamilyDetails;