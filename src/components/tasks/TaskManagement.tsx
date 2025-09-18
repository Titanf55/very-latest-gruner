// ============================================================================
// TASK MANAGEMENT - MAIN COMPONENT (MODULAR VERSION)
// ============================================================================

import React, { useState, useEffect, ChangeEvent } from "react";
import { Search, X, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Types
import { Task, DraftTask, TaskDetails } from './types';

// Hooks
import { useTaskData } from './hooks/useTaskData';
import { useTaskFilters } from './hooks/useTaskFilters';

// Components
import TaskFilter from './components/TaskFilter';
import TaskTable from './components/TaskTable';
import CustomPagination from '../ui/CustomPagination';
import Card from '../ui/Card';

// Utils
import { formatLocation, generateAssignedToLabel } from './utils';

const TaskManagement: React.FC = () => {
  // ========== NAVIGATION ==========
  const navigate = useNavigate();
  
  // ========== CORE STATE ==========
  const [activeTab, setActiveTab] = useState<"draft" | "assigned">("draft");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState<TaskDetails | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] = useState<"delete" | "assign" | null>(null);
  const [confirmationTask, setConfirmationTask] = useState<DraftTask | null>(null);
  

  // ========== CUSTOM HOOKS ==========
  const taskData = useTaskData();
  const taskFilters = useTaskFilters();

  // ========== DATA PROCESSING ==========
  const getCurrentData = (): Task[] => {
    // API handles pagination, so just return the current data
    return activeTab === "assigned" ? taskData.assignedTasks : taskData.draftTasks;
  };

  // ========== EVENT HANDLERS ==========
  const handleTabChange = (tab: "draft" | "assigned") => {
    setActiveTab(tab);
    setSearchTerm("");
    
    // Reset pagination when changing tabs
    if (tab === "draft") {
      taskData.setDraftCurrentPage(1);
    } else if (tab === "assigned") {
      taskData.setAssignedCurrentPage(1);
    }
    // Data will be fetched automatically by useEffect
  };

  // HANDLE TASK CLICKS - Different behavior for draft vs assigned
  const handleTaskClick = async (task: Task) => {
    if (activeTab === "draft") {
      // DRAFT TASKS: Open form with prefilled data
      const taskDetails = await taskData.fetchTaskDetails(task.id);
      if (taskDetails) {
        // Navigate to edit page
        navigate(`/tasks/edit/${task.id}`);
      }
    } else {
      // ASSIGNED TASKS: Open modal with detailed information
      const taskDetails = await taskData.fetchTaskDetails(task.id);
      if (taskDetails) {
        setSelectedTask(taskDetails);
      }
    }
  };

  const handleEditTask = (task: DraftTask) => {
    // For action menu edit - same as task click for drafts
    handleTaskClick(task);
  };

  const handleDeleteTask = async (taskId: string) => {
    await taskData.deleteDraftTask(taskId);
  };

  const handleAssignFromMenu = async (task: DraftTask) => {
    if (task.selectedUsers && task.selectedUsers.length > 0) {
      const assignedToIds: string[] = [];
      const assignedToNames: string[] = [];
      
      task.selectedUsers.forEach((userId) => {
        const selectedUser = taskData.userOptions.find((user) => user.id === userId);
        if (selectedUser) {
          assignedToIds.push(selectedUser.memberId);
          assignedToNames.push(selectedUser.name);
        }
      });

      const newTask = {
          title: task.title,
          taskDescription: task.taskDescription || "",
        assignedTo: assignedToIds,
        assignedToNames: assignedToNames,
          userType: task.userType,
          stateName: formatLocation(task.state || "Karnataka"),
          districtName: formatLocation(task.district || "Bangalore"),
          mandalName: formatLocation(task.mandal || "Mandya"),
          assignedAt: new Date().toISOString(),
        status: "assigned" as const,
        assignedToLabel: generateAssignedToLabel(task.userType || "", assignedToIds.length),
          dueDate: task.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          taskStatus: "in-progress" as const,
        };
      
      await taskData.assignFromDraft(task.id, newTask);
    }
  };


  const handleCreateTask = () => {
    navigate('/tasks/create');
  };

  // ========== EFFECTS ==========


  // Initial data loading handled by useEffect below

  // Reset pagination when search term changes
  useEffect(() => {
    if (activeTab === "draft") {
      taskData.setDraftCurrentPage(1);
    } else if (activeTab === "assigned") {
      taskData.setAssignedCurrentPage(1);
    }
  }, [searchTerm]);

  // Data fetching based on current tab and filters
  useEffect(() => {
    if (activeTab === "draft") {
      taskData.fetchDraftTasks(searchTerm, taskData.draftCurrentPage, taskData.itemsPerPage, taskFilters.appliedFilters);
    } else if (activeTab === "assigned") {
      taskData.fetchAssignedTasks(searchTerm, taskFilters.appliedFilters, taskData.assignedCurrentPage, taskData.itemsPerPage);
    }
  }, [searchTerm, taskFilters.appliedFilters, activeTab, taskData.draftCurrentPage, taskData.assignedCurrentPage]);

  // ========== RENDER ==========
  return (
    <div className="space-y-6" style={{ fontFamily: "Poppins" }}>
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>

      {/* Tabs and Create Button */}
      <div className="flex items-center justify-between">
        <Card variant="tab" className="w-fit">
          <div className="flex space-x-1">
            {["draft", "assigned"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab as "draft" | "assigned")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                style={{ fontFamily: "Poppins", fontSize: "13.02px" }}
              >
                {tab === "draft" ? "Draft Tasks" : "Assigned Tasks"}
              </button>
            ))}
          </div>
        </Card>
        
        {/* Create Task Button */}
        <button
          onClick={handleCreateTask}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          style={{ fontFamily: "Poppins", fontSize: "13.02px" }}
        >
          <Plus size={16} />
          Create Task
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={`Search ${activeTab === "draft" ? "Draft" : "Assigned"} Tasks`}
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{ fontFamily: "Poppins", fontSize: "14px" }}
          />
          </div>
          
          {/* Filter - Show for both draft and assigned tasks */}
          <TaskFilter
            showFilter={taskFilters.showFilter}
            setShowFilter={taskFilters.setShowFilter}
            filters={taskFilters.filters}
            hasActiveFilters={taskFilters.hasActiveFilters}
            handleFilterChange={taskFilters.handleFilterChange}
            handleResetFilters={taskFilters.handleResetFilters}
            handleApplyFilters={taskFilters.handleApplyFilters}
            isApplyDisabled={taskFilters.isApplyDisabled}
            resetPagination={() => activeTab === "assigned" ? taskData.setAssignedCurrentPage(1) : taskData.setDraftCurrentPage(1)}
            assignedToOptions={taskData.assignedToOptions}
          />
        </div>

      {/* Task Table */}
      <TaskTable
        activeTab={activeTab}
        tasks={getCurrentData()}
        handleTaskClick={handleTaskClick}
        handleEditTask={handleEditTask}
      />
      
      {/* Pagination */}
      {(() => {
        const currentPage = activeTab === "assigned" ? taskData.assignedCurrentPage : taskData.draftCurrentPage;
        const setCurrentPage = activeTab === "assigned" ? taskData.setAssignedCurrentPage : taskData.setDraftCurrentPage;
        const totalPages = activeTab === "assigned" ? taskData.assignedTotalPages : taskData.draftTotalPages;
        const total = activeTab === "assigned" ? taskData.assignedTotal : taskData.draftTotal;
        
        // Calculate display indices
        const limit = taskData.itemsPerPage;
        const startIndex = total > 0 ? (currentPage - 1) * limit + 1 : 0;
        const endIndex = Math.min(currentPage * limit, total);
        
        return total > 0 ? (
          <div className="mt-6">
            <CustomPagination
              currentPage={currentPage}
              totalPagesState={totalPages}
              setCurrentPage={setCurrentPage}
              startIndex={startIndex}
              endIndex={endIndex}
              totalEntries={total}
            />
          </div>
        ) : null;
      })()}

      {/* Modal for Task Details */}
      {selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 border border-gray-200 relative max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedTask(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold text-center mb-4">Task Detail</h2>
            <div className="space-y-4">
              {/* Assigned To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {selectedTask.status === "draft" ? "User Type" : "Assigned To"}
                </label>
                <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm min-h-[40px] flex items-center justify-center">
                  <div className="inline-flex items-center px-3 py-1 border border-gray-400 rounded-md bg-white min-w-[160px] justify-center">
                    <span className="text-sm font-medium text-gray-800" style={{ fontFamily: "Poppins", fontSize: "13px", fontWeight: 500 }}>
                      {selectedTask.assignedToLabel || "Not assigned"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Location - Show for both draft and assigned tasks */}
              <div className="flex gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    readOnly
                    value={selectedTask.stateName || "-"}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                    style={{ fontFamily: "Poppins", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                  <input
                    readOnly
                    value={selectedTask.districtName || "-"}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                    style={{ fontFamily: "Poppins", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mandal</label>
                    <input
                      readOnly
                    value={selectedTask.mandalName || "-"}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                      style={{ fontFamily: "Poppins", fontSize: "13px" }}
                    />
                  </div>
              </div>

              {/* Task Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                <input
                  readOnly
                  value={selectedTask.title}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                  style={{ fontFamily: "Poppins", fontSize: "13px" }}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  readOnly
                  rows={4}
                  value={selectedTask.description || "No description"}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none text-sm"
                  style={{ fontFamily: "Poppins", fontSize: "13px" }}
                />
              </div>

              {/* Dates and Assignment Info */}
              <div className="flex gap-4">
                <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  readOnly
                    value={selectedTask.dueDate ? new Date(selectedTask.dueDate).toLocaleDateString() : "No due date"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                    style={{ fontFamily: "Poppins", fontSize: "13px" }}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {selectedTask.status === "draft" ? "Created Date" : "Assigned Date"}
                  </label>
                  <input
                    readOnly
                    value={selectedTask.status === "draft" 
                      ? new Date(selectedTask.createdAt).toLocaleDateString()
                      : selectedTask.assignedAt 
                        ? new Date(selectedTask.assignedAt).toLocaleDateString()
                        : "-"
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                  style={{ fontFamily: "Poppins", fontSize: "13px" }}
                />
                </div>
              </div>

              {/* Assignment Count - Show for both draft and assigned */}
              {selectedTask.assignedCount && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {selectedTask.status === "draft" ? "Will be assigned to" : "Assigned to"}
                  </label>
                  <input
                    readOnly
                    value={`${selectedTask.assignedCount} ${selectedTask.assignedToLabel.toLowerCase()}${selectedTask.assignedCount > 1 ? 's' : ''}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                    style={{ fontFamily: "Poppins", fontSize: "13px" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-80 relative">
            <button onClick={() => setShowConfirmation(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold text-center mb-4">{confirmationType === "delete" ? "Delete task" : "Assign task"}</h2>
            <p className="text-center mb-6">Are you sure you want to {confirmationType === "delete" ? "delete" : "assign"} this task?</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setShowConfirmation(false)} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                No
              </button>
              <button
                onClick={() => {
                  if (confirmationType === "delete") {
                    handleDeleteTask(confirmationTask!.id);
                  } else {
                    handleAssignFromMenu(confirmationTask!);
                  }
                  setShowConfirmation(false);
                  setConfirmationType(null);
                  setConfirmationTask(null);
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;