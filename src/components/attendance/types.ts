export interface AttendanceRecord {
  id: string;
  memberId: string;
  name: string;
  role: string;
  userId: string;
  stateName: string;
  districtName: string;
  mandalName: string;
  location: string; // Combined from stateName, districtName, mandalName
  checkInTime: string;
  checkOutTime: string;
  checkIn: string; // Formatted time for display
  checkOut: string; // Formatted time for display
  workHours: string; // Calculated field
  status: 'pending' | 'present' | 'absent';
  // Optional fields for modal - matching API response
  taskTitle?: string;
  taskDescription?: string;
  checkInLocation?: string; // GPS coordinates from API
  checkOutLocation?: string; // GPS coordinates from API
  notes?: string;
  checkInImageUrl?: string; // Image URL from API
  checkOutImageUrl?: string; // Image URL from API
  approvedAt?: string;
  totalWorkingHours?: string; // From API response
}

export interface AttendanceSummary {
  presentCount: number;
  absentCount: number;
  pendingCount: number;
}

export interface AttendanceFilters {
  searchTerm: string;
  selectedRole: string;
  selectedDate: string;
  selectedStatus: string;
}
