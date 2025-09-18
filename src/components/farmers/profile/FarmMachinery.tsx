import React from 'react';
import { CreditCard } from 'lucide-react';
import { FarmerPrimaryDetails } from '../farmerprofile';
import { CustomInput, Card, DisplayField, CustomLabel } from '../../ui';

interface FarmMachineryProps {
  farmerPrimary: FarmerPrimaryDetails | null;
  isEditMode: boolean;
  formData: any;
  setFormData: (data: any) => void;
}

const FarmMachinery: React.FC<FarmMachineryProps> = ({ farmerPrimary, isEditMode, formData, setFormData }) => {
  if (!farmerPrimary) {
    return <div>Loading...</div>;
  }

  const { machinery } = farmerPrimary;

  const handleMachineryCountChange = (index: number, value: string) => {
    const newFormData = { ...formData };
    newFormData.machinery[index] = {
      ...newFormData.machinery[index],
      count: parseInt(value) || 0
    };
    setFormData(newFormData);
  };

  return (
    <Card 
      title="Farm Machinery Details" 
      icon={<CreditCard size={22} />}
      className="max-w-md"
    >
      <div className="space-y-4">
        {machinery.map((item, index) => (
          <div key={item.id} className="flex justify-between items-center space-y-2">
            <CustomLabel text={`${item.machineryTypeName}:`} className="!mb-0 flex-1" />
            <div className="flex justify-end">
              {isEditMode ? (
                <CustomInput
                  type="number"
                  value={formData.machinery[index]?.count || ''}
                  onChange={(value) => handleMachineryCountChange(index, value)}
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

export default FarmMachinery;