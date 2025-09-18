// farmerprofile.ts
export interface KycDocuments {
  aadhaarNumber: string | null;
  voterIdNumber: string | null;
  driverLicenseNumber: string | null;
  kisaanCardNumber: string | null;
}

// Personal details
export interface PersonalDetails {
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
  kycDocument: KycDocuments;
}

// Address details
export interface AddressDetails {
  addressLine?: string;
  village?: string;
  district?: string;
  state?: string;
  mandal?: string;
  pincode?: string;
}

// Family
export interface FamilyDetails {
  totalAdults: number;
  totalChildren: number;
  totalMembers: number;
}

// Machinery
export interface MachineryItem {
  id: string;
  farmerId: string;
  machineryTypeId: string;
  machineryTypeName: string;
  count: number;
  notes?: string;
}

// Livestock
export interface LivestockItem {
  id: string;
  farmerId: string;
  livestockTypeId: string;
  livestockTypeName: string;
  livestockCategory: string;
  count: number;
  notes?: string;
}

// Crops
export interface CropDetails {
  id: string;
  plotNumber: string;
  cropSown: string;
  variety: string;
  totalPlantedArea: number | string; // Changed to allow string for form inputs
  seedVariety: string;
}

// Lands
export interface LandDetails {
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
  crops: CropDetails[];
}

// Primary details response structure
export interface FarmerPrimaryDetails {
  personal: PersonalDetails;
  address: AddressDetails;
  family: FamilyDetails;
  machinery: MachineryItem[];
  livestock: LivestockItem[];
}

// Land details response structure
export interface FarmerLandDetails {
  lands: LandDetails[];
}

// API wrapper
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

// FormData for the form state
export interface FormData {
  personal: PersonalDetails;
  address: AddressDetails;
  family: FamilyDetails;
  machinery: MachineryItem[];
  livestock: LivestockItem[];
  landDetails: LandDetails[];
}

// Dummy Data: Farmer Primary
const farmerPrimaryDetailsData: ApiResponse<FarmerPrimaryDetails>[] = [
  {
    statusCode: 200,
    message: "Farmer primary details fetched successfully",
    data: {
      personal: {
        name: "Jane Farmer",
        phoneNumber: "8765432109",
        memberId: "MEMBER0002",
        dateOfBirth: "1982-03-05T00:00:00.000Z",
        gender: "Female",
        isActive: true,
        email: "jane.new@example.com",
        fathersName: "Rajesh Kumar Mishra",
        education: "post-graduate",
        alternateMobile: "9988776655",
        createdAt: "2025-09-10T10:22:54.000Z",
        supervisorStaffId: "STAFF0002",
        kycDocument: {
          aadhaarNumber: "XXXX-XXXX-9012",
          voterIdNumber: null,
          driverLicenseNumber: null,
          kisaanCardNumber: null,
        },
      },
      address: {
        addressLine: "Farm House 2, Blue Lane",
        village: "Blue Village",
        district: "Chennai",
        state: "Tamil Nadu",
        mandal: "Coimbatore",
        pincode: "110002",
      },
      family: { totalAdults: 1, totalChildren: 2, totalMembers: 3 },
      machinery: [
        {
          id: "mach001",
          farmerId: "f001",
          machineryTypeId: "mt001",
          machineryTypeName: "Harvester",
          count: 1,
        },
      ],
      livestock: [
        {
          id: "ls001",
          farmerId: "f001",
          livestockTypeId: "lt001",
          livestockTypeName: "Buffaloes",
          livestockCategory: "Cattle",
          count: 8,
        },
      ],
    },
  },
];

// Dummy Data: Farmer Lands
const farmerLandDetailsData: ApiResponse<FarmerLandDetails>[] = [
  {
    statusCode: 200,
    message: "Farmer land details fetched successfully",
    data: {
      lands: [
        {
          id: "fb6e0016-b5d2-42e4-a098-e1ac86957964",
          landName: "Blue Field",
          landOwnership: "leased",
          area: "1.80",
          areaUnit: "hectare",
          stateId: "7171c7b9-29d9-4856-9c4a-10a8bee54924",
          stateName: "Tamil Nadu",
          districtId: "497b66a8-77a2-41ae-8211-793d793c368f",
          districtName: "Chennai",
          mandalId: "afb84ca7-8e0c-4f90-a6d8-4c33740354ac",
          mandalName: "Coimbatore",
          village: "Blue Village",
          pincode: "110002",
          completeAddress: "Blue Village, Blue Lane, Near School",
          crops: [
            {
              id: "7be37084-6fdc-4979-aae7-b2a49b0bd6e1",
              plotNumber: "Plot-202",
              cropSown: "Rice",
              variety: "Basmati",
              totalPlantedArea: 2,
              seedVariety: "Seed B",
            },
          ],
        },
      ],
    },
  },
];

// Helper to fetch farmer by ID
export const getFarmerById = (farmerId: string) => {
  const farmerIndex = farmerId === "1" ? 0 : -1;

  if (farmerIndex >= 0 && farmerIndex < farmerPrimaryDetailsData.length) {
    return {
      primary: farmerPrimaryDetailsData[farmerIndex].data,
      lands: farmerLandDetailsData[farmerIndex].data,
    };
  }
  return null;
};

// Errors
export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

export const notFoundError = (farmerId: string): ErrorResponse => ({
  statusCode: 400,
  message: `Farmer with ID ${farmerId} not found`,
  error: "Bad Request",
});

export const unauthorizedError: ErrorResponse = {
  statusCode: 401,
  message: "Unauthorized",
  error: "Unauthorized",
};

// Export mock data
export { farmerPrimaryDetailsData, farmerLandDetailsData };

// ---------- Simulation Functions ----------

// Simulate network delay
const simulateNetworkDelay = () => 
  new Promise(resolve => setTimeout(resolve, 500));

// Simulation for farmer primary details
export const simulateGetFarmerDetails = async (farmerId: string, _token: string) => {
  try {
    await simulateNetworkDelay();
    
    const farmerIndex = farmerId === "1" ? 0 : -1;
    
    if (farmerIndex >= 0 && farmerIndex < farmerPrimaryDetailsData.length) {
      return { 
        success: true, 
        data: farmerPrimaryDetailsData[farmerIndex].data 
      };
    }
    
    return {
      success: false,
      message: `Farmer with ID ${farmerId} not found`,
    };
  } catch (error: any) {
    console.error("Error simulating farmer details:", error);
    return {
      success: false,
      message: "Failed to fetch farmer details. Please try again.",
    };
  }
};

// Simulation for farmer land details
export const simulateGetFarmerLands = async (farmerId: string, _token: string) => {
  try {
    await simulateNetworkDelay();
    
    const farmerIndex = farmerId === "1" ? 0 : -1;
    
    if (farmerIndex >= 0 && farmerIndex < farmerLandDetailsData.length) {
      return { 
        success: true, 
        data: farmerLandDetailsData[farmerIndex].data 
      };
    }
    
    return {
      success: false,
      message: `Farmer lands with ID ${farmerId} not found`,
    };
  } catch (error: any) {
    console.error("Error simulating farmer lands:", error);
    return {
      success: false,
      message: "Failed to fetch farmer lands. Please try again.",
    };
  }
};