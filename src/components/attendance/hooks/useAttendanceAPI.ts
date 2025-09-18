import { useState, useCallback } from 'react';
// import { attendanceService } from '../../../services/attendance_management/attendance_management';
import attendanceSimulationService from '../../../services/attendance_management/attendanceSimulation';

// Custom hook for all attendance API operations
export const useAttendanceAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mapping functions to convert UI values to API values
  const mapRoleToAPI = useCallback((uiRole: string) => {
    const roleMapping: { [key: string]: string } = {
      'Kisani Didi': 'kisani-didi',
      'Farm Manager': 'farm-manager',
      'Operator': 'operator'
    };
    return roleMapping[uiRole] || uiRole;
  }, []);

  const mapStatusToAPI = useCallback((uiStatus: string) => {
    const statusMapping: { [key: string]: string } = {
      'Pending': 'pending',
      'Present': 'present',
      'Absent': 'absent'
    };
    return statusMapping[uiStatus] || uiStatus.toLowerCase();
  }, []);

  // Get auth token helper
  const getAuthToken = useCallback(() => {
    return localStorage.getItem('authToken') || '';
  }, []);

  // Helper function to format time for display
  const formatTime = useCallback((isoTime: string) => {
    if (!isoTime) return '-';
    const date = new Date(isoTime);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  }, []);

  // Helper function to convert time input to IST format
  const convertToISTFormat = useCallback((timeString: string) => {
    if (!timeString) return '';
    
    // Create a date with today's date and the provided time
    const today = new Date();
    const [hours, minutes] = timeString.split(':');
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(hours), parseInt(minutes));
    
    // Convert to IST format (YYYY-MM-DDTHH:mm:ss+05:30)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = '00';
    
    return `${year}-${month}-${day}T${hour}:${minute}:${second}+05:30`;
  }, []);

  // API 1: Fetch Attendance List
  const fetchAttendanceList = useCallback(async (params: {
    role?: string;
    status?: string;
    page?: number;
    limit?: number;
    date?: string;
  }) => {
    setLoading(true);
    setError(null);
    
    try {
      // Map UI values to API values
      const apiParams = {
        ...params,
        role: params.role ? mapRoleToAPI(params.role) : undefined,
        status: params.status ? mapStatusToAPI(params.status) as 'pending' | 'present' | 'absent' : undefined,
      };

      const response = await attendanceSimulationService.fetchAttendance(apiParams);
      
      if (response.success && response.data) {
        return {
          success: true,
          data: response.data.data,
          summary: {
            presentCount: response.data.presentCount,
            absentCount: response.data.absentCount,
            pendingCount: response.data.pendingCount,
          },
          pagination: {
            page: response.data.page,
            limit: response.data.limit,
            total: response.data.total,
            totalPages: response.data.totalPages,
          }
        };
      } else {
        setError(response.message || 'Failed to fetch attendance data');
        return { success: false, error: response.message };
      }
    } catch (err) {
      const errorMessage = 'An error occurred while fetching attendance data';
      setError(errorMessage);
      console.error('Attendance fetch error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [getAuthToken, mapRoleToAPI, mapStatusToAPI]);

  // API 2: Get Attendance Details
  const getAttendanceDetails = useCallback(async (attendanceId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await attendanceSimulationService.getAttendanceDetails(attendanceId);
      
      if (response.success && response.data) {
        return {
          success: true,
          data: {
            checkInTime: response.data.checkInTime,
            checkOutTime: response.data.checkOutTime,
            notes: response.data.notes,
            checkInLocation: response.data.checkInLocation,
            checkOutLocation: response.data.checkOutLocation,
            approvedAt: response.data.approvedAt,
            status: response.data.status,
            totalWorkingHours: response.data.totalWorkingHours,
            checkInImageUrl: response.data.checkInImageUrl,
            checkOutImageUrl: response.data.checkOutImageUrl,
            // Add formatted display fields
            checkIn: formatTime(response.data.checkInTime),
            checkOut: formatTime(response.data.checkOutTime),
            workHours: response.data.totalWorkingHours,
          }
        };
      } else {
        setError(response.message || 'Failed to fetch attendance details');
        return { success: false, error: response.message };
      }
    } catch (err) {
      const errorMessage = 'An error occurred while fetching attendance details';
      setError(errorMessage);
      console.error('Attendance details fetch error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [getAuthToken, formatTime]);

  // API 3: Update Attendance
  const updateAttendance = useCallback(async (
    attendanceId: string,
    updateData: {
      status?: 'pending' | 'present' | 'absent';
      checkInTime?: string;
      checkOutTime?: string;
    }
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      // Convert time fields to IST format if provided
      const formattedUpdateData = {
        ...updateData,
        ...(updateData.checkInTime && {
          checkInTime: convertToISTFormat(updateData.checkInTime)
        }),
        ...(updateData.checkOutTime && {
          checkOutTime: convertToISTFormat(updateData.checkOutTime)
        })
      };

      const response = await attendanceSimulationService.updateAttendance(attendanceId, formattedUpdateData);
      
      if (response.success && response.data) {
        return {
          success: true,
          data: {
            checkInTime: response.data.checkInTime,
            checkOutTime: response.data.checkOutTime,
            status: response.data.status,
            notes: response.data.notes,
            checkInLocation: response.data.checkInLocation,
            checkOutLocation: response.data.checkOutLocation,
            approvedAt: response.data.approvedAt,
            totalWorkingHours: response.data.totalWorkingHours,
            checkInImageUrl: response.data.checkInImageUrl,
            checkOutImageUrl: response.data.checkOutImageUrl,
            // Add formatted display fields
            checkIn: formatTime(response.data.checkInTime),
            checkOut: formatTime(response.data.checkOutTime),
            workHours: response.data.totalWorkingHours,
          }
        };
      } else {
        setError(response.message || 'Failed to update attendance record');
        return { success: false, error: response.message };
      }
    } catch (err) {
      const errorMessage = 'An error occurred while updating attendance record';
      setError(errorMessage);
      console.error('Attendance update error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [getAuthToken, convertToISTFormat, formatTime]);

  // Clear error function
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // API Methods
    fetchAttendanceList,
    getAttendanceDetails,
    updateAttendance,
    
    // State
    loading,
    error,
    
    // Helpers
    clearError,
    formatTime,
    convertToISTFormat,
    mapRoleToAPI,
    mapStatusToAPI,
  };
};
