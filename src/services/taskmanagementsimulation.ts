// task-service.ts
import axios from "axios";

// Defines the expected structure for a single task object.
export interface Task {
  id: string  | number;
  title: string;
  description: string;
  status: "DRAFT" | "ASSIGNED";
  assigneeUserType: string;
  assigneeId: string;
  assigneeName?: string;
  stateId: string;
  districtId: string;
  mandalId: string;
  dueDate: string | null;
  assignedAt: string | null;
  createdAt: string;
  updatedAt: string;
  location:string;
  assignedDate:string;
}

// Defines the structure for an assignee object (for search assignees endpoint).
export interface Assignee {
  id: string;
  name: string;
  memberId: string;
  role: "FARM_MANAGER" | "KISANI_DIDI" | "OPERATOR";
  stateId: string;
  districtId: string;
  mandalId: string;
}

// Defines the structure of the data part of the task list API response.
export interface TaskListResponse {
  data: Task[];
}

// Defines the structure of the data part of the assignee search API response.
export interface AssigneeListResponse {
  data: Assignee[];
}

// Defines the structure of the create task request body.
export interface CreateTaskRequest {
  title: string;
  description: string;
  status: "DRAFT" | "ASSIGNED";
  userType: "fm" | "kd" | "operator" | "ifm" | "ikd" | "ioperator";
  assigneeIds?: string[];
  stateId: string;
  districtId: string;
  mandalId: string;
  dueDate?: string;
}

// Defines the structure of the update task request body.
export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: "DRAFT" | "ASSIGNED";
  stateId?: string;
  districtId?: string;
  mandalId?: string;
  dueDate?: string;
}

// Creates a pre-configured Axios instance for the task management API.
const api = axios.create({
  baseURL: "http://172.50.5.102:3000/api/v1/tm", // Adjust baseURL as needed
  headers: { "Content-Type": "application/json" },
});

// Sample assignees data
const sampleAssignees: Assignee[] = [
  { id: "user-1", name: "Rajesh Kumar", memberId: "FM001", role: "FARM_MANAGER", stateId: "state-1", districtId: "district-1", mandalId: "mandal-1" },
  { id: "user-2", name: "Suneetha R", memberId: "KD001", role: "KISANI_DIDI", stateId: "state-1", districtId: "district-1", mandalId: "mandal-1" },
  { id: "user-3", name: "Mohan Singh", memberId: "OP001", role: "OPERATOR", stateId: "state-1", districtId: "district-1", mandalId: "mandal-1" },
  { id: "user-4", name: "Priya T", memberId: "FM002", role: "FARM_MANAGER", stateId: "state-1", districtId: "district-2", mandalId: "mandal-3" },
  { id: "user-5", name: "Lakshmi M", memberId: "KD002", role: "KISANI_DIDI", stateId: "state-2", districtId: "district-3", mandalId: "mandal-4" },
  { id: "user-6", name: "Ravi S", memberId: "IFM001", role: "FARM_MANAGER", stateId: "state-1", districtId: "district-1", mandalId: "mandal-1" },
  { id: "user-7", name: "Geeta P", memberId: "IKD001", role: "KISANI_DIDI", stateId: "state-1", districtId: "district-1", mandalId: "mandal-1" },
  { id: "user-8", name: "Anil K", memberId: "IOP001", role: "OPERATOR", stateId: "state-1", districtId: "district-1", mandalId: "mandal-1" },
];

