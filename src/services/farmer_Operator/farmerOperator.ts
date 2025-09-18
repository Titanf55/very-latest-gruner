import axios from "axios";

// Defines the expected structure for a single operator object.
export interface Operator {
  id: string;
  name: string;
  memberId: string;
  mobile: string;
  isActive: boolean;
  status: string;
  state: string | null;
  district: string | null;
  mandal: string | null;
  village: string | null;
}

// Defines the structure of the API response for listing operators.
export interface OperatorListResponse {
  count(count: any): unknown;
  fmopending(fmopending: any): unknown;
  statusCode: number;
  message: string;
  data: Operator[];
  total: number;
  pendingApprovalCount?: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Defines the structure of a single operator profile response.
export interface OperatorProfileResponse {
  statusCode: number;
  message: string;
  data: {
    id: string;
    createdAt: string;
    name: string;
    phoneNumber: string;
    isPhoneVerified: boolean;
    alternateMobile: string | null;
    username: string | null;
    gender: string | null;
    education: string | null;
    dateOfBirth: string | null;
    profilePhotoUrl: string | null;
    addressLine: string | null;
    isActive: boolean;
    status: string;
    language: string | null;
    memberId: string;
    state: string | null;
    district: string | null;
    mandal: string | null;
    village: string | null;
    pincode: string | null;
    workingDays: number;
    kycDocuments: {
      aadhaar: { documentNumber: string | null };
      pan: { documentNumber: string | null };
    };
  };
}

// Defines the structure of a single operator task.
export interface OperatorTask {
  id: string;
  title: string;
  status: string;
  assignedAt: string;
  dueDate: string | null;
  stateId: string | null;
 districtId?: string | null;
  mandalId?: string | null;
  village: string | null;
}

// Defines the response for fetching tasks.
export interface OperatorTaskResponse {
  statusCode: number;
  message: string;
  data: OperatorTask[];
}

// Defines the parameters for fetching operators.
export interface FetchOperatorsParams {
  search?: string;
  isActive:boolean | undefined;
  stateId?: string;
  districtId?: string;
  mandalId?: string;
  page?: number;
  limit?: number;
  totalLandMin: number | undefined;
  totalLandMax : number | undefined;
  newestFirst: boolean | number | undefined;

}

// Creates a pre-configured Axios instance for the operator management API.
const api = axios.create({
  baseURL: "http://172.50.5.102:3000/api/v1/op", // Base URL for operator endpoints
  headers: { "Content-Type": "application/json" },
});

export const operatorService = {
  /**
   * Fetches a paginated and searchable list of operators from the API.
   */
  fetchOperators: async (params: FetchOperatorsParams, token: string) => {
    try {
      const response = await api.get<OperatorListResponse>("/", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          search: params.search,
          stateId: params.stateId,
          districtId: params.districtId,
          mandalId: params.mandalId,
          page: params.page ?? 1,
          limit: params.limit ?? 10,
        },
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Error fetching operators:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch operators. Please try again.",
      };
    }
  },

  /**
   * Fetches a list of operators pending approval.
   */
  fetchPendingOperators: async (params: FetchOperatorsParams, token: string) => {
    try {
      const response = await api.get<OperatorListResponse>("/pendingRequests", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          search: params.search,
          stateId: params.stateId,
          districtId: params.districtId,
          mandalId: params.mandalId,
          page: params.page ?? 1,
          limit: params.limit ?? 10,
        },
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Error fetching pending operators:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch pending operators.",
      };
    }
  },

  /**
   * Updates the status of an operator (block, unblock, approve, reject).
   */
  changeOperatorStatus: async (
    operatorId: string,
    action: "block" | "unblock" | "approve" | "reject",
    token: string
  ) => {
    try {
      const response = await api.patch(
        `/changeStatus/${operatorId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { action },
        }
      );
      return { success: true, data: response.data.data };
    } catch (error: any) {
      console.error("Error changing operator status:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to change operator status.",
      };
    }
  },

  /**
   * Fetches an operator profile by ID.
   */
  fetchOperatorProfile: async (operatorId: string, token: string) => {
    try {
      const response = await api.get<OperatorProfileResponse>(`/${operatorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true, data: response.data.data };
    } catch (error: any) {
      console.error("Error fetching operator profile:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch operator profile.",
      };
    }
  },

  /**
   * Deletes an operator by ID.
   */
  deleteOperator: async (operatorId: string, token: string) => {
    try {
      const response = await api.delete(`/${operatorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Error deleting operator:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to delete operator.",
      };
    }
  },

  /**
   * Updates an operator's profile by ID.
   */
  updateOperatorProfile: async (
    operatorId: string,
    updates: {
      name?: string;
      phoneNumber?: string;
      alternateMobile?: string;
      username?: string;
      gender?: string;
      education?: string;
      dateOfBirth?: string;
      profilePhotoUrl?: string;
      addressLine?: string;
      language?: string;
      stateId?: string;
      districtId?: string;
      mandalId?: string;
      villageId?: string;
    },
    token: string
  ) => {
    try {
      const response = await api.patch(`/${operatorId}`, updates, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true, data: response.data.data };
    } catch (error: any) {
      console.error("Error updating operator profile:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update operator profile.",
      };
    }
  },

  /**
   * Fetches tasks assigned to an operator, with optional status filter.
   */
  getOperatorTasks: async (
    operatorId: string,
    token: string,
    status?: "pending" | "in_progress" | "completed"
  ) => {
    try {
      const response = await api.get<OperatorTaskResponse>(`/task/${operatorId}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: status ? { status } : {},
      });
      return { success: true, data: response.data.data };
    } catch (error: any) {
      console.error("Error fetching operator tasks:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch operator tasks.",
      };
    }
  },
};
