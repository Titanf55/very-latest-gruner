// ============================================================================
// CREATE TASK PAGE COMPONENT
// ============================================================================

import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";


// Hooks
import { useTaskData } from './hooks/useTaskData';
import { useTaskForm } from './hooks/useTaskForm';

// Components
import TaskForm from './components/TaskForm';

// Utils
import { formatLocation, generateAssignedToLabel } from './utils';

const CreateTask: React.FC = () => {
  const navigate = useNavigate();
  
  // Refs
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ========== CUSTOM HOOKS ==========
  const taskData = useTaskData();
  const taskForm = useTaskForm(taskData.userOptions);

  // Location data for mapping IDs to names
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

  // ========== EVENT HANDLERS ==========
  const handleSaveToDraft = async (appliedLocationFilters: any) => {
    if (!taskForm.formData.taskTitle || taskForm.isSubmitting) return;
    
    taskForm.setIsSubmitting(true);

    try {
      const displayLabel = generateAssignedToLabel(taskForm.formData.userType, taskForm.formData.selectedUsers.length);

      const taskData_obj = {
        title: taskForm.formData.taskTitle,
        createdAt: new Date().toISOString(),
        status: "draft" as const,
        assignedToLabel: displayLabel,
        userType: taskForm.formData.userType,
        state: appliedLocationFilters?.stateId || "",
        district: appliedLocationFilters?.districtId || "",
        mandal: appliedLocationFilters?.mandalId || "",
        selectedUsers: taskForm.formData.selectedUsers,
        taskDescription: taskForm.formData.taskDescription,
        dueDate: taskForm.formData.dueDate,
      };

      await taskData.createDraftTask(taskData_obj);
      
      taskForm.resetForm();
      navigate('/tasks');
    } finally {
      taskForm.setIsSubmitting(false);
    }
  };

  const handleAssignTask = async (appliedLocationFilters: any) => {
    if (!taskForm.formData.taskTitle || taskForm.formData.selectedUsers.length === 0) return;

    const assignedToIds: string[] = [];
    const assignedToNames: string[] = [];
    
    taskForm.formData.selectedUsers.forEach((userId) => {
      const selectedUser = taskData.userOptions.find((user) => user.id === userId);
      if (selectedUser) {
        assignedToIds.push(selectedUser.memberId);
        assignedToNames.push(selectedUser.name);
      }
    });

    const newTask = {
      title: taskForm.formData.taskTitle,
      taskDescription: taskForm.formData.taskDescription,
      assignedTo: assignedToIds,
      assignedToNames: assignedToNames,
      userType: taskForm.formData.userType,
      stateName: appliedLocationFilters?.stateId ? 
        states.find(s => s.id === appliedLocationFilters.stateId)?.name || "Karnataka" : "Karnataka",
      districtName: appliedLocationFilters?.districtId ? 
        districts.find(d => d.id === appliedLocationFilters.districtId)?.name || "Bangalore" : "Bangalore",
      mandalName: appliedLocationFilters?.mandalId ? 
        mandals.find(m => m.id === appliedLocationFilters.mandalId)?.name || "Mandya" : "Mandya",
      assignedAt: new Date().toISOString(),
      status: "assigned" as const,
      assignedToLabel: generateAssignedToLabel(taskForm.formData.userType, assignedToIds.length),
      dueDate: taskForm.formData.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      taskStatus: "in-progress" as const,
    };
    
    await taskData.assignTask(newTask);
    
    taskForm.resetForm();
    navigate('/tasks');
  };

  const handleCancel = () => {
    taskForm.resetForm();
    navigate('/tasks');
  };

  // ========== EFFECTS ==========
  const handleOutsideClick = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      taskForm.setShowUserDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // ========== RENDER ==========
  return (
    <div className="space-y-6" style={{ fontFamily: "Poppins" }}>
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900">Create New Task</h1>

      {/* Create Task Form */}
      <TaskForm
        editingTask={null}
        formData={taskForm.formData}
        setFormData={taskForm.setFormData}
        userSearchTerm={taskForm.userSearchTerm}
        setUserSearchTerm={taskForm.setUserSearchTerm}
        showUserDropdown={taskForm.showUserDropdown}
        setShowUserDropdown={taskForm.setShowUserDropdown}
        isSubmitting={taskForm.isSubmitting}
        getFilteredUsers={taskForm.getFilteredUsers}
        userOptions={taskData.userOptions}
        handleUserSelection={taskForm.handleUserSelection}
        handleSelectAll={taskForm.handleSelectAll}
        handleDeselectAll={taskForm.handleDeselectAll}
        handleUserTypeChange={taskForm.handleUserTypeChange}
        handleSaveToDraft={handleSaveToDraft}
        handleAssignTask={handleAssignTask}
        handleCancel={handleCancel}
        dropdownRef={dropdownRef}
        showTitle={false}
      />
    </div>
  );
};

export default CreateTask;