// Sample tasks data
let sampleTasks: Task[] = [
  {
    id: "task-1",
    title: "Wheat Harvesting",
    description: "Harvest wheat in field A-12 before monsoon",
    status: "DRAFT",
    assigneeUserType: "fm",
    assigneeId: "user-1",
    assigneeName: "Rajesh Kumar",
    stateId: "state-1",
    districtId: "district-1",
    mandalId: "mandal-1",
    dueDate: "2023-12-15T00:00:00.000Z",
    assignedAt: null,
    createdAt: "2023-11-01T10:30:00.000Z",
    updatedAt: "2023-11-01T10:30:00.000Z"
  },
  {
    id: "task-2",
    title: "Soil Testing",
    description: "Test soil pH levels in the northern fields",
    status: "ASSIGNED",
    assigneeUserType: "kd",
    assigneeId: "user-2",
    assigneeName: "Suneetha R",
    stateId: "state-1",
    districtId: "district-1",
    mandalId: "mandal-1",
    dueDate: "2023-11-30T00:00:00.000Z",
    assignedAt: "2023-11-05T14:20:00.000Z",
    createdAt: "2023-11-01T11:15:00.000Z",
    updatedAt: "2023-11-05T14:20:00.000Z"
  },
  {
    id: "task-3",
    title: "Irrigation System Check",
    description: "Inspect and repair irrigation system in field B-7",
    status: "ASSIGNED",
    assigneeUserType: "operator",
    assigneeId: "user-3",
    assigneeName: "Mohan Singh",
    stateId: "state-1",
    districtId: "district-1",
    mandalId: "mandal-1",
    dueDate: "2023-11-20T00:00:00.000Z",
    assignedAt: "2023-11-02T09:45:00.000Z",
    createdAt: "2023-11-02T09:30:00.000Z",
    updatedAt: "2023-11-02T09:45:00.000Z"
  }
];

// Set to true to use mock data, false to use real API (when available)
const USE_MOCK_DATA = true;

// Simulate network delay in milliseconds
const NETWORK_DELAY = 500;

// Simulate network delay
const simulateNetworkDelay = () => 
  new Promise(resolve => setTimeout(resolve, NETWORK_DELAY));

