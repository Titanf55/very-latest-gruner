import React from 'react';
import { Tractor } from 'lucide-react';
import { FarmerLandDetails } from '../farmerprofile';
import { CustomSelect, SelectOption, Card, DisplayField, CustomLabel } from '../../ui';

interface LandCropProps {
  farmerLands: FarmerLandDetails | null;
  isEditMode: boolean;
  formData: any;
  setFormData: (data: any) => void;
  handleAddLand: () => void;
  handleRemoveLand: (index: number) => void;
  handleAddCrop: (landIndex: number) => void;
  handleRemoveCrop: (landIndex: number, cropIndex: number) => void;
}

const LandCrop: React.FC<LandCropProps> = ({ 
  farmerLands, 
  isEditMode, 
  formData,
  setFormData,
  handleAddLand, 
  handleRemoveLand,
  handleAddCrop,
  handleRemoveCrop
}) => {
  if (!farmerLands) {
    return <div>Loading...</div>;
  }

  const { lands } = farmerLands;
  // Land type options
  const landTypeOptions: SelectOption[] = [
    { value: "own", label: "Own" },
    { value: "leased", label: "Leased" },
    { value: "shared", label: "Shared" }
  ];

  const handleLandFieldChange = (landIndex: number, field: string, value: string) => {
    const newFormData = { ...formData };
    if (!newFormData.landDetails[landIndex]) {
      newFormData.landDetails[landIndex] = {
        id: '',
        landName: '',
        landOwnership: '',
        area: '',
        areaUnit: 'acre',
        stateId: '',
        stateName: '',
        districtId: '',
        districtName: '',
        mandalId: '',
        mandalName: '',
        village: '',
        pincode: '',
        completeAddress: '',
        crops: []
      };
    }
    newFormData.landDetails[landIndex][field] = value;
    setFormData(newFormData);
  };

  const handleCropFieldChange = (landIndex: number, cropIndex: number, field: string, value: string) => {
    const newFormData = { ...formData };
    if (!newFormData.landDetails[landIndex].crops[cropIndex]) {
      newFormData.landDetails[landIndex].crops[cropIndex] = {
        id: '',
        plotNumber: '',
        cropSown: '',
        variety: '',
        totalPlantedArea: '',
        seedVariety: ''
      };
    }
    newFormData.landDetails[landIndex].crops[cropIndex][field] = value;
    setFormData(newFormData);
  };
  
  return (
    <Card 
      title="Land Details" 
      icon={<Tractor size={22} />}
    >
      <div className="flex justify-end mb-1">
        {isEditMode && (
          <button
            onClick={handleAddLand}
            className="bg-white text-black border border-black px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2 font-bold"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Land
          </button>
        )}
      </div>

      <div className="space-y-6">
        {formData.landDetails.map((_: any, index: number) => (
          <div key={index} className="border border-gray-100 rounded-xl p-6 relative shadow-sm">
            {/* Row 1: Land Details */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <CustomLabel text="Land name" />
                {isEditMode ? (
                  <input
                    type="text"
                    value={formData.landDetails[index]?.landName || ''}
                    onChange={(e) => handleLandFieldChange(index, 'landName', e.target.value)}
                    placeholder="Enter Land Name"
                    className="w-full h-11 px-4 py-2 bg-white border rounded-lg text-gray-900 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none border-gray-200 hover:border-gray-300"
                  />
                ) : (
                  <DisplayField value={lands[index]?.landName || ''} />
                )}
                <div className="h-4"></div>
              </div>
              <div className="space-y-2">
                <CustomLabel text="Land Type" />
                {isEditMode ? (
                  <CustomSelect
                    value={formData.landDetails[index]?.landOwnership || ''}
                    onChange={(value) => handleLandFieldChange(index, 'landOwnership', value)}
                    options={landTypeOptions}
                    placeholder="Enter Land Type"
                    selectedOptionBgColor="bg-gray-50"
                    selectedOptionTextColor="text-black-700"
                  />
                ) : (
                  <DisplayField value={lands[index]?.landOwnership || ''} />
                )}
                <div className="h-4"></div>
              </div>
              <div className="space-y-2">
                <CustomLabel text="Land Area" />
                {isEditMode ? (
                  <input
                    type="text"
                    value={formData.landDetails[index]?.area || ''}
                    onChange={(e) => handleLandFieldChange(index, 'area', e.target.value)}
                    placeholder="Enter Land Size"
                    className="w-full h-11 px-4 py-2 bg-white border rounded-lg text-gray-900 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none border-gray-200 hover:border-gray-300"
                  />
                ) : (
                  <DisplayField value={`${lands[index]?.area} ${lands[index]?.areaUnit}`} />
                )}
                <div className="h-4"></div>
              </div>
            </div>

            {/* Crop Details - Multiple Crops */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Crops</h3>
                {isEditMode && (
                  <button
                    onClick={() => handleAddCrop(index)}
                    className="flex items-center gap-2 bg-white text-black border border-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm font-bold"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Crop
                  </button>
                )}
              </div>
              
              {formData.landDetails[index]?.crops?.map((crop: any, cropIndex: number) => (
                <div key={cropIndex} className="mb-4">
                  <div className="flex justify-end items-center mb-3">
                    {isEditMode && formData.landDetails[index]?.crops?.length > 1 && (
                      <button
                        onClick={() => handleRemoveCrop(index, cropIndex)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <CustomLabel text="Crop Sown" />
                      {isEditMode ? (
                        <input
                          type="text"
                          value={crop.cropSown || ''}
                          onChange={(e) => handleCropFieldChange(index, cropIndex, 'cropSown', e.target.value)}
                          placeholder="Enter Crop Sown"
                          className="w-full h-11 px-4 py-2 bg-white border rounded-lg text-gray-900 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none border-gray-200 hover:border-gray-300"
                        />
                      ) : (
                        <DisplayField value={crop.cropSown || ''} />
                      )}
                      <div className="h-4"></div>
                    </div>
                    <div className="space-y-2">
                      <CustomLabel text="Variety" />
                      {isEditMode ? (
                        <input
                          type="text"
                          value={crop.variety || ''}
                          onChange={(e) => handleCropFieldChange(index, cropIndex, 'variety', e.target.value)}
                          placeholder="Enter Variety"
                          className="w-full h-11 px-4 py-2 bg-white border rounded-lg text-gray-900 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none border-gray-200 hover:border-gray-300"
                        />
                      ) : (
                        <DisplayField value={crop.variety || ''} />
                      )}
                      <div className="h-4"></div>
                    </div>
                    <div className="space-y-2">
                      <CustomLabel text="Seed Variety" />
                      {isEditMode ? (
                        <input
                          type="text"
                          value={crop.seedVariety || ''}
                          onChange={(e) => handleCropFieldChange(index, cropIndex, 'seedVariety', e.target.value)}
                          placeholder="Enter Seed Variety"
                          className="w-full h-11 px-4 py-2 bg-white border rounded-lg text-gray-900 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none border-gray-200 hover:border-gray-300"
                        />
                      ) : (
                        <DisplayField value={crop.seedVariety || ''} />
                      )}
                      <div className="h-4"></div>
                    </div>
                  </div>
                </div>
              )) || (
                <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-medium">No crops added yet</p>
                  <p className="text-gray-400 text-sm mt-1">Click "Add Crop" to get started</p>
                </div>
              )}
            </div>

            {/* Row 3: Location Details */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <CustomLabel text="State" />
                {isEditMode ? (
                  <input
                    type="text"
                    value={formData.landDetails[index]?.stateName || ''}
                    onChange={(e) => handleLandFieldChange(index, 'stateName', e.target.value)}
                    placeholder="Select State"
                    className="w-full h-11 px-4 py-2 bg-white border rounded-lg text-gray-900 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none border-gray-200 hover:border-gray-300"
                  />
                ) : (
                  <DisplayField value={lands[index]?.stateName || ''} />
                )}
                <div className="h-4"></div>
              </div>
              <div className="space-y-2">
                <CustomLabel text="District" />
                {isEditMode ? (
                  <input
                    type="text"
                    value={formData.landDetails[index]?.districtName || ''}
                    onChange={(e) => handleLandFieldChange(index, 'districtName', e.target.value)}
                    placeholder="Select District"
                    className="w-full h-11 px-4 py-2 bg-white border rounded-lg text-gray-900 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none border-gray-200 hover:border-gray-300"
                  />
                ) : (
                  <DisplayField value={lands[index]?.districtName || ''} />
                )}
                <div className="h-4"></div>
              </div>
              <div className="space-y-2">
                <CustomLabel text="Mandal" />
                {isEditMode ? (
                  <input
                    type="text"
                    value={formData.landDetails[index]?.mandalName || ''}
                    onChange={(e) => handleLandFieldChange(index, 'mandalName', e.target.value)}
                    placeholder="Select Mandal"
                    className="w-full h-11 px-4 py-2 bg-white border rounded-lg text-gray-900 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none border-gray-200 hover:border-gray-300"
                  />
                ) : (
                  <DisplayField value={lands[index]?.mandalName || ''} />
                )}
                <div className="h-4"></div>
              </div>
            </div>

            {/* Row 4: Additional Location Details */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <CustomLabel text="Village" />
                {isEditMode ? (
                  <input
                    type="text"
                    value={formData.landDetails[index]?.village || ''}
                    onChange={(e) => handleLandFieldChange(index, 'village', e.target.value)}
                    placeholder="Select Village"
                    className="w-full h-11 px-4 py-2 bg-white border rounded-lg text-gray-900 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none border-gray-200 hover:border-gray-300"
                  />
                ) : (
                  <DisplayField value={lands[index]?.village || ''} />
                )}
                <div className="h-4"></div>
              </div>
              <div className="space-y-2">
                <CustomLabel text="Pincode" />
                {isEditMode ? (
                  <input
                    type="text"
                    value={formData.landDetails[index]?.pincode || ''}
                    onChange={(e) => handleLandFieldChange(index, 'pincode', e.target.value)}
                    placeholder="Enter Pincode"
                    className="w-full h-11 px-4 py-2 bg-white border rounded-lg text-gray-900 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none border-gray-200 hover:border-gray-300"
                  />
                ) : (
                  <DisplayField value={lands[index]?.pincode || ''} />
                )}
                <div className="h-4"></div>
              </div>
              <div className="space-y-2">
                <CustomLabel text="Complete Address" />
                {isEditMode ? (
                  <input
                    type="text"
                    value={formData.landDetails[index]?.completeAddress || ''}
                    onChange={(e) => handleLandFieldChange(index, 'completeAddress', e.target.value)}
                    placeholder="Enter Complete Address"
                    className="w-full h-11 px-4 py-2 bg-white border rounded-lg text-gray-900 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none border-gray-200 hover:border-gray-300"
                  />
                ) : (
                  <DisplayField value={lands[index]?.completeAddress || ''} />
                )}
                <div className="h-4"></div>
              </div>
            </div>

            {/* Remove Land Button */}
            {isEditMode && formData.landDetails.length > 1 && (
              <button
                onClick={() => handleRemoveLand(index)}
                className="absolute top-4 right-4 text-red-600 hover:text-red-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LandCrop;