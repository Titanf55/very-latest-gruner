// ============================================================================
// TASK FORM COMPONENT
// ============================================================================

import React, { ChangeEvent, useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { FormData, User, DraftTask } from '../types';
// Location options are no longer used - simplified form structure
import Card from '../../ui/Card';
import { CustomSelect } from '../../ui';

interface TaskFormProps {
  editingTask: DraftTask | null;
  formData: FormData;
  setFormData: (data: FormData) => void;
  userSearchTerm: string;
  setUserSearchTerm: (term: string) => void;
  showUserDropdown: boolean;
  setShowUserDropdown: (show: boolean) => void;
  isSubmitting: boolean;
  getFilteredUsers: () => User[];
  userOptions: User[];
  handleUserSelection: (userId: number) => void;
  handleSelectAll: () => void;
  handleDeselectAll: () => void;
  handleUserTypeChange: (userType: string) => void;
  handleSaveToDraft: (appliedLocationFilters: any) => void;
  handleAssignTask: (appliedLocationFilters: any) => void;
  handleCancel: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  showTitle?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
  editingTask,
  formData,
  setFormData,
  userSearchTerm,
  setUserSearchTerm,
  showUserDropdown,
  setShowUserDropdown,
  isSubmitting,
  getFilteredUsers,
  userOptions,
  handleUserSelection,
  handleSelectAll,
  handleDeselectAll,
  handleUserTypeChange,
  handleSaveToDraft,
  handleAssignTask,
  handleCancel,
  dropdownRef,
  showTitle = true,
}) => {
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [locationFilters, setLocationFilters] = useState({
    stateId: '',
    districtId: '',
    mandalId: ''
  });
  const [appliedLocationFilters, setAppliedLocationFilters] = useState({
    stateId: '',
    districtId: '',
    mandalId: ''
  });

  // Mock location data (replace with actual data later)
  const states = [
    { id: '1', name: 'Karnataka' },
    { id: '2', name: 'Maharashtra' },
    { id: '3', name: 'Tamil Nadu' }
  ];
  const districts = [
    { id: '1', name: 'Bangalore' },
    { id: '2', name: 'Pune' },
    { id: '3', name: 'Chennai' }
  ];
  const mandals = [
    { id: '1', name: 'Mandya' },
    { id: '2', name: 'Shivaji Nagar' },
    { id: '3', name: 'T Nagar' }
  ];

  const handleLocationFilterChange = (filterType: string, value: string) => {
    setLocationFilters(prev => ({
      ...prev,
      [filterType]: value,
      // Reset dependent filters
      ...(filterType === 'stateId' && { districtId: '', mandalId: '' }),
      ...(filterType === 'districtId' && { mandalId: '' })
    }));
  };

  const handleResetLocationFilters = () => {
    setLocationFilters({
      stateId: '',
      districtId: '',
      mandalId: ''
    });
    setAppliedLocationFilters({
      stateId: '',
      districtId: '',
      mandalId: ''
    });
  };

  const handleApplyLocationFilters = () => {
    setAppliedLocationFilters(locationFilters);
    setShowFilterMenu(false);
  };

  const isApplyDisabled = Object.values(locationFilters).every(value => value === '');
  
  // Enhanced filtering that includes location filters
  const getLocationFilteredUsers = (): User[] => {
    let filtered = getFilteredUsers(); // Get users filtered by type and search
    
    // Apply location filters if they exist
    if (appliedLocationFilters.stateId) {
      filtered = filtered.filter((user) => user.stateId === appliedLocationFilters.stateId);
    }
    if (appliedLocationFilters.districtId) {
      filtered = filtered.filter((user) => user.districtId === appliedLocationFilters.districtId);
    }
    if (appliedLocationFilters.mandalId) {
      filtered = filtered.filter((user) => user.mandalId === appliedLocationFilters.mandalId);
    }
    
    return filtered;
  };
  
  return (
    <Card 
      title={showTitle ? (editingTask ? `Edit Task - ${editingTask.title}` : "Create New Task") : undefined}
      className="max-w-full"
    >
      {editingTask && (
        <p className="text-sm text-gray-600 mb-6" style={{ fontFamily: "Poppins" }}>
          Modify the task details below
        </p>
      )}
      
      <div className="space-y-5">
        {/* Select User Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select User Type</label>
          <div className="w-[535px]">
            <CustomSelect
              value={formData.userType}
              onChange={(value) => handleUserTypeChange(value)}
              options={[
                { value: "kisani-didi", label: "Kisani Didi" },
                { value: "operator", label: "Farm Operator" },
                { value: "farm-manager", label: "Farm Manager" },
              ]}
              placeholder="Select User Type"
            />
          </div>
        </div>

        {/* Search and Filter */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or Member ID"
                value={userSearchTerm}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setUserSearchTerm(e.target.value)}
                onFocus={() => {
                  if (formData.userType) {
                    setShowUserDropdown(true);
                  }
                }}
                disabled={!formData.userType}
                className={`w-[535px] h-12 px-4 py-3 bg-white border rounded-xl text-gray-900 transition-all duration-300 focus:ring-2 focus:ring-green-100 focus:border-green-400 focus:outline-none shadow-sm ${
                  !formData.userType ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                style={{ fontFamily: "Poppins", fontSize: "13px" }}
              />
            </div>

            {/* Filter Button */}
            <div className="relative">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className={`flex items-center justify-center w-12 h-12 border rounded-xl transition-colors ${
                  Object.values(appliedLocationFilters).some(value => value !== '') 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src="/filter.svg"
                  alt="Filter"
                  className="w-5 h-5"
                />
                {Object.values(appliedLocationFilters).some(value => value !== '') && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              {/* Filter Menu */}
              {showFilterMenu && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">Filter by Location</h3>
                      <button
                        onClick={() => setShowFilterMenu(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={19} />
                      </button>
                    </div>

                    <div className="space-y-4">
                      {/* State Filter */}
                      <div className="relative">
                        <select
                          value={locationFilters.stateId}
                          onChange={(e) => handleLocationFilterChange('stateId', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select State</option>
                          {states.map(state => (
                            <option key={state.id} value={state.id}>{state.name}</option>
                          ))}
                        </select>
                        <ChevronDown
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
                          size={20}
                        />
                      </div>

                      {/* District Filter */}
                      <div className="relative">
                        <select
                          value={locationFilters.districtId}
                          onChange={(e) => handleLocationFilterChange('districtId', e.target.value)}
                          disabled={!locationFilters.stateId}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                        >
                          <option value="">Select District</option>
                          {districts.map(district => (
                            <option key={district.id} value={district.id}>{district.name}</option>
                          ))}
                        </select>
                        <ChevronDown
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
                          size={20}
                        />
                      </div>

                      {/* Mandal Filter */}
                      <div className="relative">
                        <select
                          value={locationFilters.mandalId}
                          onChange={(e) => handleLocationFilterChange('mandalId', e.target.value)}
                          disabled={!locationFilters.districtId}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                        >
                          <option value="">Select Mandal</option>
                          {mandals.map(mandal => (
                            <option key={mandal.id} value={mandal.id}>{mandal.name}</option>
                          ))}
                        </select>
                        <ChevronDown
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
                          size={20}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3">
                      <button
                        onClick={handleResetLocationFilters}
                        className="flex-1 px-3 py-2 font-bold text-black bg-white border border-gray-300 rounded-md transition-colors"
                      >
                        Reset
                      </button>
                      <button
                        onClick={handleApplyLocationFilters}
                        disabled={isApplyDisabled}
                        className="flex-1 px-3 py-2 bg-[#D9D9D9] font-bold text-black border border-gray-300 rounded-md transition-colors disabled:opacity-50"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {showUserDropdown && formData.userType && (
            <div ref={dropdownRef} className="absolute z-50 w-[535px] mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
              <div className="px-3 py-2 text-xs text-gray-500 border-b bg-gray-50 flex justify-between items-center">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 w-4 h-4 text-blue-600"
                    checked={getLocationFilteredUsers().length > 0 && getLocationFilteredUsers().every(user => formData.selectedUsers.includes(user.id))}
                    ref={(el) => {
                      if (el) {
                        el.indeterminate = getLocationFilteredUsers().some(user => formData.selectedUsers.includes(user.id)) && !getLocationFilteredUsers().every(user => formData.selectedUsers.includes(user.id));
                      }
                    }}
                    onChange={() => {
                      const filteredUsers = getLocationFilteredUsers();
                      const allFilteredSelected = filteredUsers.every(user => formData.selectedUsers.includes(user.id));
                      if (allFilteredSelected) {
                        handleDeselectAll();
                      } else {
                        handleSelectAll();
                      }
                    }}
                  />
                  <span className="text-xs text-gray-500">Select All</span>
                </div>
                <span className="text-xs text-gray-500">Total Selected: {formData.selectedUsers.length}</span>
              </div>
              
              {/* Scrollable user list with max height and smooth scrolling */}
              <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ maxHeight: '300px' }}>
                {getLocationFilteredUsers().length === 0 ? (
                  <div className="px-3 py-2 text-sm text-gray-500">No users found</div>
                ) : (
                  <div>
                    {getLocationFilteredUsers().map((user, index) => (
                      <div 
                        key={user.id} 
                        className={`flex items-center justify-between px-3 py-2 hover:bg-gray-50 transition-colors duration-150 ${
                          index < getLocationFilteredUsers().length - 1 ? 'border-b border-gray-100' : ''
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2 w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            checked={formData.selectedUsers.includes(user.id)}
                            onChange={() => handleUserSelection(user.id)}
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.memberId}</p>
                          </div>
                        </div>
                        <div className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                          {(() => {
                            // Extract state name from stateId
                            const state = states.find(s => s.id === user.stateId);
                            return state ? state.name : 'Maharashtra';
                          })()}
                        </div>
                      </div>
                    ))}
                    {getLocationFilteredUsers().length > 10 && (
                      <div className="px-3 py-2 text-center text-gray-400 text-xs bg-gray-50">
                        {getLocationFilteredUsers().length} users available • Scroll for more
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="px-3 py-2 border-t border-gray-100 bg-gray-50 flex justify-start">
                <button
                  onClick={() => setShowUserDropdown(false)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition-colors"
                  style={{ fontFamily: "Poppins", fontSize: "13px" }}
                  type="button"
                >
                  Done
                </button>
              </div>
            </div>
          )}
          
          {/* Selected Users Display */}
          {formData.selectedUsers.length > 0 && (
            <div className="mt-3 relative">
              <div className="flex flex-wrap gap-2">
                {(() => {
                  const selectedUserNames = formData.selectedUsers
                    .map(userId => userOptions.find(user => user.id === userId))
                    .filter(user => user !== undefined)
                    .map(user => user!.name);
                  
                  if (selectedUserNames.length <= 2) {
                    // Show all names if 2 or fewer
                    return selectedUserNames.map((name, index) => (
                      <div key={index} className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm border">
                        {name}
                      </div>
                    ));
                  } else {
                    // Show first 2 names + count with hover
                    const displayItems = [];
                    displayItems.push(
                      <div key={0} className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm border">
                        {selectedUserNames[0]}
                      </div>
                    );
                    displayItems.push(
                      <div key={1} className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm border">
                        {selectedUserNames[1]}
                      </div>
                    );
                    displayItems.push(
                      <div 
                        key="more" 
                        className="relative inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm border cursor-pointer hover:bg-gray-200 transition-colors"
                        onMouseEnter={() => setShowAllUsers(true)}
                        onMouseLeave={() => setShowAllUsers(false)}
                      >
                        +{selectedUserNames.length - 2}
                        
                        {/* Hover Tooltip */}
                        {showAllUsers && (
                          <div className="absolute top-full left-0 mt-2 p-4 bg-white border border-gray-200 rounded-xl shadow-lg z-50 min-w-[300px]">
                            <div className="text-xs text-gray-500 mb-2">Selected Users ({selectedUserNames.length})</div>
                            <div className="grid grid-cols-2 gap-2">
                              {selectedUserNames.map((name, index) => (
                                <div key={index} className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm border">
                                  {name}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                    return displayItems;
                  }
                })()}
              </div>
            </div>
          )}
        </div>

        {/* Task Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
          <input
            type="text"
            value={formData.taskTitle}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, taskTitle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="Enter task title"
            style={{ fontFamily: "Poppins", fontSize: "13px" }}
          />
        </div>

        {/* Task Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            rows={3}
            value={formData.taskDescription}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, taskDescription: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
            placeholder="Enter task description"
            style={{ fontFamily: "Poppins", fontSize: "13px" }}
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, dueDate: e.target.value })}
            className="w-[280px] px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
            style={{ fontFamily: "Poppins", fontSize: "13px" }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
            style={{ fontFamily: "Poppins", fontSize: "13px" }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleSaveToDraft(appliedLocationFilters)}
            disabled={!formData.taskTitle || isSubmitting}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            style={{ fontFamily: "Poppins", fontSize: "13px" }}
          >
            {isSubmitting ? "Saving..." : "Save to Draft"}
          </button>
          <button
            type="button"
            onClick={() => handleAssignTask(appliedLocationFilters)}
            disabled={!formData.taskTitle || formData.selectedUsers.length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            style={{ fontFamily: "Poppins", fontSize: "13px" }}
          >
            Assign Task
          </button>
        </div>
      </div>
    </Card>
  );
};

export default TaskForm;