// Generate a unique ID
const generateId = () => 
  `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Filter assignees based on parameters
const filterAssignees = (
  assignees: Assignee[],
  searchTerm?: string,
  userType?: string,
  stateId?: string,
  districtId?: string,
  mandalId?: string
): Assignee[] => {
  return assignees.filter(assignee => {
    if (searchTerm && 
        !assignee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !assignee.memberId.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    if (userType) {
      // Map userType to role
      const roleMap: Record<string, string> = {
        'fm': 'FARM_MANAGER',
        'kd': 'KISANI_DIDI',
        'operator': 'OPERATOR',
        'ifm': 'FARM_MANAGER',
        'ikd': 'KISANI_DIDI',
        'ioperator': 'OPERATOR'
      };
      
      if (assignee.role !== roleMap[userType]) return false;
      
      // Additional filtering for internal users
      if (userType.startsWith('i') && !assignee.memberId.startsWith('I')) return false;
      if (!userType.startsWith('i') && assignee.memberId.startsWith('I')) return false;
    }
    
    if (stateId && assignee.stateId !== stateId) return false;
    if (districtId && assignee.districtId !== districtId) return false;
    if (mandalId && assignee.mandalId !== mandalId) return false;
    
    return true;
  });
};

// Validate create task request
const validateCreateTaskRequest = (taskData: CreateTaskRequest): string | null => {
  // Check if assigneeIds are required for individual user types
  const individualUserTypes = ["ifm", "ikd", "ioperator"];
  if (individualUserTypes.includes(taskData.userType) && 
      (!taskData.assigneeIds || taskData.assigneeIds.length === 0)) {
    return "assigneeIds are required for individual userType";
  }
  
  // Check if assigneeIds are provided for non-individual user types
  if (!individualUserTypes.includes(taskData.userType) && 
      taskData.assigneeIds && taskData.assigneeIds.length > 0) {
    return "assigneeIds should not be provided for collective user types";
  }
  
  // Validate assigneeIds if provided
  if (taskData.assigneeIds && taskData.assigneeIds.length > 0) {
    for (const assigneeId of taskData.assigneeIds) {
      const assignee = sampleAssignees.find(a => a.id === assigneeId);
      if (!assignee) {
        return `Invalid assigneeId ${assigneeId} for userType ${taskData.userType}`;
      }
      
      // Check if assignee role matches userType
      const roleMap: Record<string, string> = {
        'fm': 'FARM_MANAGER',
        'kd': 'KISANI_DIDI',
        'operator': 'OPERATOR',
        'ifm': 'FARM_MANAGER',
        'ikd': 'KISANI_DIDI',
        'ioperator': 'OPERATOR'
      };
      
      if (assignee.role !== roleMap[taskData.userType]) {
        return `Invalid assigneeId ${assigneeId} for userType ${taskData.userType}`;
      }
    }
  }
  
  return null;
};

export const taskManagementService = {
  /**
   * Fetches a list of draft tasks from the API.
   * @param token - The authentication token.
   * @returns An object with success status and either the data or an error message.
   */
  fetchDraftTasks: async (token: string) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();
        const draftTasks = sampleTasks.filter(task => task.status === "DRAFT");
        return { success: true, data: draftTasks };
      } else {
        const response = await api.get<Task[]>("/tasks/drafts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        return { success: true, data: response.data };
      }
    } catch (error: any) {
      console.error("Error fetching draft tasks:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch draft tasks. Please try again.",
        statusCode: error.response?.status || 500
      };
    }
  },

  /**
   * Fetches a list of assigned tasks from the API.
   * @param token - The authentication token.
   * @returns An object with success status and either the data or an error message.
   */
  fetchAssignedTasks: async (token: string) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();
        const assignedTasks = sampleTasks.filter(task => task.status === "ASSIGNED");
        return { success: true, data: assignedTasks };
      } else {
        const response = await api.get<Task[]>("/tasks/assigned", {
          headers: { Authorization: `Bearer ${token}` },
        });
        return { success: true, data: response.data };
      }
    } catch (error: any) {
      console.error("Error fetching assigned tasks:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch assigned tasks. Please try again.",
        statusCode: error.response?.status || 500
      };
    }
  },

  /**
   * Creates one or more tasks (draft or assigned).
   * @param taskData - The task creation data.
   * @param token - The authentication token.
   * @returns An object with success status and either the created tasks or an error message.
   */
  createTask: async (taskData: CreateTaskRequest, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();
        
        // Validate the request
        const validationError = validateCreateTaskRequest(taskData);
        if (validationError) {
          return {
            success: false,
            message: validationError,
            statusCode: 400
          };
        }
        
        // Find assignee details if assigneeIds are provided
        let assigneeName = "";
        if (taskData.assigneeIds && taskData.assigneeIds.length > 0) {
          const assignee = sampleAssignees.find(a => a.id === taskData.assigneeIds![0]);
          assigneeName = assignee ? assignee.name : "";
        }
        
        const newTask: Task = {
          id: generateId(),
          title: taskData.title,
          description: taskData.description,
          status: taskData.status,
          assigneeUserType: taskData.userType,
          assigneeId: taskData.assigneeIds && taskData.assigneeIds.length > 0 ? taskData.assigneeIds[0] : "",
          assigneeName: assigneeName,
          stateId: taskData.stateId,
          districtId: taskData.districtId,
          mandalId: taskData.mandalId,
          dueDate: taskData.dueDate || null,
          assignedAt: taskData.status === "ASSIGNED" ? new Date().toISOString() : null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        sampleTasks.push(newTask);
        return { success: true, data: [newTask] };
      } else {
        const response = await api.post<Task[]>("/tasks", taskData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return { success: true, data: response.data };
      }
    } catch (error: any) {
      console.error("Error creating task:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to create task.",
        statusCode: error.response?.status || 500
      };
    }
  },

  /**
   * Fetches details of a specific task by ID.
   * @param taskId - The ID of the task to fetch.
   * @param token - The authentication token.
   * @returns An object with success status and either the task data or an error message.
   */
  fetchTaskDetails: async (taskId: string, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();
        const task = sampleTasks.find(t => t.id === taskId);
        if (!task) {
          return {
            success: false,
            message: "Task not found",
            statusCode: 404
          };
        }
        return { success: true, data: task };
      } else {
        const response = await api.get<Task>(`/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return { success: true, data: response.data };
      }
    } catch (error: any) {
      console.error("Error fetching task details:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch task details.",
        statusCode: error.response?.status || 500
      };
    }
  },

  /**
   * Assigns a draft task to its designated assignee.
   * @param taskId - The ID of the task to assign.
   * @param token - The authentication token.
   * @returns An object with success status and either the updated task or an error message.
   */
  assignTask: async (taskId: string, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();
        const taskIndex = sampleTasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) {
          return {
            success: false,
            message: "Task not found",
            statusCode: 404
          };
        }
        
        const task = sampleTasks[taskIndex];
        
        // Check if task has an assignee
        if (!task.assigneeId) {
          return {
            success: false,
            message: "Task has no assignee set",
            statusCode: 400
          };
        }
        
        // Check if assignee is valid
        const assignee = sampleAssignees.find(a => a.id === task.assigneeId);
        if (!assignee) {
          return {
            success: false,
            message: "Invalid assignee for this draft task",
            statusCode: 400
          };
        }
        
        // Update task status
        sampleTasks[taskIndex].status = "ASSIGNED";
        sampleTasks[taskIndex].assignedAt = new Date().toISOString();
        sampleTasks[taskIndex].updatedAt = new Date().toISOString();
        
        return { success: true, data: sampleTasks[taskIndex] };
      } else {
        const response = await api.post<Task>(`/tasks/${taskId}/assign`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return { success: true, data: response.data };
      }
    } catch (error: any) {
      console.error("Error assigning task:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to assign task.",
        statusCode: error.response?.status || 500
      };
    }
  },

  /**
   * Updates a task's details.
   * @param taskId - The ID of the task to update.
   * @param taskData - The task update data.
   * @param token - The authentication token.
   * @returns An object with success status and either the updated task or an error message.
   */
  updateTask: async (taskId: string, taskData: UpdateTaskRequest, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();
        const taskIndex = sampleTasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) {
          return {
            success: false,
            message: "Task not found",
            statusCode: 404
          };
        }
        
        // Update task properties
        if (taskData.title !== undefined) sampleTasks[taskIndex].title = taskData.title;
        if (taskData.description !== undefined) sampleTasks[taskIndex].description = taskData.description;
        if (taskData.status !== undefined) sampleTasks[taskIndex].status = taskData.status;
        if (taskData.stateId !== undefined) sampleTasks[taskIndex].stateId = taskData.stateId;
        if (taskData.districtId !== undefined) sampleTasks[taskIndex].districtId = taskData.districtId;
        if (taskData.mandalId !== undefined) sampleTasks[taskIndex].mandalId = taskData.mandalId;
        if (taskData.dueDate !== undefined) sampleTasks[taskIndex].dueDate = taskData.dueDate;
        
        sampleTasks[taskIndex].updatedAt = new Date().toISOString();
        
        return { success: true, data: sampleTasks[taskIndex] };
      } else {
        const response = await api.put<Task>(`/tasks/${taskId}`, taskData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return { success: true, data: response.data };
      }
    } catch (error: any) {
      console.error("Error updating task:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update task.",
        statusCode: error.response?.status || 500
      };
    }
  },

  /**
   * Deletes a draft task by ID.
   * @param taskId - The ID of the task to delete.
   * @param token - The authentication token.
   * @returns An object with success status and an optional error message.
   */
  deleteTask: async (taskId: string, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();
        const taskIndex = sampleTasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) {
          return {
            success: false,
            message: "Task not found",
            statusCode: 404
          };
        }
        
        if (sampleTasks[taskIndex].status !== "DRAFT") {
          return {
            success: false,
            message: "Only draft tasks can be deleted",
            statusCode: 400
          };
        }
        
        sampleTasks.splice(taskIndex, 1);
        return { success: true, data: { success: true } };
      } else {
        const response = await api.delete(`/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return { success: true, data: response.data };
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to delete task.",
        statusCode: error.response?.status || 500
      };
    }
  },

  /**
   * Searches for assignees by name, memberId, or filters.
   * @param searchTerm - The search query string.
   * @param userType - Filter by user type (optional).
   * @param stateId - Filter by state ID (optional).
   * @param districtId - Filter by district ID (optional).
   * @param mandalId - Filter by mandal ID (optional).
   * @param token - The authentication token.
   * @returns An object with success status and either the assignee data or an error message.
   */
  searchAssignees: async (
    searchTerm: string,
    userType: string | undefined,
    stateId: string | undefined,
    districtId: string | undefined,
    mandalId: string | undefined,
    token: string
  ) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();
        
        const filteredAssignees = filterAssignees(
          sampleAssignees, 
          searchTerm, 
          userType, 
          stateId, 
          districtId, 
          mandalId
        );
        
        return { success: true, data: filteredAssignees };
      } else {
        const response = await api.get<Assignee[]>("/assignees/search", {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            q: searchTerm,
            userType,
            stateId,
            districtId,
            mandalId,
          },
        });
        return { success: true, data: response.data };
      }
    } catch (error: any) {
      console.error("Error searching assignees:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to search assignees.",
        statusCode: error.response?.status || 500
      };
    }
  },
};