// Attendance Management API Simulation
// This file simulates the real API with dummy data for testing purposes

// Dummy attendance data - 5 records as requested
const dummyAttendanceRecords = [
  {
    id: "uuid-attendance-001",
    memberId: "member-uuid-001",
    name: "Pooja Reddy",
    role: "kisani-didi",
    userId: "user-uuid-001",
    stateName: "Telangana",
    districtName: "Hyderabad",
    mandalName: "Benz Circle",
    checkInTime: "2025-09-16T08:30:00.000Z",
    checkOutTime: "2025-09-16T17:30:00.000Z",
    status: "present"
  },
  {
    id: "uuid-attendance-002",
    memberId: "member-uuid-002",
    name: "Rajesh Kumar",
    role: "farm-manager",
    userId: "user-uuid-002",
    stateName: "Karnataka",
    districtName: "Bangalore",
    mandalName: "Whitefield",
    checkInTime: "2025-09-16T09:00:00.000Z",
    checkOutTime: "2025-09-16T18:00:00.000Z",
    status: "present"
  },
  {
    id: "uuid-attendance-003",
    memberId: "member-uuid-003",
    name: "Amit Singh",
    role: "operator",
    userId: "user-uuid-003",
    stateName: "Bihar",
    districtName: "Patna",
    mandalName: "Boring Road",
    checkInTime: "2025-09-16T10:00:00.000Z",
    checkOutTime: null,
    status: "pending"
  },
  {
    id: "uuid-attendance-004",
    memberId: "member-uuid-004",
    name: "Sunita Devi",
    role: "kisani-didi",
    userId: "user-uuid-004",
    stateName: "Uttar Pradesh",
    districtName: "Lucknow",
    mandalName: "Gomti Nagar",
    checkInTime: null,
    checkOutTime: null,
    status: "absent"
  },
  {
    id: "uuid-attendance-005",
    memberId: "member-uuid-005",
    name: "Suresh Patel",
    role: "farm-manager",
    userId: "user-uuid-005",
    stateName: "Gujarat",
    districtName: "Ahmedabad",
    mandalName: "Navrangpura",
    checkInTime: "2025-09-16T09:15:00.000Z",
    checkOutTime: null,
    status: "pending"
  }
];

