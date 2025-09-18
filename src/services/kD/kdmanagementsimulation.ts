
import { KdListResponse,  FetchkDParams, KisaniDidi } from "./kDManagement";

// Set to true to use mock data
const USE_MOCK_DATA = true;

// Simulate network delay in milliseconds
const NETWORK_DELAY = 500;

// Simulate network delay
const simulateNetworkDelay = () => 
  new Promise(resolve => setTimeout(resolve, NETWORK_DELAY));

// Minimal mock data for Kd
const sampleKd: KisaniDidi[] = [
  {
    id: 1,
    name: 'John Doe',
    isActive: true,
    createdAt: "1978-11-25",
    phoneNumber: "9889233333",
     totalLands: 23,
    totalLandAreaAcres: 5.5,
    memberId: "MEM-F-2024-001",
    kycStatus: "Active",
    kdId: "KD-2024-045",
    status: "Active",
    profileImage: "https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=150",
    basicDetails: {
      fullName: "Rajesh Kumar",
      dateOfBirth: "1985-06-15",
      gender: "Male",
      mobileNumber: "+91 9876543210",
      alternateMobileNumber: "9999999999999999",
      emailAddress: "rajesh.kumar@email.com",
      fatherName: "Ramesh Kumar",
      education: "12th Pass"
    },
    kycDocuments: {
      aadharCard: "****-****-9012"
    },
    addressInfo: {
      completeAddress: "House No 123, Main Street",
      village: "Rampur",
      mandal: "Secunderabad",
      district: "Hyderabad",
      state: "Punjab",
      pinCode: "500001"
    },
    landDetails: [
      {
        landName: "Land 1",
        landDetails: "Own",
        ownLand: "2 Acres"
      },
      {
        landName: "Land 2",
        landDetails: "Leased Land",
        leasedLand: "2 Acres"
      }
    ],
    cropDetails: {
      landName: "Land 2",
      plotNumber: "12345",
      landArea: "101 acres",
      cropSown: "Kharif 2024",
      variety: "Rice, Cotton",
      seedVariety: "Good"
    },
    livestockDetails: {
      totalLivestock: 8,
      cattle: 6,
      poultry: 50,
      smallAnimals: 50,
      detailedBreakdown: [
        {
          category: "Cattle",
          items: [
            { name: "Cows", count: 3 },
            { name: "Buffaloes", count: 2 }
          ]
        },
        {
          category: "Small Animals",
          items: [
            { name: "Goats", count: 2 },
            { name: "Sheep", count: 50 }
          ]
        },
        {
          category: "Poultry",
          items: [
            { name: "Chickens", count: 3 },
            { name: "Ducks", count: 2 }
          ]
        }
      ]
    },
    quickStats: {
      totalLand: "5.5 acres",
      familyMembers: 5,
      livestock: 8,
      assets: 50
    },
    familyDetails: {
      totalAdults: 5,
      totalChildren: 3,
      workingMembers: 2
    },
    farmMachineryDetails: {
      tractor: 8,
      harvester: 6,
      truck: 50,
      plough: 50,
      sprayer: 50
    },
  
   
  },
   {
    id: 2,
    name: 'John Doe',
    isActive: true,
    createdAt: "1978-11-25",
    phoneNumber: "9889233333",
     totalLands: 23,
    totalLandAreaAcres: 5.5,
    memberId: "MEM-F-2024-001",
    kycStatus: "Active",
    kdId: "KD-2024-045",
    status: "Active",
    profileImage: "https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=150",
    basicDetails: {
      fullName: "Rajesh Kumar",
      dateOfBirth: "1985-06-15",
      gender: "Male",
      mobileNumber: "+91 9876543210",
      alternateMobileNumber: "9999999999999999",
      emailAddress: "rajesh.kumar@email.com",
      fatherName: "Ramesh Kumar",
      education: "12th Pass"
    },
    kycDocuments: {
      aadharCard: "****-****-9012"
    },
    addressInfo: {
      completeAddress: "House No 123, Main Street",
      village: "Rampur",
      mandal: "Secunderabad",
      district: "Hyderabad",
      state: "Punjab",
      pinCode: "500001"
    },
    landDetails: [
      {
        landName: "Land 1",
        landDetails: "Own",
        ownLand: "2 Acres"
      },
      {
        landName: "Land 2",
        landDetails: "Leased Land",
        leasedLand: "2 Acres"
      }
    ],
    cropDetails: {
      landName: "Land 2",
      plotNumber: "12345",
      landArea: "101 acres",
      cropSown: "Kharif 2024",
      variety: "Rice, Cotton",
      seedVariety: "Good"
    },
    livestockDetails: {
      totalLivestock: 8,
      cattle: 6,
      poultry: 50,
      smallAnimals: 50,
      detailedBreakdown: [
        {
          category: "Cattle",
          items: [
            { name: "Cows", count: 3 },
            { name: "Buffaloes", count: 2 }
          ]
        },
        {
          category: "Small Animals",
          items: [
            { name: "Goats", count: 2 },
            { name: "Sheep", count: 50 }
          ]
        },
        {
          category: "Poultry",
          items: [
            { name: "Chickens", count: 3 },
            { name: "Ducks", count: 2 }
          ]
        }
      ]
    },
    quickStats: {
      totalLand: "5.5 acres",
      familyMembers: 5,
      livestock: 8,
      assets: 50
    },
    familyDetails: {
      totalAdults: 5,
      totalChildren: 3,
      workingMembers: 2
    },
    farmMachineryDetails: {
      tractor: 8,
      harvester: 6,
      truck: 50,
      plough: 50,
      sprayer: 50
    },
  
   
  }, {
    id:3,
    name: 'John Doe',
    isActive: true,
    createdAt: "1978-11-25",
    phoneNumber: "9889233333",
     totalLands: 23,
    totalLandAreaAcres: 5.5,
    memberId: "MEM-F-2024-001",
    kycStatus: "Active",
    kdId: "KD-2024-045",
    status: "Active",
    profileImage: "https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=150",
    basicDetails: {
      fullName: "Rajesh Kumar",
      dateOfBirth: "1985-06-15",
      gender: "Male",
      mobileNumber: "+91 9876543210",
      alternateMobileNumber: "9999999999999999",
      emailAddress: "rajesh.kumar@email.com",
      fatherName: "Ramesh Kumar",
      education: "12th Pass"
    },
    kycDocuments: {
      aadharCard: "****-****-9012"
    },
    addressInfo: {
      completeAddress: "House No 123, Main Street",
      village: "Rampur",
      mandal: "Secunderabad",
      district: "Hyderabad",
      state: "Punjab",
      pinCode: "500001"
    },
    landDetails: [
      {
        landName: "Land 1",
        landDetails: "Own",
        ownLand: "2 Acres"
      },
      {
        landName: "Land 2",
        landDetails: "Leased Land",
        leasedLand: "2 Acres"
      }
    ],
    cropDetails: {
      landName: "Land 2",
      plotNumber: "12345",
      landArea: "101 acres",
      cropSown: "Kharif 2024",
      variety: "Rice, Cotton",
      seedVariety: "Good"
    },
    livestockDetails: {
      totalLivestock: 8,
      cattle: 6,
      poultry: 50,
      smallAnimals: 50,
      detailedBreakdown: [
        {
          category: "Cattle",
          items: [
            { name: "Cows", count: 3 },
            { name: "Buffaloes", count: 2 }
          ]
        },
        {
          category: "Small Animals",
          items: [
            { name: "Goats", count: 2 },
            { name: "Sheep", count: 50 }
          ]
        },
        {
          category: "Poultry",
          items: [
            { name: "Chickens", count: 3 },
            { name: "Ducks", count: 2 }
          ]
        }
      ]
    },
    quickStats: {
      totalLand: "5.5 acres",
      familyMembers: 5,
      livestock: 8,
      assets: 50
    },
    familyDetails: {
      totalAdults: 5,
      totalChildren: 3,
      workingMembers: 2
    },
    farmMachineryDetails: {
      tractor: 8,
      harvester: 6,
      truck: 50,
      plough: 50,
      sprayer: 50
    },
  
   
  },
   {
    id: 4,
    name: 'John Doe',
    isActive: true,
    createdAt: "1978-11-25",
    phoneNumber: "9889233333",
     totalLands: 23,
    totalLandAreaAcres: 5.5,
    memberId: "MEM-F-2024-001",
    kycStatus: "Active",
    kdId: "KD-2024-045",
    status: "Active",
    profileImage: "https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=150",
    basicDetails: {
      fullName: "Rajesh Kumar",
      dateOfBirth: "1985-06-15",
      gender: "Male",
      mobileNumber: "+91 9876543210",
      alternateMobileNumber: "9999999999999999",
      emailAddress: "rajesh.kumar@email.com",
      fatherName: "Ramesh Kumar",
      education: "12th Pass"
    },
    kycDocuments: {
      aadharCard: "****-****-9012"
    },
    addressInfo: {
      completeAddress: "House No 123, Main Street",
      village: "Rampur",
      mandal: "Secunderabad",
      district: "Hyderabad",
      state: "Punjab",
      pinCode: "500001"
    },
    landDetails: [
      {
        landName: "Land 1",
        landDetails: "Own",
        ownLand: "2 Acres"
      },
      {
        landName: "Land 2",
        landDetails: "Leased Land",
        leasedLand: "2 Acres"
      }
    ],
    cropDetails: {
      landName: "Land 2",
      plotNumber: "12345",
      landArea: "101 acres",
      cropSown: "Kharif 2024",
      variety: "Rice, Cotton",
      seedVariety: "Good"
    },
    livestockDetails: {
      totalLivestock: 8,
      cattle: 6,
      poultry: 50,
      smallAnimals: 50,
      detailedBreakdown: [
        {
          category: "Cattle",
          items: [
            { name: "Cows", count: 3 },
            { name: "Buffaloes", count: 2 }
          ]
        },
        {
          category: "Small Animals",
          items: [
            { name: "Goats", count: 2 },
            { name: "Sheep", count: 50 }
          ]
        },
        {
          category: "Poultry",
          items: [
            { name: "Chickens", count: 3 },
            { name: "Ducks", count: 2 }
          ]
        }
      ]
    },
    quickStats: {
      totalLand: "5.5 acres",
      familyMembers: 5,
      livestock: 8,
      assets: 50
    },
    familyDetails: {
      totalAdults: 5,
      totalChildren: 3,
      workingMembers: 2
    },
    farmMachineryDetails: {
      tractor: 8,
      harvester: 6,
      truck: 50,
      plough: 50,
      sprayer: 50
    },
  
   
  },
   {
    id: 5,
    name: 'John Doe',
    isActive: true,
    createdAt: "1978-11-25",
    phoneNumber: "9889233333",
     totalLands: 23,
    totalLandAreaAcres: 5.5,
    memberId: "MEM-F-2024-001",
    kycStatus: "Active",
    kdId: "KD-2024-045",
    status: "Active",
    profileImage: "https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=150",
    basicDetails: {
      fullName: "Rajesh Kumar",
      dateOfBirth: "1985-06-15",
      gender: "Male",
      mobileNumber: "+91 9876543210",
      alternateMobileNumber: "9999999999999999",
      emailAddress: "rajesh.kumar@email.com",
      fatherName: "Ramesh Kumar",
      education: "12th Pass"
    },
    kycDocuments: {
      aadharCard: "****-****-9012"
    },
    addressInfo: {
      completeAddress: "House No 123, Main Street",
      village: "Rampur",
      mandal: "Secunderabad",
      district: "Hyderabad",
      state: "Punjab",
      pinCode: "500001"
    },
    landDetails: [
      {
        landName: "Land 1",
        landDetails: "Own",
        ownLand: "2 Acres"
      },
      {
        landName: "Land 2",
        landDetails: "Leased Land",
        leasedLand: "2 Acres"
      }
    ],
    cropDetails: {
      landName: "Land 2",
      plotNumber: "12345",
      landArea: "101 acres",
      cropSown: "Kharif 2024",
      variety: "Rice, Cotton",
      seedVariety: "Good"
    },
    livestockDetails: {
      totalLivestock: 8,
      cattle: 6,
      poultry: 50,
      smallAnimals: 50,
      detailedBreakdown: [
        {
          category: "Cattle",
          items: [
            { name: "Cows", count: 3 },
            { name: "Buffaloes", count: 2 }
          ]
        },
        {
          category: "Small Animals",
          items: [
            { name: "Goats", count: 2 },
            { name: "Sheep", count: 50 }
          ]
        },
        {
          category: "Poultry",
          items: [
            { name: "Chickens", count: 3 },
            { name: "Ducks", count: 2 }
          ]
        }
      ]
    },
    quickStats: {
      totalLand: "5.5 acres",
      familyMembers: 5,
      livestock: 8,
      assets: 50
    },
    familyDetails: {
      totalAdults: 5,
      totalChildren: 3,
      workingMembers: 2
    },
    farmMachineryDetails: {
      tractor: 8,
      harvester: 6,
      truck: 50,
      plough: 50,
      sprayer: 50
    },
  
   
  }
  
  // {
  //   id: '2',
  //   name: 'Jane Smith',
  //   phoneNumber: '0987654321',
  //   memberId: 'MEM002',
  //   isActive: false,
  //   createdAt: '2025-09-03T12:00:00Z',
  //   totalLands: 3,
  //   totalLandAreaAcres: 10.2,
  // },
  // {
  //   id: '3',
  //   name: 'Alice Johnson',
  //   phoneNumber: '1122334455',
  //   memberId: 'MEM003',
  //   isActive: true,
  //   createdAt: '2025-09-02T15:00:00Z',
  //   totalLands: 1,
  //   totalLandAreaAcres: 3.0,
  // },
  //  {
  //   id: '4',
  //   name: 'Rahman Johnson',
  //   phoneNumber: '1122334423',
  //   memberId: 'MEM003',
  //   isActive: false,
  //   createdAt: '2025-09-02T15:00:00Z',
  //   totalLands: 1,
  //   totalLandAreaAcres: 3.0,
  // },
  // {
  //   id: '5',
  //   name: 'kritika Johnson',
  //   phoneNumber: '1122334432',
  //   memberId: 'MEM003',
  //   isActive: true,
  //   createdAt: '2025-09-02T15:00:00Z',
  //   totalLands: 1,
  //   totalLandAreaAcres: 3.0,
  // },
];

