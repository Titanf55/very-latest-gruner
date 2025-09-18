import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FarmerPrimaryDetails, FarmerLandDetails, simulateGetFarmerDetails, simulateGetFarmerLands } from './farmerprofile';
import { farmerServiceMock as farmerService } from '../../services/farmers_management/farmermanagementsimulation';
import ProfileHeader from './profile/ProfileHeader';
import TabNavigation from './profile/TabNavigation';
import PersonalInfo from './profile/PersonalInfo';
import AddressInfo from './profile/AddressInfo';
import FamilyDetails from './profile/FamilyDetails';
import LivestockDetails from './profile/LivestockDetails';
import FarmMachinery from './profile/FarmMachinery';
import LandCrop from './profile/LandCrop';
import SuccessModal from './shared/SuccessModal';

// Form data interface - aligned with API response structure
export interface FormData {
  personal: {
    name: string;
    phoneNumber: string;
    memberId: string;
    dateOfBirth: string;
    gender: string;
    isActive: boolean;
    email: string | null;
    fathersName: string | null;
    education: string | null;
    alternateMobile: string | null;
    createdAt: string;
    supervisorStaffId: string | null;
    kycDocument: {
      aadhaarNumber: string | null;
      voterIdNumber: string | null;
      driverLicenseNumber: string | null;
      kisaanCardNumber: string | null;
    };
  };
  address: {
    addressLine?: string;
    village?: string;
    district?: string;
    state?: string;
    mandal?: string;
    pincode?: string;
  };
  family: {
    totalAdults: number;
    totalChildren: number;
    totalMembers: number;
  };
  machinery: Array<{
    id: string;
    farmerId: string;
    machineryTypeId: string;
    machineryTypeName: string;
    count: number;
    notes?: string;
  }>;
  livestock: Array<{
    id: string;
    farmerId: string;
    livestockTypeId: string;
    livestockTypeName: string;
    livestockCategory: string;
    count: number;
    notes?: string;
  }>;
  landDetails: Array<{
    id: string;
    landName: string;
    landOwnership: string;
    area: number | string;
    areaUnit: "acre" | "hectare" | string;
    stateId: string;
    stateName: string;
    districtId: string;
    districtName: string;
    mandalId: string;
    mandalName: string;
    village: string;
    pincode: string;
    completeAddress: string;
    crops: Array<{
      id: string;
      plotNumber: string;
      cropSown: string;
      variety: string;
      totalPlantedArea: number | string;
      seedVariety: string;
    }>;
  }>;
}

// Helper function to get initial form values from API response
const getInitialValues = (primaryData: FarmerPrimaryDetails, landData: FarmerLandDetails): FormData => {
  return {
    personal: {
      name: primaryData.personal.name || '',
      phoneNumber: primaryData.personal.phoneNumber || '',
      memberId: primaryData.personal.memberId || '',
      dateOfBirth: primaryData.personal.dateOfBirth ? primaryData.personal.dateOfBirth.split('T')[0] : '',
      gender: primaryData.personal.gender || '',
      isActive: primaryData.personal.isActive,
      email: primaryData.personal.email || '',
      fathersName: primaryData.personal.fathersName || '',
      education: primaryData.personal.education || '',
      alternateMobile: primaryData.personal.alternateMobile || '',
      createdAt: primaryData.personal.createdAt || '',
      supervisorStaffId: primaryData.personal.supervisorStaffId || '',
      kycDocument: {
        aadhaarNumber: primaryData.personal.kycDocument.aadhaarNumber || '',
        voterIdNumber: primaryData.personal.kycDocument.voterIdNumber || '',
        driverLicenseNumber: primaryData.personal.kycDocument.driverLicenseNumber || '',
        kisaanCardNumber: primaryData.personal.kycDocument.kisaanCardNumber || '',
      },
    },
    address: {
      addressLine: primaryData.address.addressLine || '',
      village: primaryData.address.village || '',
      district: primaryData.address.district || '',
      state: primaryData.address.state || '',
      mandal: primaryData.address.mandal || '',
      pincode: primaryData.address.pincode || '',
    },
    family: {
      totalAdults: primaryData.family.totalAdults,
      totalChildren: primaryData.family.totalChildren,
      totalMembers: primaryData.family.totalMembers,
    },
    machinery: primaryData.machinery.map(item => ({
      id: item.id,
      farmerId: item.farmerId,
      machineryTypeId: item.machineryTypeId,
      machineryTypeName: item.machineryTypeName,
      count: item.count,
      notes: item.notes || '',
    })),
    livestock: primaryData.livestock.map(item => ({
      id: item.id,
      farmerId: item.farmerId,
      livestockTypeId: item.livestockTypeId,
      livestockTypeName: item.livestockTypeName,
      livestockCategory: item.livestockCategory,
      count: item.count,
      notes: item.notes || '',
    })),
    landDetails: landData.lands.map(land => ({
      id: land.id,
      landName: land.landName,
      landOwnership: land.landOwnership,
      area: land.area,
      areaUnit: land.areaUnit,
      stateId: land.stateId,
      stateName: land.stateName,
      districtId: land.districtId,
      districtName: land.districtName,
      mandalId: land.mandalId,
      mandalName: land.mandalName,
      village: land.village,
      pincode: land.pincode,
      completeAddress: land.completeAddress,
      crops: land.crops.map(crop => ({
        id: crop.id,
        plotNumber: crop.plotNumber,
        cropSown: crop.cropSown,
        variety: crop.variety,
        totalPlantedArea: crop.totalPlantedArea,
        seedVariety: crop.seedVariety,
      })),
    })),
  };
};

const FarmerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for farmer data
  const [farmerPrimary, setFarmerPrimary] = useState<FarmerPrimaryDetails | null>(null);
  const [farmerLands, setFarmerLands] = useState<FarmerLandDetails | null>(null);

  // Form state management
  const [formData, setFormData] = useState<FormData>(() => {
    if (farmerPrimary && farmerLands) {
      return getInitialValues(farmerPrimary, farmerLands);
    }
    return {
      personal: {
        name: '',
        phoneNumber: '',
        memberId: '',
        dateOfBirth: '',
        gender: '',
        isActive: true,
        email: '',
        fathersName: '',
        education: '',
        alternateMobile: '',
        createdAt: '',
        supervisorStaffId: '',
        kycDocument: {
          aadhaarNumber: '',
          voterIdNumber: '',
          driverLicenseNumber: '',
          kisaanCardNumber: '',
        },
      },
      address: {
        addressLine: '',
        village: '',
        district: '',
        state: '',
        mandal: '',
        pincode: '',
      },
      family: {
        totalAdults: 0,
        totalChildren: 0,
        totalMembers: 0,
      },
      machinery: [],
      livestock: [],
      landDetails: [],
    };
  });

  // Fetch farmer data using Promise.all
  useEffect(() => {
    const fetchFarmerData = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const bearerToken = 'bearer-token'; // TODO: Replace with actual token from auth context or localStorage
        
        // Use simulation for now - can be switched to actual API calls
        const [primaryResponse, landsResponse] = await Promise.all([
          simulateGetFarmerDetails(id, bearerToken),
          simulateGetFarmerLands(id, bearerToken)
        ]);
        
        // Uncomment these lines to use actual API calls instead of simulation
        // const [primaryResponse, landsResponse] = await Promise.all([
        //   actualFarmerService.getFarmerDetails(id, bearerToken),
        //   actualFarmerService.getFarmerLands(id, bearerToken)
        // ]);
        
        if (primaryResponse.success && landsResponse.success) {
          setFarmerPrimary(primaryResponse.data || null);
          setFarmerLands(landsResponse.data || null);
        } else {
          setError(primaryResponse.message || landsResponse.message || 'Failed to fetch farmer data');
        }
      } catch (err: any) {
        console.error('Error fetching farmer data:', err);
        setError('Failed to fetch farmer data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFarmerData();
  }, [id]);

  // Update form data when farmer data becomes available
  useEffect(() => {
    if (farmerPrimary && farmerLands) {
      setFormData(getInitialValues(farmerPrimary, farmerLands));
    }
  }, [farmerPrimary, farmerLands]);

  // TODO: Replace with actual token from auth context or localStorage
  const bearerToken = 'bearer-token';

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading farmer profile...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/farmers')}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg border border-gray-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Error Loading Farmer</h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/farmers')}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Back to Farmers List
        </button>
      </div>
    );
  }

  // If farmer not found, show a message
  if (!farmerPrimary || !farmerLands) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/farmers')}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg border border-gray-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Farmer Not Found</h1>
            <p className="text-gray-600">The requested farmer profile does not exist.</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/farmers')}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Back to Farmers List
        </button>
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  const handleAddLand = () => {
    setFormData(prev => ({
      ...prev,
      landDetails: [
        ...prev.landDetails,
        {
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
          crops: [],
        },
      ],
    }));
  };

  const handleRemoveLand = (index: number) => {
    setFormData(prev => ({
      ...prev,
      landDetails: prev.landDetails.filter((_, i) => i !== index),
    }));
  };

  const handleAddCrop = (landIndex: number) => {
    setFormData(prev => ({
      ...prev,
      landDetails: prev.landDetails.map((land, index) =>
        index === landIndex
          ? {
              ...land,
              crops: [
                ...land.crops,
                { id: '', plotNumber: '', cropSown: '', variety: '', totalPlantedArea: '', seedVariety: '' },
              ],
            }
          : land
      ),
    }));
  };

  const handleRemoveCrop = (landIndex: number, cropIndex: number) => {
    setFormData(prev => ({
      ...prev,
      landDetails: prev.landDetails.map((land, index) =>
        index === landIndex
          ? {
              ...land,
              crops: land.crops.filter((_, i) => i !== cropIndex),
            }
          : land
      ),
    }));
  };

  const handleSubmit = () => {
    if (!farmerPrimary || !farmerLands) return;

    // TODO: Integrate API call for saving farmer profile changes
    // API Endpoint: PUT /api/farmers/{id}
    // Example: await saveFarmerProfile(id, formData);

    console.log('Updating farmer with form data:', formData);
    // In a real app, send to API: api.put(`/farmers/${id}`, formData);

    setShowSuccess(true);
    setIsEditMode(false);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // Status toggle handler
  const handleToggleStatus = async (newStatus: 'Active' | 'Inactive') => {
    if (!id) return;

    try {
      const res = await farmerService.toggleFarmerStatus(id, bearerToken);

      if (res.success) {
        // Update local state with the new status
        setFarmerPrimary(prev =>
          prev
            ? {
                ...prev,
                personal: { ...prev.personal, isActive: newStatus === 'Active' },
              }
            : prev
        );
        
        // Also update form data
        setFormData(prev => ({
          ...prev,
          personal: { ...prev.personal, isActive: newStatus === 'Active' },
        }));
        console.log('Status toggled to:', newStatus);
      } else {
        console.error('Failed to toggle farmer status:', res.message);
        // TODO: Show error message to user
      }
    } catch (error) {
      console.error('Error toggling farmer status:', error);
      // TODO: Show error message to user
    }
  };

  return (
    <div className="min-h-screen p-1">
      <ProfileHeader
        farmerPrimary={farmerPrimary}
        navigate={navigate}
        isEditMode={isEditMode}
        handleEdit={handleEdit}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        onToggleStatus={handleToggleStatus}
      />

      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab Content */}
      {activeTab === 'Overview' && (
        <div className="space-y-6">
          <PersonalInfo
            farmerPrimary={farmerPrimary}
            isEditMode={isEditMode}
            formData={formData}
            setFormData={setFormData}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <div className="lg:col-span-2">
              <AddressInfo
                farmerPrimary={farmerPrimary}
                isEditMode={isEditMode}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            <div className="lg:col-span-1">
              <FamilyDetails
                farmerPrimary={farmerPrimary}
                isEditMode={isEditMode}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </div>
        </div>
      )}
      {activeTab === 'Machinery & Livestock' && (
        <div className="space-y-6">
          <LivestockDetails
            farmerPrimary={farmerPrimary}
            isEditMode={isEditMode}
            formData={formData}
            setFormData={setFormData}
          />
          <FarmMachinery
            farmerPrimary={farmerPrimary}
            isEditMode={isEditMode}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      )}
      {activeTab === 'Land & Crop' && (
        <div className="space-y-6">
          <LandCrop
            farmerLands={farmerLands}
            isEditMode={isEditMode}
            formData={formData}
            setFormData={setFormData}
            handleAddLand={handleAddLand}
            handleRemoveLand={handleRemoveLand}
            handleAddCrop={handleAddCrop}
            handleRemoveCrop={handleRemoveCrop}
          />
        </div>
      )}

      <SuccessModal showSuccess={showSuccess} />
    </div>
  );
};

export default FarmerProfile;