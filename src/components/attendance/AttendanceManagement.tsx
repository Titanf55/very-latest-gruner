import React, { useState } from 'react';
import AttendanceHeader from './AttendanceHeader';
import AttendanceFilters from './AttendanceFilters';
import AttendanceTable from './AttendanceTable';
import AttendanceSummary from './AttendanceSummary';
import AttendanceHistoryModal from './AttendanceHistoryModal';
import CustomPagination from '../ui/CustomPagination';
import { useAttendanceData } from './hooks/useAttendanceData';
import { AttendanceFilters as Filters, AttendanceRecord } from './types';

const AttendanceManagement: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    selectedRole: 'All Roles',
    selectedDate: '',
    selectedStatus: 'All Status'
  });
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Always show all records (no tabs) with pagination - 4 items per page
  const { records, summary, totalPages, totalEntries, startIndex, endIndex, loading, error } = useAttendanceData(
    filters, 
    currentPage, 
    4
  );

  const handleFiltersChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleViewRecord = (record: AttendanceRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
    setIsEditMode(false);
  };

  const handleEditRecord = (record: AttendanceRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
    setIsEditMode(true);
  };

  const handleSaveRecord = (updatedRecord: AttendanceRecord) => {
    // Handle saving the updated record
    console.log('Saving record:', updatedRecord);
    // Here you would typically update the record in your data source
    setIsEditMode(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
    setIsEditMode(false);
  };

  return (
    <div className="space-y-6" style={{ fontFamily: 'Roboto' }}>
      <AttendanceHeader />
      
      <AttendanceSummary 
        summary={summary} 
        className="mb-6" 
      />

      <AttendanceFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        isRoleDropdownOpen={isRoleDropdownOpen}
        onRoleDropdownToggle={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
        showFilters={true}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700" style={{ fontFamily: 'Roboto' }}>
            {error}
          </p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500" style={{ fontFamily: 'Roboto' }}>
            Loading attendance data...
          </div>
        </div>
      ) : (
        <AttendanceTable 
          records={records} 
          onViewRecord={handleViewRecord}
          onEditRecord={handleEditRecord}
        />
      )}

      <div className="mt-4">
        <CustomPagination
          currentPage={currentPage}
          totalPagesState={totalPages}
          setCurrentPage={setCurrentPage}
          startIndex={startIndex}
          endIndex={endIndex}
          totalEntries={totalEntries}
        />
      </div>

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

export default AttendanceManagement;