// import axios from "axios";

// // Defines the expected structure for a single farmer object.
// export interface Farmer {
//   id: string;
//   name: string;
//   phoneNumber: string;
//   memberId: string;
//   isActive: boolean;
//   createdAt: string;
//   totalLands: number;
//   totalLandAreaAcres: number;
// }

// // Defines the structure of the API response for farmers.
// export interface FarmerListResponse {
//   statusCode: number;
//   message: string;
//   data: {
//     farmers: Farmer[];
//     count: number;
//     page: number;
//     limit: number;
//     totalPages: number;
//     nextPage: number;
//   };
// }

// // Defines the parameters for fetching farmers.
// export interface FetchFarmersParams {
//   search?: string; // Updated to match spec's "search" parameter
//   isActive?: boolean;
//   stateId?: string;
//   districtId?: string;
//   mandalId?: string;
//   totalLandMin?: number;
//   totalLandMax?: number;
//   page?: number; // Made optional to align with spec
//   limit?: number; // Made optional to align with spec
//   newestFirst?: boolean;
// }

// // Creates a pre-configured Axios instance for the farmer management API.
// const api = axios.create({
//   baseURL: "http://172.50.5.102:3000/api/v1/fm", // Updated to match spec's "/fm" endpoint
//   headers: { "Content-Type": "application/json" },
// });

// export const farmerService = {
//   /**
//    * Fetches a paginated and searchable list of farmers from the API.
//    * @param params - An object containing all query parameters.
//    * @param token - The authentication token.
//    * @returns An object with success status and either the data or an error message.
//    */
//   fetchFarmers: async (params: FetchFarmersParams, token: string) => {
//     try {
//       const response = await api.get<FarmerListResponse>("/", {
//         headers: { Authorization: `Bearer ${token}` },
//         params: {
//           search: params.search,
//           isActive: params.isActive,
//           stateId: params.stateId,
//           districtId: params.districtId,
//           mandalId: params.mandalId,
//           page: params.page ?? 1, // Default to 1 per spec
//           limit: params.limit ?? 10, // Default to 10 per spec
//           newestFirst: params.newestFirst ?? true, // Default to true per spec
//           totalLandMin: params.totalLandMin,
//           totalLandMax: params.totalLandMax,
//         },
//       });
//       return { success: true, data: response.data.data };
//     } catch (error: any) {
//       console.error("Error fetching farmers:", error);
//       return {
//         success: false,
//         message:
//           error.response?.data?.message || "Failed to fetch farmers. Please try again.",
//       };
//     }
//   },

//   /**
//    * Deletes a farmer record from the API.
//    * @param farmerId - The ID of the farmer to delete.
//    * @param token - The authentication token.
//    * @returns An object with success status and an optional error message.
//    */
//   deleteFarmer: async (farmerId: string, token: string) => {
//     try {
//       await api.delete(`/${farmerId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return { success: true };
//     } catch (error: any) {
//       console.error("Error deleting farmer:", error);
//       return {
//         success: false,
//         message: error.response?.data?.message || "Failed to delete farmer.",
//       };
//     }
//   },

//   /**
//    * Toggles the active status of a farmer (block/unblock).
//    * @param farmerId - The ID of the farmer to update.
//    * @param token - The authentication token.
//    * @returns An object with success status and an optional error message.
//    */
//   toggleFarmerStatus: async (farmerId: string, token: string) => {
//     try {
//       await api.put(`/${farmerId}/status`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return { success: true };
//     } catch (error: any) {
//       console.error("Error toggling farmer status:", error);
//       return {
//         success: false,
//         message: error.response?.data?.message || "Failed to toggle farmer status.",
//       };
//     }
//   },
// };

import axios from "axios";

// Defines the expected structure for a single farmer object.
export interface Farmer {
  id: string;
  name: string;
  phoneNumber: string;
  memberId: string;
  isActive: boolean;
  createdAt: string;
  totalLands: number;
  totalLandAreaAcres: number;
}

