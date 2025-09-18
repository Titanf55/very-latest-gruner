import React, { useState } from 'react';
import { Edit, Eye } from 'lucide-react';
import AttendanceHistoryModal from '../../attendance/AttendanceHistoryModal';
import { CustomTable, CustomTableHeader, CustomTableRow, CustomFilter, CustomFilterSelect, CustomFilterActions, CustomAttendanceStatus } from '../../ui';

interface AttendanceRecord {
  date: string;
  checkIn: string;
  checkOut: string;
  status: string;
  taskTitle: string;
  taskDescription: string;
  checkInLocation: string;
  checkOutLocation: string;
  notes: string;
  workingHours: string;
  checkInImage: string | null;
  checkOutImage: string | null;
}

interface FarmerAttendanceDetails {
  id: string;
  name: string;
  role: string;
  location: string;
  date: string;
  checkIn: string;
  checkOut: string;
  workHours: string;
  status: 'Pending' | 'Present' | 'Absent';
  taskTitle?: string;
  taskDescription?: string;
  checkInLocation?: string;
  checkOutLocation?: string;
  notes?: string;
  checkInImage?: string;
  checkOutImage?: string;
  approvedAt?: string;
}

interface AttendanceFilters {
  status: string;
  period: string;
}

interface AttendanceHistoryProps {
  attendanceRecords: AttendanceRecord[];
  isPendingApproval: boolean;
  showAttendanceFilter: boolean;
  setShowAttendanceFilter: (show: boolean) => void;
  attendanceFilters: AttendanceFilters;
  appliedAttendanceFilters: AttendanceFilters;
  handleAttendanceFilterChange: (field: keyof AttendanceFilters, value: string) => void;
  resetAttendanceFilters: () => void;
  applyAttendanceFilters: () => void;
}

// Placeholder API functions - replace with actual API calls
const farmerProfileAttendanceDetailsAPI = async (recordId: string): Promise<FarmerAttendanceDetails> => {
  // TODO: Replace with actual farmer profile attendance details API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return different data based on the record ID (date) to simulate different records
  if (recordId === '2024-01-25') {
    // Pending record data
    return {
      id: recordId,
      name: 'John Farmer',
      role: 'Farmer',
      location: 'Field A',
      date: '2024-01-25',
      checkIn: '09:00',
      checkOut: '17:00',
      workHours: '8h 0m',
      status: 'Pending',
      taskTitle: 'Farmer Training on Organic Fertilizers',
      taskDescription: 'Conducted training session on organic fertilizer usage',
      checkInLocation: 'Village Sangaria, Jaipur',
      checkOutLocation: 'Jaipur, Rajasthan',
      notes: 'Successfully completed training session for 25 farmers',
      checkInImage: null,
      checkOutImage: null,
      approvedAt: undefined
    };
  } else if (recordId === '2024-01-24') {
    // Pending record data
    return {
      id: recordId,
      name: 'John Farmer',
      role: 'Farmer',
      location: 'Field A',
      date: '2024-01-24',
      checkIn: '09:15',
      checkOut: '16:45',
      workHours: '7h 30m',
      status: 'Pending',
      taskTitle: 'Crop Health Inspection',
      taskDescription: 'Inspected crop health in assigned fields',
      checkInLocation: 'Village Sangaria, Jaipur',
      checkOutLocation: 'Jaipur, Rajasthan',
      notes: 'Found minor pest issues in wheat crops',
      checkInImage: null,
      checkOutImage: null,
      approvedAt: undefined
    };
  } else if (recordId === '2024-01-23') {
    // Present record data
    return {
      id: recordId,
      name: 'John Farmer',
      role: 'Farmer',
      location: 'Field A',
      date: '2024-01-23',
      checkIn: '09:30',
      checkOut: '17:15',
      workHours: '7h 45m',
      status: 'Present',
      taskTitle: 'Field Survey',
      taskDescription: 'Surveying fields for irrigation planning',
      checkInLocation: 'Village Sangaria, Jaipur',
      checkOutLocation: 'Jaipur, Rajasthan',
      notes: 'Field survey completed successfully',
      checkInImage: null,
      checkOutImage: null,
      approvedAt: '09:00 PM, 23-01-2024'
    };
  } else if (recordId === '2024-01-22') {
    // Absent record data
    return {
      id: recordId,
      name: 'John Farmer',
      role: 'Farmer',
      location: 'Field A',
      date: '2024-01-22',
      checkIn: '',
      checkOut: '',
      workHours: '0h 0m',
      status: 'Absent',
      taskTitle: 'Field Maintenance',
      taskDescription: 'Scheduled field maintenance',
      checkInLocation: '',
      checkOutLocation: '',
      notes: 'Absent due to personal reasons',
      checkInImage: null,
      checkOutImage: null,
      approvedAt: undefined
    };
  } else if (recordId === '2024-01-21') {
    // Present record data
    return {
      id: recordId,
      name: 'John Farmer',
      role: 'Farmer',
      location: 'Field A',
      date: '2024-01-21',
      checkIn: '08:45',
      checkOut: '17:30',
      workHours: '8h 45m',
      status: 'Present',
      taskTitle: 'Soil Testing',
      taskDescription: 'Conducted soil testing in assigned fields',
      checkInLocation: 'Village Sangaria, Jaipur',
      checkOutLocation: 'Jaipur, Rajasthan',
      notes: 'Soil testing completed, results pending',
      checkInImage: null,
      checkOutImage: null,
      approvedAt: '09:00 PM, 21-01-2024'
    };
  } else {
    // Default data
    return {
      id: recordId,
      name: 'John Farmer',
      role: 'Farmer',
      location: 'Field A',
      date: '2024-01-15',
      checkIn: '09:00',
      checkOut: '17:00',
      workHours: '8h 0m',
      status: 'Present',
      taskTitle: 'Field Preparation',
      taskDescription: 'Preparing the field for sowing season',
      checkInLocation: 'Village Sarkhej, Taluka Sanand, District Ahmedabad, Gujarat',
      checkOutLocation: 'Village Sarkhej, Taluka Sanand, District Ahmedabad, Gujarat',
      notes: 'Completed field preparation successfully. Soil is ready for planting.',
      checkInImage: null,
      checkOutImage: null,
      approvedAt: '09:00 PM, 15-01-2024'
    };
  }
};