// Dummy detailed data for attendance details
const dummyAttendanceDetails: { [key: string]: any } = {
  "uuid-attendance-001": {
    checkInTime: "2025-09-16T08:30:00.000Z",
    checkOutTime: "2025-09-16T17:30:00.000Z",
    notes: "Checked in on time, completed all assigned tasks",
    checkInLocation: "17.3850,78.4867",
    checkOutLocation: "17.3850,78.4867",
    approvedAt: "2025-09-16T18:00:00.000Z",
    status: "present",
    totalWorkingHours: "09:00",
    checkInImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    checkOutImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  "uuid-attendance-002": {
    checkInTime: "2025-09-16T09:00:00.000Z",
    checkOutTime: "2025-09-16T18:00:00.000Z",
    notes: "Excellent work performance today",
    checkInLocation: "12.9716,77.5946",
    checkOutLocation: "12.9716,77.5946",
    approvedAt: "2025-09-16T18:30:00.000Z",
    status: "present",
    totalWorkingHours: "09:00",
    checkInImageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    checkOutImageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  "uuid-attendance-003": {
    checkInTime: "2025-09-16T10:00:00.000Z",
    checkOutTime: null,
    notes: "Pending check-out, still working",
    checkInLocation: "25.5941,85.1376",
    checkOutLocation: null,
    approvedAt: null,
    status: "pending",
    totalWorkingHours: "00:00",
    checkInImageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    checkOutImageUrl: null
  },
  "uuid-attendance-004": {
    checkInTime: null,
    checkOutTime: null,
    notes: "Did not report for work today",
    checkInLocation: null,
    checkOutLocation: null,
    approvedAt: null,
    status: "absent",
    totalWorkingHours: "00:00",
    checkInImageUrl: null,
    checkOutImageUrl: null
  },
  "uuid-attendance-005": {
    checkInTime: "2025-09-16T09:15:00.000Z",
    checkOutTime: null,
    notes: "Late check-in, pending check-out",
    checkInLocation: "23.0225,72.5714",
    checkOutLocation: null,
    approvedAt: null,
    status: "pending",
    totalWorkingHours: "00:00",
    checkInImageUrl: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
    checkOutImageUrl: null
  }
};

// Simulation delay to mimic real API calls
const simulateDelay = (ms: number = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Simulated attendance service with same interface as real service
export const attendanceSimulationService = {
  /**
   * Simulates GET /attendance/ endpoint
   * Fetches attendance records with pagination and filtering
   */
  fetchAttendance: async (params: {
    role?: string;
    status?: 'pending' | 'present' | 'absent';
    page?: number;
    limit?: number;
    date?: string;
  }) => {
    await simulateDelay();
    
    try {
      let filteredRecords = [...dummyAttendanceRecords];
      
      // Apply filters
      if (params.role) {
        filteredRecords = filteredRecords.filter(record => 
          record.role.toLowerCase().includes(params.role!.toLowerCase())
        );
      }
      
      if (params.status) {
        filteredRecords = filteredRecords.filter(record => record.status === params.status);
      }
      
      if (params.date) {
        filteredRecords = filteredRecords.filter(record => {
          if (!record.checkInTime) return false;
          const recordDate = new Date(record.checkInTime).toISOString().split('T')[0];
          return recordDate === params.date;
        });
      }
      
      // Calculate counts
      const presentCount = dummyAttendanceRecords.filter(r => r.status === 'present').length;
      const absentCount = dummyAttendanceRecords.filter(r => r.status === 'absent').length;
      const pendingCount = dummyAttendanceRecords.filter(r => r.status === 'pending').length;
      
      // Apply pagination
      const page = params.page || 1;
      const limit = params.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedRecords = filteredRecords.slice(startIndex, endIndex);
      
      return {
        success: true,
        data: {
          data: paginatedRecords,
          presentCount,
          absentCount,
          pendingCount,
          page,
          limit,
          total: filteredRecords.length,
          totalPages: Math.ceil(filteredRecords.length / limit)
        }
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to fetch attendance data"
      };
    }
  },

  /**
   * Simulates GET /attendance/:attendanceId endpoint
   * Fetches details of a single attendance record
   */
  getAttendanceDetails: async (attendanceId: string) => {
    await simulateDelay();
    
    try {
      const details = dummyAttendanceDetails[attendanceId];
      
      if (!details) {
        return {
          success: false,
          message: "Attendance record not found"
        };
      }
      
      return {
        success: true,
        data: details
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to fetch attendance details"
      };
    }
  },

  /**
   * Simulates PATCH /attendance/update/:attendanceId endpoint
   * Updates attendance record status and times
   */
  updateAttendance: async (
    attendanceId: string,
    updateData: {
      status?: 'pending' | 'present' | 'absent';
      checkInTime?: string;
      checkOutTime?: string;
    }
  ) => {
    await simulateDelay();
    
    try {
      // Find the record to update
      const recordIndex = dummyAttendanceRecords.findIndex(r => r.id === attendanceId);
      
      if (recordIndex === -1) {
        return {
          success: false,
          message: "Attendance record not found"
        };
      }
      
      // Update the record
      const record = dummyAttendanceRecords[recordIndex];
      if (updateData.status) record.status = updateData.status;
      if (updateData.checkInTime) record.checkInTime = updateData.checkInTime;
      if (updateData.checkOutTime) record.checkOutTime = updateData.checkOutTime;
      
      // Update detailed data
      const details = dummyAttendanceDetails[attendanceId];
      if (details) {
        if (updateData.status) details.status = updateData.status;
        if (updateData.checkInTime) details.checkInTime = updateData.checkInTime;
        if (updateData.checkOutTime) details.checkOutTime = updateData.checkOutTime;
        
        // Update approval time if status changed to present
        if (updateData.status === 'present') {
          details.approvedAt = new Date().toISOString();
        }
        
        // Calculate working hours if both times are present
        if (details.checkInTime && details.checkOutTime) {
          const checkIn = new Date(details.checkInTime);
          const checkOut = new Date(details.checkOutTime);
          const diffMs = checkOut.getTime() - checkIn.getTime();
          const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
          const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
          details.totalWorkingHours = `${String(diffHours).padStart(2, '0')}:${String(diffMinutes).padStart(2, '0')}`;
        }
      }
      
      return {
        success: true,
        data: details || {
          checkInTime: record.checkInTime,
          checkOutTime: record.checkOutTime,
          status: record.status,
          notes: "Updated successfully",
          checkInLocation: "Updated location",
          checkOutLocation: "Updated location",
          approvedAt: new Date().toISOString(),
          totalWorkingHours: "08:00",
          checkInImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          checkOutImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        }
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to update attendance record"
      };
    }
  }
};

export default attendanceSimulationService;
