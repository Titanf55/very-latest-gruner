import React from 'react';
import { Settings } from 'lucide-react';
import { FarmerPrimaryDetails } from '../farmerprofile';
import { CustomInput, Card, DisplayField, CustomLabel } from '../../ui';

interface LivestockDetailsProps {
  farmerPrimary: FarmerPrimaryDetails | null;
  isEditMode: boolean;
  formData: any;
  setFormData: (data: any) => void;
}

const LivestockDetails: React.FC<LivestockDetailsProps> = ({ farmerPrimary, isEditMode, formData, setFormData }) => {
  if (!farmerPrimary) {
    return <div>Loading...</div>;
  }

  const { livestock } = farmerPrimary;

  const handleLivestockCountChange = (index: number, value: string) => {
    const newFormData = { ...formData };
    newFormData.livestock[index] = {
      ...newFormData.livestock[index],
      count: parseInt(value) || 0
    };
    setFormData(newFormData);
  };

  return (
    <Card 
      title="Livestock Details" 
      icon={<Settings size={22} />}
      className="max-w-md"
    >
      <div className="space-y-4">
        {livestock.map((item, index) => (
          <div key={item.id} className="flex justify-between items-center space-y-2">
            <CustomLabel text={`${item.livestockTypeName}:`} className="!mb-0 flex-1" />
            <div className="flex justify-end">
              {isEditMode ? (
                <CustomInput
                  type="number"
                  value={formData.livestock[index]?.count || ''}
                  onChange={(value) => handleLivestockCountChange(index, value)}
                  className="w-24 h-11 px-3 py-2 text-center"
                />
              ) : (
                <DisplayField value={item.count} className="w-24 h-11 px-3 py-2 text-center" textAlign="text-center" />
              )}
            </div>
            <div className="h-4"></div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LivestockDetails;