// Filter Kd based on parameters
const filterKd = (Kd: KisaniDidi[], params: FetchkDParams): KisaniDidi[] => {
  return Kd.filter(farmer => {
    // Search term filter
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      if (
        !farmer.name.toLowerCase().includes(searchLower) &&
        !farmer.phoneNumber.includes(searchLower) &&
        !farmer.memberId.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }

    // Status filter
    if (params.isActive !== undefined && farmer.isActive !== params.isActive) {
      return false;
    }

    // Location filters (stateId, districtId, mandalId)
    // Note: Farmer interface lacks these fields. Extend if needed for location-based filtering.

    // Land size filters
    if (params.totalLandMin !== undefined && farmer.totalLandAreaAcres < params.totalLandMin) {
      return false;
    }
    if (params.totalLandMax !== undefined && farmer.totalLandAreaAcres > params.totalLandMax) {
      return false;
    }

    return true;
  });
};

// Get paginated results
const getPaginatedResults = (items: kD[], page: number, limit: number) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);
  const totalPages = Math.ceil(items.length / limit);
  const nextPage = page < totalPages ? page + 1 : -1;

  return {
    Kd: paginatedItems,
    count: items.length,
    totalPages,
    nextPage,
    limit,
    page,
  };
};

export const kdServiceMock = {
  /**
   * Simulates fetching a paginated and searchable list of Kd.
   * @param params - An object containing all query parameters.
   * @param token - The authentication token.
   * @returns An object with success status and either the data or an error message.
   */
  fetchKd: async (params: FetchkDParams, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();

        let filteredKd = filterKd(sampleKd, params);

        // Sort by newest first if specified
        if (params.newestFirst) {
          filteredKd = filteredKd.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }

        const paginatedResults = getPaginatedResults(filteredKd, params.page ?? 1, params.limit ?? 10);

        const responseData: KdListResponse = {
          statusCode: 200,
          message: 'Kd list retrieved successfully',
          data: {
            kD: paginatedResults.Kd,
            count: paginatedResults.count,
            totalPages: paginatedResults.totalPages,
            nextPage: paginatedResults.nextPage,
            limit: paginatedResults.limit,
            page: paginatedResults.page,
          },
        };

        return { success: true, data: responseData.data };
      } else {
        // This block is for reference; it won't be used since USE_MOCK_DATA is true
        const response = await fetch('/api/v1/kd/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          // Note: Actual params would need to be serialized for fetch
        });
        if (!response.ok) {
          throw new Error('Failed to fetch Kd');
        }
        const data = await response.json();
        return { success: true, data: data.data };
      }
    } catch (error: any) {
      console.error('Error fetching Kd:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch Kd. Please try again.',
      };
    }
  },

  /**
   * Simulates deleting a farmer record.
   * @param kDId - The ID of the farmer to delete.
   * @param token - The authentication token.
   * @returns An object with success status and an optional error message.
   */
  deleteKd: async (kDId: string, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();
        const index = sampleKd.findIndex(f => f.id === kDId);
        if (index === -1) {
          return { success: false, message: 'Kisani Didi not found' };
        }
        sampleKd.splice(index, 1);
        return { success: true };
      } else {
        const response = await fetch(`/api/v1/kd/${kDId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to delete Kisani Didi');
        }
        return { success: true };
      }
    } catch (error: any) {
      console.error('Error deleting Kisani Didi:', error);
      return {
        success: false,
        message: error.message || 'Failed to delete Kisani Didi.',
      };
    }
  },

  /**
   * Simulates toggling the active status of a farmer (block/unblock).
   * @param kDId - The ID of the farmer to update.
   * @param token - The authentication token.
   * @returns An object with success status and an optional error message.
   */
  toggleKdtatus: async (kDId: string, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();
        const farmer = sampleKd.find(f => f.id === kDId);
        if (!farmer) {
          return { success: false, message: 'Kisani Didi not found' };
        }
        farmer.isActive = !farmer.isActive;
        return { success: true };
      } else {
        const response = await fetch(`/api/v1/kd/${kDId}/status`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });
        if (!response.ok) {
          throw new Error('Failed to toggle Kisani Didi status');
        }
        return { success: true };
      }
    } catch (error: any) {
      console.error('Error toggling Kisani Didi status:', error);
      return {
        success: false,
        message: error.message || 'Failed to toggle Kisani Didi status.',
      };
    }
  },
};