// Defines the structure of the API response for farmers.
export interface FarmerListResponse {
  statusCode: number;
  message: string;
  data: {
    farmers: Farmer[];
    count: number;
    page: number;
    limit: number;
    totalPages: number;
    nextPage: number;
  };
}

// Defines the parameters for fetching farmers.
export interface FetchFarmersParams {
  search?: string; // Updated to match spec's "search" parameter
  isActive?: boolean;
  stateId?: string;
  districtId?: string;
  mandalId?: string;
  totalLandMin?: number;
  totalLandMax?: number;
  page?: number; // Made optional to align with spec
  limit?: number; // Made optional to align with spec
  newestFirst?: boolean;
}

// Defines the structure for farmer primary details response
export interface FarmerPrimaryResponse {
  statusCode: number;
  message: string;
  data: {
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
  };
}

// Defines the structure for farmer land details response
export interface FarmerLandResponse {
  statusCode: number;
  message: string;
  data: {
    lands: Array<{
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
  };
}

// Creates a pre-configured Axios instance for the farmer management API.
const api = axios.create({
  baseURL: "http://172.50.5.102:3000/api/v1/fm", // Updated to match spec's "/fm" endpoint
  headers: { "Content-Type": "application/json" },
});

export const farmerService = {
  /**
   * Fetches a paginated and searchable list of farmers from the API.
   * @param params - An object containing all query parameters.
   * @param token - The authentication token.
   * @returns An object with success status and either the data or an error message.
   */
  fetchFarmers: async (params: FetchFarmersParams, token: string) => {
    try {
      const response = await api.get<FarmerListResponse>("/", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          search: params.search,
          isActive: params.isActive,
          stateId: params.stateId,
          districtId: params.districtId,
          mandalId: params.mandalId,
          page: params.page ?? 1, // Default to 1 per spec
          limit: params.limit ?? 10, // Default to 10 per spec
          newestFirst: params.newestFirst ?? true, // Default to true per spec
          totalLandMin: params.totalLandMin,
          totalLandMax: params.totalLandMax,
        },
      });
      return { success: true, data: response.data.data };
    } catch (error: any) {
      console.error("Error fetching farmers:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch farmers. Please try again.",
      };
    }
  },

  /**
   * Deletes a farmer record from the API.
   * @param farmerId - The ID of the farmer to delete.
   * @param token - The authentication token.
   * @returns An object with success status and an optional error message.
   */
  deleteFarmer: async (farmerId: string, token: string) => {
    try {
      await api.delete(`/${farmerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true };
    } catch (error: any) {
      console.error("Error deleting farmer:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to delete farmer.",
      };
    }
  },

  /**
   * Toggles the active status of a farmer (block/unblock).
   * @param farmerId - The ID of the farmer to update.
   * @param token - The authentication token.
   * @returns An object with success status and an optional error message.
   */
  toggleFarmerStatus: async (farmerId: string, token: string) => {
    try {
      await api.put(`/${farmerId}/status`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true };
    } catch (error: any) {
      console.error("Error toggling farmer status:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to toggle farmer status.",
      };
    }
  },

  /**
   * Get farmer primary details by ID.
   * @param farmerId - The farmer ID.
   * @param token - Auth token.
   */
  getFarmerDetails: async (farmerId: string, token: string) => {
    try {
      const response = await api.get<FarmerPrimaryResponse>(`/${farmerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true, data: response.data.data };
    } catch (error: any) {
      console.error("Error fetching farmer details:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to fetch farmer details. Please try again.",
      };
    }
  },

  /**
   * Get farmer land details (with crops).
   * @param farmerId - The farmer ID.
   * @param token - Auth token.
   */
  getFarmerLands: async (farmerId: string, token: string) => {
    try {
      const response = await api.get<FarmerLandResponse>(
        `/${farmerId}/lands`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return { success: true, data: response.data.data };
    } catch (error: any) {
      console.error("Error fetching farmer lands:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to fetch farmer lands. Please try again.",
      };
    }
  },
};