const updateFarmerAttendanceDetailsAPI = async (recordId: string, updatedData: Partial<FarmerAttendanceDetails>): Promise<boolean> => {
  // TODO: Replace with actual update farmer attendance details API call
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('Updating farmer attendance details:', { recordId, updatedData });
  return true;
};

const AttendanceHistory: React.FC<AttendanceHistoryProps> = ({
  attendanceRecords,
  isPendingApproval,
  showAttendanceFilter,
  setShowAttendanceFilter,
  attendanceFilters,
  appliedAttendanceFilters,
  handleAttendanceFilterChange,
  resetAttendanceFilters,
  applyAttendanceFilters
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<FarmerAttendanceDetails | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const filteredAttendanceRecords = attendanceRecords.filter((record) => {
    if (appliedAttendanceFilters.status && record.status !== appliedAttendanceFilters.status) {
      return false;
    }
    return true;
  });

  const handleViewRecord = async (record: AttendanceRecord) => {
    try {
      // Call farmer-specific API to get detailed attendance information
      const detailedRecord = await farmerProfileAttendanceDetailsAPI(record.date);
      setSelectedRecord(detailedRecord);
      setIsModalOpen(true);
      setIsEditMode(false);
    } catch (error) {
      console.error('Error fetching attendance details:', error);
    }
  };

  const handleEditRecord = async (record: AttendanceRecord) => {
    try {
      // Call farmer-specific API to get detailed attendance information
      const detailedRecord = await farmerProfileAttendanceDetailsAPI(record.date);
      setSelectedRecord(detailedRecord);
      setIsModalOpen(true);
      setIsEditMode(true);
    } catch (error) {
      console.error('Error fetching attendance details:', error);
    }
  };

  const handleSaveRecord = async (updatedRecord: FarmerAttendanceDetails) => {
    try {
      // Call farmer-specific API to update attendance details
      const success = await updateFarmerAttendanceDetailsAPI(updatedRecord.id, updatedRecord);
      if (success) {
        console.log('Attendance record updated successfully');
        setIsEditMode(false);
      }
    } catch (error) {
      console.error('Error updating attendance record:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
    setIsEditMode(false);
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Roboto' }}>
          Attendance History
        </h3>
        {!isPendingApproval && (
          <CustomFilter
            isOpen={showAttendanceFilter}
            onToggle={() => setShowAttendanceFilter(!showAttendanceFilter)}
            hasActiveFilters={Object.values(appliedAttendanceFilters).some(value => value !== '')}
            onClose={() => setShowAttendanceFilter(false)}
            height="h-[370px]"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <CustomFilterSelect
                value={attendanceFilters.status}
                onChange={(value) => handleAttendanceFilterChange('status', value)}
                options={[
                  { value: '', label: 'All' },
                  { value: 'Present', label: 'Present' },
                  { value: 'Absent', label: 'Absent' }
                ]}
                placeholder="Select Status"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
              <CustomFilterSelect
                value={attendanceFilters.period}
                onChange={(value) => handleAttendanceFilterChange('period', value)}
                options={[
                  { value: '', label: 'All Periods' },
                  { value: 'Weekly', label: 'Weekly' },
                  { value: 'Monthly', label: 'Monthly' },
                  { value: 'Last Six Months', label: 'Last Six Months' },
                  { value: 'Customize Date', label: 'Customize Date' }
                ]}
                placeholder="Select Period"
              />
            </div>

            {attendanceFilters.period === 'Customize Date' && (
              <div className="mt-3 flex gap-2">
                <div className="flex-1">
                  <input
                    type="date"
                    placeholder="From"
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="date"
                    placeholder="TO"
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                  />
                </div>
              </div>
            )}

            <CustomFilterActions
              onReset={resetAttendanceFilters}
              onApply={applyAttendanceFilters}
              isApplyDisabled={false}
            />
          </CustomFilter>
        )}
      </div>

      {isPendingApproval ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-2">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-gray-600" style={{ fontFamily: 'Roboto' }}>
            Operator is not approved yet
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'Roboto' }}>
            Daily attendance records with location and task details
          </p>
          <CustomTable>
            <table className="w-full">
              <CustomTableHeader>
                  <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Roboto' }}>
                    <div className="w-[60%]">Date</div>
                  </th>
                  <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Roboto' }}>
                    <div className="w-[60%]">Check In</div>
                  </th>
                  <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Roboto' }}>
                    <div className="w-[60%]">Check Out</div>
                  </th>
                  <th className="text-left py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Roboto' }}>
                    <div className="w-[60%]">Status</div>
                  </th>
                  <th className="text-center py-3 text-sm font-semibold text-gray-600" style={{ fontFamily: 'Roboto' }}>
                    <div className="w-[60%] mx-auto">Action</div>
                  </th>
              </CustomTableHeader>
              <tbody>
                {filteredAttendanceRecords.map((record, index) => (
                  <CustomTableRow key={index} className="border-b border-gray-100">
                    <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Roboto' }}>
                      <div className="w-[60%]">{record.date}</div>
                    </td>
                    <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Roboto' }}>
                      <div className="w-[60%]">{record.checkIn}</div>
                    </td>
                    <td className="py-3 text-sm text-gray-600" style={{ fontFamily: 'Roboto' }}>
                      <div className="w-[60%]">{record.checkOut}</div>
                    </td>
                    <td className="py-3">
                      <div className="w-[60%]">
                        <CustomAttendanceStatus 
                          status={record.status as 'Present' | 'Pending' | 'Absent'} 
                        />
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      <div className="w-[60%] mx-auto">
                        <button
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          title={record.status === 'Pending' ? 'Edit attendance' : 'View details'}
                          onClick={() => {
                            if (record.status === 'Pending') {
                              handleEditRecord(record);
                            } else {
                              handleViewRecord(record);
                            }
                          }}
                        >
                          {record.status === 'Pending' ? (
                            <Edit className="w-4 h-4 text-gray-600" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-600" />
                          )}
                        </button>
                      </div>
                    </td>
                  </CustomTableRow>
                ))}
              </tbody>
            </table>
          </CustomTable>
        </>
      )}

      {/* Attendance History Modal */}
      <AttendanceHistoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        record={selectedRecord}
        isEditMode={isEditMode}
        onSave={handleSaveRecord}
      />
    </div>
  );
};

export default AttendanceHistory;
