import axios from "axios";

// Defines the expected structure for a single kD object.
export interface KisaniDidi {
  tasks: any;
  name: string;
  phoneNumber: string;
  memberId: string;
  isActive: boolean;
  totalLands: number;
  totalLandAreaAcres: number;
  createdAt: any;
  id: number;
  kycStatus: string;
  kdId: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Rejected';
  profileImage: string;
  basicDetails: BasicDetails;
  kycDocuments: KycDocuments;
  addressInfo: AddressInfo;
  landDetails: LandDetail[];
  cropDetails: CropDetails;
  livestockDetails: LivestockDetails;
  quickStats: QuickStats;
  familyDetails: FamilyDetails;
  farmMachineryDetails: FarmMachineryDetails;
}
interface BasicDetails {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  alternateMobileNumber:string;
  mobileNumber: string;
  emailAddress: string;
  fatherName: string;
  education: string;
}

interface KycDocuments {
  aadharCard: string;
}

interface AddressInfo {
  completeAddress: string;
  village: string;
  mandal: string;
  district: string;
  state: string;
  pinCode: string;
}

interface LandDetail {
  landName: string;
  landDetails: string;
  ownLand?: string;
  leasedLand?: string;
}

interface CropDetails {
  landName: string;
  plotNumber: string;
  landArea: string;
  cropSown: string;
  variety: string;
  seedVariety: string;
}

interface LivestockItem {
  name: string;
  count: number;
}

interface LivestockCategory {
  category: string;
  items: LivestockItem[];
}

interface LivestockDetails {
  totalLivestock: number;
  cattle: number;
  poultry: number;
  smallAnimals: number;
  detailedBreakdown: LivestockCategory[];
}

interface QuickStats {
  totalLand: string;
  familyMembers: number;
  livestock: number;
  assets: number;
}

interface FamilyDetails {
  totalAdults: number;
  totalChildren: number;
  workingMembers: number;
}

interface FarmMachineryDetails {
  tractor: number;
  harvester: number;
  truck: number;
  plough: number;
  sprayer: number;
}

// Defines the structure of the API response for kDs.
// export interface KdListResponse {
//   statusCode: number;
//   message: string;
//   data: {
//     kDsOperator(kDsOperator: any): unknown;
//     kD: KisaniDidi[];
//     count: number;
//     page: number;
//     limit: number;
//     totalPages: number;
//     nextPage: number;
//   };
// }
export interface KdListResponse {
  statusCode: number;
  message: string;
  data: {
    kD: KisaniDidi[];
    count: number;
    page: number;
    limit: number;
    totalPages: number;
    nextPage: number;
    kDsOperator?: any; // optional property
  };
}
// Defines the parameters for fetching kDs.
export interface FetchkDParams {
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

// Creates a pre-configured Axios instance for the kD management API.
const api = axios.create({
  baseURL: "http://172.50.5.102:3000/api/v1/kd", // Updated to match spec's "/fm" endpoint
  headers: { "Content-Type": "application/json" },
});

export const kDOperatorService = {
  /**
   * Fetches a paginated and searchable list of kDs from the API.
   * @param params - An object containing all query parameters.
   * @param token - The authentication token.
   * @returns An object with success status and either the data or an error message.
   */
  fetchkDsOperator: async (params: FetchkDParams, token: string) => {
    try {
      const response = await api.get<KdListResponse>("/", {
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
      console.error("Error fetching kD:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch kD. Please try again.",
      };
    }
  },

  /**
   * Deletes a kD record from the API.
   * @param KdId - The ID of the kD to delete.
   * @param token - The authentication token.
   * @returns An object with success status and an optional error message.
   */
  deletekDOperator: async (KdId: string, token: string) => {
    try {
      await api.delete(`/${KdId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true };
    } catch (error: any) {
      console.error("Error deleting kd:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to delete kd.",
      };
    }
  },

  /**
   * Toggles the active status of a kD (block/unblock).
   * @param KdId - The ID of the kD to update.
   * @param token - The authentication token.
   * @returns An object with success status and an optional error message.
   */
  togglekDOperatorStatus: async (KdId: string, token: string) => {
    try {
      await api.put(`/${KdId}/status`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true };
    } catch (error: any) {
      console.error("Error toggling kd status:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to toggle kd status.",
      };
    }
  },
};
