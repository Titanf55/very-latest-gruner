// ============================================================================
// TASK FORM HOOK
// ============================================================================

import { useState } from 'react';
import { FormData, User, DraftTask } from '../types';
import { getUserTypeDisplayName } from '../utils';

export const useTaskForm = (userOptions: User[]) => {
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [editingTask, setEditingTask] = useState<DraftTask | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    userType: "",
    state: "",
    district: "",
    mandal: "",
    selectedUsers: [],
    taskTitle: "",
    taskDescription: "",
    dueDate: "",
  });

  // Filter users based on selected type
  const getFilteredUsers = (): User[] => {
    let filtered = userOptions;
    if (formData.userType) {
      filtered = filtered.filter((user) => user.userType === formData.userType);
    }
    if (userSearchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
          user.memberId.toLowerCase().includes(userSearchTerm.toLowerCase())
      );
    }
    return filtered;
  };

  // Generate display text for selected users
  const getSelectedUsersDisplay = (): string => {
    if (!formData.userType) return "";
    const totalCount = userOptions.filter((user) => user.userType === formData.userType).length;
    const selectedCount = formData.selectedUsers.length;

    return selectedCount === totalCount && totalCount > 0
      ? `All ${getUserTypeDisplayName(formData.userType)} Selected (${totalCount})`
      : selectedCount > 0
      ? `${getUserTypeDisplayName(formData.userType)} Selected (${selectedCount}/${totalCount})`
      : `Select ${getUserTypeDisplayName(formData.userType)}`;
  };


  const handleUserSelection = (userId: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedUsers: prev.selectedUsers.includes(userId)
        ? prev.selectedUsers.filter((id) => id !== userId)
        : [...prev.selectedUsers, userId],
    }));
  };

  const handleSelectAll = () => {
    const filteredUserIds = getFilteredUsers().map((user) => user.id);
    setFormData((prev) => {
      // Add filtered users to existing selection (don't replace all)
      const newSelectedUsers = [...new Set([...prev.selectedUsers, ...filteredUserIds])];
      return {
        ...prev,
        selectedUsers: newSelectedUsers,
      };
    });
  };

  const handleDeselectAll = () => {
    const filteredUserIds = getFilteredUsers().map((user) => user.id);
    setFormData((prev) => ({
      ...prev,
      selectedUsers: prev.selectedUsers.filter(id => !filteredUserIds.includes(id)),
    }));
  };

  const handleUserTypeChange = (userType: string) => {
    setFormData((prev) => ({
      ...prev,
      userType,
      selectedUsers: [], // Start with no users selected
    }));
    // Users must manually select individuals through search
  };

  const resetForm = () => {
    setFormData({
      userType: "",
      state: "",
      district: "",
      mandal: "",
      selectedUsers: [],
      taskTitle: "",
      taskDescription: "",
      dueDate: "",
    });
    setUserSearchTerm("");
    setEditingTask(null);
  };

  const loadTaskForEditing = (task: DraftTask) => {
    setEditingTask(task);
    setFormData({
      userType: task.userType || "",
      state: task.state || "",
      district: task.district || "",
      mandal: task.mandal || "",
      selectedUsers: task.selectedUsers || [],
      taskTitle: task.title || "",
      taskDescription: task.taskDescription || "",
      dueDate: task.dueDate || "",
    });
    setUserSearchTerm("");
  };

  return {
    // State
    formData,
    setFormData,
    userSearchTerm,
    setUserSearchTerm,
    showUserDropdown,
    setShowUserDropdown,
    editingTask,
    setEditingTask,
    isSubmitting,
    setIsSubmitting,
    
    // Methods
    getFilteredUsers,
    getSelectedUsersDisplay,
    handleUserSelection,
    handleSelectAll,
    handleDeselectAll,
    handleUserTypeChange,
    resetForm,
    loadTaskForEditing,
  };
};
