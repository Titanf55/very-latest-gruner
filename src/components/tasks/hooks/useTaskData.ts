// ============================================================================
// TASK DATA HOOK - PURE MOCK DATA IMPLEMENTATION
// ============================================================================

import { useState } from 'react';
import { DraftTask, AssignedTask, FilterState, DraftTasksResponse, AssignedTasksResponse, TaskDetails } from '../types';
import { 
  MOCK_DRAFT_TASKS, 
  MOCK_ASSIGNED_TASKS, 
  MOCK_USER_OPTIONS,
  MOCK_ASSIGNED_TO_OPTIONS,
  MOCK_TASK_DETAILS
} from '../mockData';
// API integration removed - working with mock data only

export const useTaskData = () => {
  // ========== MOCK DATA STATE ==========
  const [draftTasks, setDraftTasks] = useState<DraftTask[]>(MOCK_DRAFT_TASKS);
  const [assignedTasks, setAssignedTasks] = useState<AssignedTask[]>(MOCK_ASSIGNED_TASKS);
  const userOptions = MOCK_USER_OPTIONS;
  const assignedToOptions = MOCK_ASSIGNED_TO_OPTIONS;

  // ========== PAGINATION STATE ==========
  const [draftCurrentPage, setDraftCurrentPage] = useState(1);
  const [assignedCurrentPage, setAssignedCurrentPage] = useState(1);
  const [draftTotalPages, setDraftTotalPages] = useState(1);
  const [assignedTotalPages, setAssignedTotalPages] = useState(1);
  const [draftTotal, setDraftTotal] = useState(0);
  const [assignedTotal, setAssignedTotal] = useState(0);
  const itemsPerPage = 10;
  
  // Working with mock data only - no API integration

  // ========== DATA OPERATIONS ==========
  
  // Fetch draft tasks with mock data
  const fetchDraftTasks = async (searchTerm?: string, page?: number, limit?: number, filters?: FilterState) => {
    try {
      // Use current draft tasks state (includes newly created tasks) + mock data
      let allDraftTasks = [...draftTasks];
      // Add mock tasks that aren't already in the state
      MOCK_DRAFT_TASKS.forEach(mockTask => {
        if (!allDraftTasks.find(task => task.id === mockTask.id)) {
          allDraftTasks.push(mockTask);
        }
      });
      
      let filteredTasks = allDraftTasks;
      
      // Apply search filter
      if (searchTerm) {
        filteredTasks = filteredTasks.filter(task => 
          task.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Apply filters
      if (filters) {
        if (filters.assignedTo) {
          // Map frontend filter values to display labels
          const filterMap: { [key: string]: string } = {
            "farm-manager": "Farm Manager",
            "kisani-didi": "Kisani Didi",
            "operator": "Farm Operator"
          };
          const targetLabel = filterMap[filters.assignedTo];
          if (targetLabel) {
            filteredTasks = filteredTasks.filter(task => task.assignedToLabel.startsWith(targetLabel));
          }
        }
      }
      
      // Calculate pagination
      const currentPage = page || 1;
      const pageSize = limit || itemsPerPage;
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedTasks = filteredTasks.slice(startIndex, endIndex);
      
      // Create response structure
      const response: DraftTasksResponse = {
        data: paginatedTasks,
        page: currentPage,
        limit: pageSize,
        total: filteredTasks.length,
        totalPages: Math.ceil(filteredTasks.length / pageSize),
        hasPrevious: currentPage > 1,
        hasNext: currentPage < Math.ceil(filteredTasks.length / pageSize)
      };
      
      setDraftTasks(response.data);
      setDraftTotalPages(response.totalPages);
      setDraftTotal(response.total);
    } catch (error) {
      console.error('Error fetching draft tasks:', error);
    }
  };

  // Fetch assigned tasks with filtering and pagination
  const fetchAssignedTasks = async (searchTerm?: string, filters?: FilterState, page?: number, limit?: number) => {
    try {
      // Use current assigned tasks state (includes newly created tasks) + mock data
      let allAssignedTasks = [...assignedTasks];
      // Add mock tasks that aren't already in the state
      MOCK_ASSIGNED_TASKS.forEach(mockTask => {
        if (!allAssignedTasks.find(task => task.id === mockTask.id)) {
          allAssignedTasks.push(mockTask);
        }
      });
      
      let filteredTasks = allAssignedTasks;
      
      // Apply search filter
      if (searchTerm) {
        filteredTasks = filteredTasks.filter(task => 
          task.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Apply filters
      if (filters) {
        if (filters.assignedTo) {
          // Map frontend filter values to display labels
          const filterMap: { [key: string]: string } = {
            "farm-manager": "Farm Manager",
            "kisani-didi": "Kisani Didi",
            "operator": "Farm Operator"
          };
          const targetLabel = filterMap[filters.assignedTo];
          if (targetLabel) {
            filteredTasks = filteredTasks.filter(task => task.assignedToLabel.startsWith(targetLabel));
          }
        }
      }
      
      // Calculate pagination
      const currentPage = page || 1;
      const pageSize = limit || itemsPerPage;
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedTasks = filteredTasks.slice(startIndex, endIndex);
      
      // Create response structure
      const response: AssignedTasksResponse = {
        data: paginatedTasks,
        page: currentPage,
        limit: pageSize,
        total: filteredTasks.length,
        totalPages: Math.ceil(filteredTasks.length / pageSize),
        hasPrevious: currentPage > 1,
        hasNext: currentPage < Math.ceil(filteredTasks.length / pageSize)
      };
      
      setAssignedTasks(response.data);
      setAssignedTotalPages(response.totalPages);
      setAssignedTotal(response.total);
    } catch (error) {
      console.error('Error fetching assigned tasks:', error);
    }
  };

  // Filter options are static mock data
  const fetchFilterOptions = async () => {
    console.log('Filter options loaded from mock data');
  };

  // User options are static mock data
  const fetchUserOptions = async (userType: string) => {
    console.log('User options loaded from mock data for userType:', userType);
  };

  // Fetch task details for modal display and form pre-population
  const fetchTaskDetails = async (taskId: string): Promise<TaskDetails | null> => {
    try {
      const taskDetails = MOCK_TASK_DETAILS[taskId];
      if (!taskDetails) {
        console.error('Task not found in mock data:', taskId);
        return null;
      }
      
      return taskDetails;
    } catch (error) {
      console.error('Error fetching task details:', error);
      return null;
    }
  };

  // Create new draft task
  const createDraftTask = async (task: Omit<DraftTask, 'id'>) => {
    const newTask: DraftTask = {
      ...task,
      id: `draft-${Date.now()}`, // Generate unique string ID
    };
    setDraftTasks(prev => [...prev, newTask]);
    return newTask;
  };

  // Update existing draft task
  const updateDraftTask = async (id: string, task: Partial<DraftTask>) => {
    setDraftTasks(prev => prev.map(t => t.id === id ? { ...t, ...task } : t));
  };

  // Delete draft task
  const deleteDraftTask = async (id: string) => {
    setDraftTasks(prev => prev.filter(t => t.id !== id));
  };

  // Create new assigned task
  const assignTask = async (task: Omit<AssignedTask, 'id'>) => {
    const newTask: AssignedTask = {
      ...task,
      id: `assigned-${Date.now()}`, // Generate unique string ID
    };
    setAssignedTasks(prev => [...prev, newTask]);
    return newTask;
  };

  // Convert draft task to assigned task
  const assignFromDraft = async (draftId: string, assignedTask: Omit<AssignedTask, 'id'>) => {
    const newTask: AssignedTask = {
      ...assignedTask,
      id: `assigned-${Date.now()}`, // Generate unique string ID
    };
    setAssignedTasks(prev => [...prev, newTask]);
    setDraftTasks(prev => prev.filter(t => t.id !== draftId));
    return newTask;
  };

  // ========== PAGINATION HELPERS ==========
  const getPaginationData = (tasks: any[], currentPage: number) => {
    const totalEntries = tasks.length;
    const totalPages = Math.ceil(totalEntries / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, totalEntries);
    
    return {
      totalEntries,
      totalPages,
      startIndex: totalEntries > 0 ? startIndex : 0,
      endIndex: totalEntries > 0 ? endIndex : 0,
    };
  };

  const getPaginatedTasks = (tasks: any[], currentPage: number) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return tasks.slice(startIndex, endIndex);
  };

  return {
    // Data
    draftTasks,
    assignedTasks,
    userOptions,
    assignedToOptions,
    
    // Pagination
    draftCurrentPage,
    setDraftCurrentPage,
    assignedCurrentPage,
    setAssignedCurrentPage,
    draftTotalPages,
    assignedTotalPages,
    draftTotal,
    assignedTotal,
    itemsPerPage,
    getPaginationData,
    getPaginatedTasks,
    
    // Data Methods
    fetchDraftTasks,
    fetchAssignedTasks,
    fetchTaskDetails,
    fetchFilterOptions,
    fetchUserOptions,
    createDraftTask,
    updateDraftTask,
    deleteDraftTask,
    assignTask,
    assignFromDraft,
  };
};
