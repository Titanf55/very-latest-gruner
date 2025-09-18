import React, { ChangeEvent, useState } from 'react';
import { Search, Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AttendanceFilters as Filters } from './types';
import CustomFilter, { CustomFilterSelect, CustomFilterActions } from '../ui/CustomFilter';

// Custom styles for react-datepicker
const customStyles = `
  .react-datepicker-popper {
    z-index: 9999 !important;
  }
  .react-datepicker {
    border: 1px solid #d1d5db !important;
    border-radius: 0.5rem !important;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
    font-family: 'Poppins', sans-serif !important;
  }
  .react-datepicker__header {
    background-color: #f9fafb !important;
    border-bottom: 1px solid #e5e7eb !important;
    border-radius: 0.5rem 0.5rem 0 0 !important;
  }
  .react-datepicker__current-month {
    font-weight: 600 !important;
    color: #374151 !important;
  }
  .react-datepicker__day {
    font-weight: 400 !important;
    color: #374151 !important;
  }
  .react-datepicker__day--selected {
    background-color: #3b82f6 !important;
    color: white !important;
  }
  .react-datepicker__day--keyboard-selected {
    background-color: #dbeafe !important;
    color: #1d4ed8 !important;
  }
  .react-datepicker__day:hover {
    background-color: #f3f4f6 !important;
  }
`;

// Inject custom styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

interface AttendanceFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Partial<Filters>) => void;
  isRoleDropdownOpen: boolean;
  onRoleDropdownToggle: () => void;
  showFilters: boolean;
}

const AttendanceFilters: React.FC<AttendanceFiltersProps> = ({
  filters,
  onFiltersChange,
  isRoleDropdownOpen,
  onRoleDropdownToggle,
  showFilters
}) => {
  const roles = ['All Roles', 'Kisani Didi', 'Farm Manager', 'Operator'];
  const statuses = ['All Status', 'Pending', 'Present', 'Absent'];
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState({
    selectedRole: filters.selectedRole,
    selectedStatus: filters.selectedStatus || 'All Status'
  });

  // Check if there are active filters (red dot indicator)
  const hasActiveFilters = filters.selectedRole !== 'All Roles' || 
                          filters.selectedStatus !== 'All Status' || 
                          filters.selectedDate !== '';

  const handleFilterDropdownToggle = () => {
    if (!isFilterDropdownOpen) {
      // When opening, set temp filters to current values
      setTempFilters({
        selectedRole: filters.selectedRole,
        selectedStatus: filters.selectedStatus || 'All Status'
      });
    }
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const handleApplyFilters = () => {
    onFiltersChange({
      selectedRole: tempFilters.selectedRole,
      selectedStatus: tempFilters.selectedStatus
    });
    setIsFilterDropdownOpen(false);
  };

  const handleResetFilters = () => {
    setTempFilters({
      selectedRole: 'All Roles',
      selectedStatus: 'All Status'
    });
  };

  if (!showFilters) return null;

  return (
    <div className="flex items-center gap-4">
      {/* Search Input */}
      <div className="relative w-[400px]">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search by name or member ID..."
          value={filters.searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) => 
            onFiltersChange({ searchTerm: e.target.value })
          }
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          style={{ fontFamily: 'Roboto', fontSize: '14px' }}
        />
      </div>

      {/* Date Filter - Calendar Icon */}
      <div className="relative">
        <DatePicker
          selected={filters.selectedDate ? new Date(filters.selectedDate) : null}
          onChange={(date) => {
            if (date) {
              onFiltersChange({ selectedDate: date.toISOString().split('T')[0] });
            } else {
              onFiltersChange({ selectedDate: '' });
            }
          }}
          customInput={
            <button
              className="flex items-center justify-center w-10 h-10  rounded-lg hover:bg-gray-50 relative"
            >
              <Calendar className="w-5 h-5 text-black-900" />
              {filters.selectedDate && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onFiltersChange({ selectedDate: '' });
                  }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                  title="Clear date"
                >
                  ×
                </button>
              )}
            </button>
          }
          dateFormat="yyyy-MM-dd"
          showPopperArrow={false}
          popperPlacement="bottom-end"
          popperClassName="react-datepicker-popper"
          calendarClassName="react-datepicker-calendar"
          wrapperClassName="date-picker-wrapper"
        />
      </div>

      {/* Role & Status Filter - Using CustomFilter */}
      <CustomFilter
        isOpen={isFilterDropdownOpen}
        onToggle={handleFilterDropdownToggle}
        hasActiveFilters={hasActiveFilters}
        onClose={() => setIsFilterDropdownOpen(false)}
        title="Filter by"
        height="h-[300px]"
      >
        {/* Role Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto' }}>
            Role
          </label>
          <CustomFilterSelect
            value={tempFilters.selectedRole}
            onChange={(value) => setTempFilters(prev => ({ ...prev, selectedRole: value }))}
            options={roles.map(role => ({ value: role, label: role }))}
            placeholder="Select Role"
          />
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto' }}>
            Status
          </label>
          <CustomFilterSelect
            value={tempFilters.selectedStatus}
            onChange={(value) => setTempFilters(prev => ({ ...prev, selectedStatus: value }))}
            options={statuses.map(status => ({ value: status, label: status }))}
            placeholder="Select Status"
          />
        </div>

        {/* Action Buttons */}
        <CustomFilterActions
          onReset={handleResetFilters}
          onApply={handleApplyFilters}
          isApplyDisabled={false}
          className="mt-6"
        />
      </CustomFilter>

    </div>
  );
};

export default AttendanceFilters;
