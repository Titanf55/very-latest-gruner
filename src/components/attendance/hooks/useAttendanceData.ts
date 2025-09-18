import { useState, useEffect } from 'react';
import { AttendanceRecord, AttendanceFilters, AttendanceSummary } from '../types';
import { useAttendanceAPI } from './useAttendanceAPI';

// Utility function to transform API response to component format
const transformApiRecord = (apiRecord: any): AttendanceRecord => {
  // Combine location fields
  const location = `${apiRecord.stateName}, ${apiRecord.districtName}, ${apiRecord.mandalName}`;
  
  // Map API role to display role
  const mapRoleToDisplay = (apiRole: string) => {
    const roleMapping: { [key: string]: string } = {
      'kisani-didi': 'Kisani Didi',
      'farm-manager': 'Farm Manager',
      'operator': 'Operator'
    };
    return roleMapping[apiRole] || apiRole;
  };
  
  // Format time for display (convert from ISO to readable format)
  const formatTime = (isoTime: string) => {
    if (!isoTime) return '-';
    const date = new Date(isoTime);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Calculate work hours
  const calculateWorkHours = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return '-';
    const checkInTime = new Date(checkIn);
    const checkOutTime = new Date(checkOut);
    const diffMs = checkOutTime.getTime() - checkInTime.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHours}h ${diffMinutes}m`;
  };

  return {
    id: apiRecord.id,
    memberId: apiRecord.memberId,
    name: apiRecord.name,
    role: mapRoleToDisplay(apiRecord.role), // Convert API role to display role
    userId: apiRecord.userId,
    stateName: apiRecord.stateName,
    districtName: apiRecord.districtName,
    mandalName: apiRecord.mandalName,
    location,
    checkInTime: apiRecord.checkInTime,
    checkOutTime: apiRecord.checkOutTime,
    checkIn: formatTime(apiRecord.checkInTime),
    checkOut: formatTime(apiRecord.checkOutTime),
    workHours: calculateWorkHours(apiRecord.checkInTime, apiRecord.checkOutTime),
    status: apiRecord.status as 'pending' | 'present' | 'absent',
  };
};


export const useAttendanceData = (
  filters: AttendanceFilters,
  currentPage: number = 1,
  itemsPerPage: number = 4
) => {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [summary, setSummary] = useState<AttendanceSummary>({ presentCount: 0, absentCount: 0, pendingCount: 0 });
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);

  // Use the centralized API hook
  const { fetchAttendanceList, loading, error } = useAttendanceAPI();

  // Fetch data from API
  useEffect(() => {
    const fetchAttendanceData = async () => {
      // Build API parameters
      const apiParams = {
        role: filters.selectedRole !== 'All Roles' ? filters.selectedRole : undefined,
        status: filters.selectedStatus !== 'All Status' ? filters.selectedStatus : undefined,
        page: currentPage,
        limit: itemsPerPage,
        date: filters.selectedDate || undefined,
      };

      const result = await fetchAttendanceList(apiParams);
      
      if (result.success && result.data) {
        // Transform API records to component format
        const transformedRecords = result.data.map((apiRecord: any) => transformApiRecord(apiRecord));
        
        // Filter by search term (client-side since API doesn't support search)
        const filteredRecords = transformedRecords.filter((record: AttendanceRecord) => 
          !filters.searchTerm || 
          record.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          record.id.toLowerCase().includes(filters.searchTerm.toLowerCase())
        );

        setAttendanceData(filteredRecords);
        setSummary(result.summary);
        setTotalPages(result.pagination.totalPages);
        setTotalEntries(result.pagination.total);
      }
    };

    fetchAttendanceData();
  }, [filters, currentPage, itemsPerPage, fetchAttendanceList]);

  // Calculate pagination indices
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalEntries);

  return {
    records: attendanceData,
    summary,
    allRecords: attendanceData, // For compatibility
    totalPages,
    totalEntries,
    startIndex,
    endIndex,
    loading,
    error
  };
};
