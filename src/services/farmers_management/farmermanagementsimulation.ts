
import { Farmer, FarmerListResponse, FetchFarmersParams } from './farmerManagement';

// Set to true to use mock data
const USE_MOCK_DATA = true;

// Simulate network delay in milliseconds
const NETWORK_DELAY = 500;

// Simulate network delay
const simulateNetworkDelay = () => 
  new Promise(resolve => setTimeout(resolve, NETWORK_DELAY));

// Minimal mock data for farmers
const sampleFarmers: Farmer[] = [
  {
    id: '1',
    name: 'John Doe',
    phoneNumber: '1234567890',
    memberId: 'MEM001',
    isActive: true,
    createdAt: '2025-09-04T10:00:00Z',
    totalLands: 2,
    totalLandAreaAcres: 5.5,
  },
  {
    id: '2',
    name: 'Jane Smith',
    phoneNumber: '0987654321',
    memberId: 'MEM002',
    isActive: false,
    createdAt: '2025-09-03T12:00:00Z',
    totalLands: 3,
    totalLandAreaAcres: 10.2,
  },
  {
    id: '3',
    name: 'Alice Johnson',
    phoneNumber: '1122334455',
    memberId: 'MEM003',
    isActive: true,
    createdAt: '2025-09-02T15:00:00Z',
    totalLands: 1,
    totalLandAreaAcres: 3.0,
  },
   {
    id: '4',
    name: 'Rahman Johnson',
    phoneNumber: '1122334423',
    memberId: 'MEM003',
    isActive: false,
    createdAt: '2025-09-02T15:00:00Z',
    totalLands: 1,
    totalLandAreaAcres: 3.0,
  },
  {
    id: '5',
    name: 'kritika Johnson',
    phoneNumber: '1122334432',
    memberId: 'MEM003',
    isActive: true,
    createdAt: '2025-09-02T15:00:00Z',
    totalLands: 1,
    totalLandAreaAcres: 3.0,
  },
];

// Filter farmers based on parameters
const filterFarmers = (farmers: Farmer[], params: FetchFarmersParams): Farmer[] => {
  return farmers.filter(farmer => {
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
const getPaginatedResults = (items: Farmer[], page: number, limit: number) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);
  const totalPages = Math.ceil(items.length / limit);
  const nextPage = page < totalPages ? page + 1 : -1;

  return {
    farmers: paginatedItems,
    count: items.length,
    totalPages,
    nextPage,
    limit,
    page,
  };
};

export const farmerServiceMock = {
  /**
   * Simulates fetching a paginated and searchable list of farmers.
   * @param params - An object containing all query parameters.
   * @param token - The authentication token.
   * @returns An object with success status and either the data or an error message.
   */
  fetchFarmers: async (params: FetchFarmersParams, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();

        let filteredFarmers = filterFarmers(sampleFarmers, params);

        // Sort by newest first if specified
        if (params.newestFirst) {
          filteredFarmers = filteredFarmers.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }

        const paginatedResults = getPaginatedResults(filteredFarmers, params.page ?? 1, params.limit ?? 10);

        const responseData: FarmerListResponse = {
          statusCode: 200,
          message: 'Farmers list retrieved successfully',
          data: {
            farmers: paginatedResults.farmers,
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
        const response = await fetch('/api/v1/fm/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          // Note: Actual params would need to be serialized for fetch
        });
        if (!response.ok) {
          throw new Error('Failed to fetch farmers');
        }
        const data = await response.json();
        return { success: true, data: data.data };
      }
    } catch (error: any) {
      console.error('Error fetching farmers:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch farmers. Please try again.',
      };
    }
  },

  /**
   * Simulates deleting a farmer record.
   * @param farmerId - The ID of the farmer to delete.
   * @param token - The authentication token.
   * @returns An object with success status and an optional error message.
   */
  deleteFarmer: async (farmerId: string, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();
        const index = sampleFarmers.findIndex(f => f.id === farmerId);
        if (index === -1) {
          return { success: false, message: 'Farmer not found' };
        }
        sampleFarmers.splice(index, 1);
        return { success: true };
      } else {
        const response = await fetch(`/api/v1/fm/${farmerId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to delete farmer');
        }
        return { success: true };
      }
    } catch (error: any) {
      console.error('Error deleting farmer:', error);
      return {
        success: false,
        message: error.message || 'Failed to delete farmer.',
      };
    }
  },

  /**
   * Simulates toggling the active status of a farmer (block/unblock).
   * @param farmerId - The ID of the farmer to update.
   * @param token - The authentication token.
   * @returns An object with success status and an optional error message.
   */
  toggleFarmerStatus: async (farmerId: string, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();
        const farmer = sampleFarmers.find(f => f.id === farmerId);
        if (!farmer) {
          return { success: false, message: 'Farmer not found' };
        }
        farmer.isActive = !farmer.isActive;
        return { success: true };
      } else {
        const response = await fetch(`/api/v1/fm/${farmerId}/status`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });
        if (!response.ok) {
          throw new Error('Failed to toggle farmer status');
        }
        return { success: true };
      }
    } catch (error: any) {
      console.error('Error toggling farmer status:', error);
      return {
        success: false,
        message: error.message || 'Failed to toggle farmer status.',
      };
    }
  },
};
