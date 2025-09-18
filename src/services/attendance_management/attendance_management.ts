import axios from "axios";

// Defines the expected structure for a single attendance record object.
export interface AttendanceRecord {
  id: string;
  memberId: string;
  name: string;
  role: string;
  userId: string;
  stateName: string;
  districtName: string;
  mandalName: string;
  checkInTime: string;
  checkOutTime: string;
  status: 'pending' | 'present' | 'absent';
}

// Defines the structure of the API response for attendance list.
export interface AttendanceListResponse {
  statusCode: number;
  message: string;
  data: AttendanceRecord[];
  presentCount: number;
  absentCount: number;
  pendingCount: number;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Defines the parameters for fetching attendance records.
export interface FetchAttendanceParams {
  role?: string;
  status?: 'pending' | 'present' | 'absent';
  page?: number;
  limit?: number;
  date?: string; // Format: YYYY-MM-DD
}

// Defines the structure for attendance details response
export interface AttendanceDetailsResponse {
  statusCode: number;
  message: string;
  data: {
    checkInTime: string;
    checkOutTime: string;
    notes: string;
    checkInLocation: string;
    checkOutLocation: string;
    approvedAt: string;
    status: 'pending' | 'present' | 'absent';
    totalWorkingHours: string;
    checkInImageUrl: string;
    checkOutImageUrl: string;
  };
}

// Defines the request body for updating attendance
export interface UpdateAttendanceBody {
  status?: 'pending' | 'present' | 'absent';
  checkInTime?: string; // Format: YYYY-MM-DDTHH:mm:ss+05:30
  checkOutTime?: string; // Format: YYYY-MM-DDTHH:mm:ss+05:30
}

// Creates a pre-configured Axios instance for the attendance management API.
const api = axios.create({
  baseURL: "http://172.50.5.102:3000/api/v1/attendance",
  headers: { "Content-Type": "application/json" },
});

export const attendanceService = {
  /**
   * Fetches attendance records for today or a specific date with optional filtering.
   * @param params - An object containing all query parameters.
   * @param token - The authentication token.
   * @returns An object with success status and either the data or an error message.
   */
  fetchAttendance: async (params: FetchAttendanceParams, token: string) => {
    try {
      const response = await api.get<AttendanceListResponse>("/", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          role: params.role,
          status: params.status,
          page: params.page ?? 1,
          limit: params.limit ?? 10,
          date: params.date,
        },
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Error fetching attendance:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch attendance. Please try again.",
      };
    }
  },

  /**
   * Fetches details of a single attendance record by ID.
   * @param attendanceId - The ID of the attendance record.
   * @param token - The authentication token.
   * @returns An object with success status and either the data or an error message.
   */
  getAttendanceDetails: async (attendanceId: string, token: string) => {
    try {
      const response = await api.get<AttendanceDetailsResponse>(`/${attendanceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true, data: response.data.data };
    } catch (error: any) {
      console.error("Error fetching attendance details:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to fetch attendance details. Please try again.",
      };
    }
  },

  /**
   * Updates the status and optionally check-in/out times of an attendance record.
   * @param attendanceId - The ID of the attendance record to update.
   * @param updateData - The request body object containing fields to update.
   * @param token - The authentication token.
   * @returns An object with success status and either the updated data or an error message.
   */
  updateAttendance: async (
    attendanceId: string,
    updateData: UpdateAttendanceBody,
    token: string
  ) => {
    try {
      const response = await api.patch<AttendanceDetailsResponse>(
        `/update/${attendanceId}`,
        updateData, // This is the request body (JSON object)
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return { success: true, data: response.data.data };
    } catch (error: any) {
      console.error("Error updating attendance:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to update attendance. Please try again.",
      };
    }
  },
};

