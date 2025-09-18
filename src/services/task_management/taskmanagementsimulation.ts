import axios from "axios";
import { locationServiceMock } from "../location/locationservicesimulation";

// Defines the structure for a location object
interface Location {
  id: string;
  name: string;
  type: "state" | "district" | "city";
  parentId: string | null;
}

// Defines the expected structure for a single task object
export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: "DRAFT" | "ASSIGNED";
  assigneeUserType: string | null;
  assigneeId: string | null;
  assigneeName: string | null;
  stateId: string | null;
  districtId: string | null;
  mandalId: string | null;
  stateName: string | null;
  districtName: string | null;
  mandalName: string | null;
  dueDate: string | null;
  assignedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// Defines the structure for an assignee object
export interface Assignee {
  id: string;
  name: string;
  memberId: string;
  role: "FARM_MANAGER" | "KISANI_DIDI" | "OPERATOR";
  stateId: string;
  districtId: string;
  mandalId: string;
}

// Defines the structure of the task list API response
export type TaskListResponse = Task[];

// Defines the structure of the assignee search API response
export type AssigneeListResponse = Assignee[];

// Defines the structure of the create task request body
export interface CreateTaskRequest {
  title: string;
  description: string | null;
  status: "DRAFT" | "ASSIGNED";
  userType: "fm" | "kd" | "operator" | "ifm" | "ikd" | "ioperator";
  assigneeIds: string[] | null;
  stateId: string | null;
  districtId: string | null;
  mandalId: string | null;
  dueDate: string | null;
}

// Defines the structure of the update task request body
export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: "DRAFT" | "ASSIGNED" | null;
  stateId?: string | null;
  districtId?: string | null;
  mandalId?: string | null;
  dueDate?: string | null;
}

// Creates a pre-configured Axios instance for the task management API
const api = axios.create({
  baseURL: "http://172.50.5.102:3000/api/v1/tm",
  headers: { "Content-Type": "application/json" },
});

// Sample locations data
// Helper function to get location by ID from LocationService
const getLocationById = async (locationId: string): Promise<Location | undefined> => {
  try {
    // Try to find in states first
    const statesResult = await locationServiceMock.fetchLocations('state');
    if (statesResult.success && statesResult.data) {
      const state = statesResult.data.locations.find((loc: Location) => loc.id === locationId);
      if (state) return state;
    }
    
    // Try to find in districts
    const districtsResult = await locationServiceMock.fetchStateDistricts('state1'); // We need to check all states
    if (districtsResult.success && districtsResult.data) {
      const district = districtsResult.data.locations.find((loc: Location) => loc.id === locationId);
      if (district) return district;
    }
    
    // Try to find in cities/mandals
    const citiesResult = await locationServiceMock.fetchDistrictCities('district1'); // We need to check all districts
    if (citiesResult.success && citiesResult.data) {
      const city = citiesResult.data.locations.find((loc: Location) => loc.id === locationId);
      if (city) return city;
    }
    
    return undefined;
  } catch (error) {
    console.error('Error fetching location:', error);
    return undefined;
  }
};

// Helper function to validate if location exists
const validateLocationExists = async (locationId: string, type: 'state' | 'district' | 'city'): Promise<boolean> => {
  try {
    const location = await getLocationById(locationId);
    return location ? location.type === type : false;
  } catch (error) {
    console.error('Error validating location:', error);
    return false;
  }
};

// Sample assignees data
const sampleAssignees: Assignee[] = [
  { id: "user-1", name: "Rajesh Kumar", memberId: "FM001", role: "FARM_MANAGER", stateId: "state1", districtId: "district1", mandalId: "city1" },
  { id: "user-2", name: "Suneetha R", memberId: "KD001", role: "KISANI_DIDI", stateId: "state1", districtId: "district1", mandalId: "city1" },
  { id: "user-3", name: "Mohan Singh", memberId: "OP001", role: "OPERATOR", stateId: "state1", districtId: "district1", mandalId: "city1" },
  { id: "user-4", name: "Priya T", memberId: "FM002", role: "FARM_MANAGER", stateId: "state1", districtId: "district1", mandalId: "city1" },
  { id: "user-5", name: "Lakshmi M", memberId: "KD002", role: "KISANI_DIDI", stateId: "state2", districtId: "district2", mandalId: "city2" },
  { id: "user-6", name: "Ravi S", memberId: "IFM001", role: "FARM_MANAGER", stateId: "state1", districtId: "district1", mandalId: "city1" },
  { id: "user-7", name: "Geeta P", memberId: "IKD001", role: "KISANI_DIDI", stateId: "state1", districtId: "district1", mandalId: "city1" },
  { id: "user-8", name: "Anil K", memberId: "IOP001", role: "OPERATOR", stateId: "state1", districtId: "district1", mandalId: "city1" },
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
    stateId: "state1",
    districtId: "district1",
    mandalId: "city1",
    stateName: "Karnataka",
    districtName: "Bangalore",
    mandalName: "Mandya",
    dueDate: "2023-12-15T00:00:00.000Z",
    assignedAt: null,
    createdAt: "2023-11-01T10:30:00.000Z",
    updatedAt: "2023-11-01T10:30:00.000Z",
  },
  {
    id: "task-2",
    title: "Soil Testing",
    description: "Test soil pH levels in the northern fields",
    status: "ASSIGNED",
    assigneeUserType: "kd",
    assigneeId: "user-2",
    assigneeName: "Suneetha R",
    stateId: "state1",
    districtId: "district1",
    mandalId: "city1",
    stateName: "Karnataka",
    districtName: "Bangalore",
    mandalName: "Mandya",
    dueDate: "2023-11-30T00:00:00.000Z",
    assignedAt: "2023-11-05T14:20:00.000Z",
    createdAt: "2023-11-01T11:15:00.000Z",
    updatedAt: "2023-11-05T14:20:00.000Z",
  },
  {
    id: "task-3",
    title: "Irrigation System Check",
    description: "Inspect and repair irrigation system in field B-7",
    status: "ASSIGNED",
    assigneeUserType: "operator",
    assigneeId: "user-3",
    assigneeName: "Mohan Singh",
    stateId: "state1",
    districtId: "district1",
    mandalId: "city1",
    stateName: "Karnataka",
    districtName: "Bangalore",
    mandalName: "Mandya",
    dueDate: "2023-11-20T00:00:00.000Z",
    assignedAt: "2023-11-02T09:45:00.000Z",
    createdAt: "2023-11-02T09:30:00.000Z",
    updatedAt: "2023-11-02T09:45:00.000Z",
  },
];

// Set to true to use mock data, false to use real API
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
      const roleMap: Record<string, string> = {
        'fm': 'FARM_MANAGER',
        'kd': 'KISANI_DIDI',
        'operator': 'OPERATOR',
        'ifm': 'FARM_MANAGER',
        'ikd': 'KISANI_DIDI',
        'ioperator': 'OPERATOR'
      };
      
      if (assignee.role !== roleMap[userType]) return false;
      
      // Only apply individual/collective filtering for individual user types
      if (userType.startsWith('i')) {
        // For individual types (ifm, ikd, ioperator), only include users with 'I' prefix
        if (!assignee.memberId.startsWith('I')) return false;
      } else {
        // For collective types (fm, kd, operator), include all users of that role regardless of prefix
        // No additional filtering needed here
      }
    }
    
    if (stateId && assignee.stateId !== stateId) return false;
    if (districtId && assignee.districtId !== districtId) return false;
    if (mandalId && assignee.mandalId !== mandalId) return false;
    
    return true;
  });
};

// Validate create task request
const validateCreateTaskRequest = async (taskData: CreateTaskRequest): Promise<string | null> => {
  const validUserTypes = ["fm", "kd", "operator", "ifm", "ikd", "ioperator"];
  if (!validUserTypes.includes(taskData.userType)) {
    return "Invalid userType";
  }
  
  const individualUserTypes = ["ifm", "ikd", "ioperator"];
  if (individualUserTypes.includes(taskData.userType) && 
      (!taskData.assigneeIds || taskData.assigneeIds.length === 0)) {
    return "assigneeIds are required for individual userType";
  }
  
  if (!individualUserTypes.includes(taskData.userType) && 
      taskData.assigneeIds && taskData.assigneeIds.length > 0) {
    return "assigneeIds should not be provided for collective user types";
  }
  
  if (taskData.stateId && !(await validateLocationExists(taskData.stateId, "state"))) {
    return "Invalid stateId";
  }
  if (taskData.districtId && !(await validateLocationExists(taskData.districtId, "district"))) {
    return "Invalid districtId";
  }
  if (taskData.mandalId && !(await validateLocationExists(taskData.mandalId, "city"))) {
    return "Invalid mandalId";
  }
  
  if (taskData.assigneeIds && taskData.assigneeIds.length > 0) {
    for (const assigneeId of taskData.assigneeIds) {
      const assignee = sampleAssignees.find(a => a.id === assigneeId);
      if (!assignee) {
        return `Invalid assigneeId ${assigneeId} for userType ${taskData.userType}`;
      }
      
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
  fetchDraftTasks: async (token: string) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();
        const draftTasks = sampleTasks.filter(task => task.status === "DRAFT");
        return { success: true, data: draftTasks };
      } else {
        const response = await api.get<TaskListResponse>("/tm/tasks/drafts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        return { success: true, data: response.data };
      }
    } catch (error: any) {
      console.error("Error fetching draft tasks:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch draft tasks.",
        error: error.response?.data?.error,
        statusCode: error.response?.status || 500,
      };
    }
  },

  fetchAssignedTasks: async (token: string) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();
        const assignedTasks = sampleTasks.filter(task => task.status === "ASSIGNED");
        return { success: true, data: assignedTasks };
      } else {
        const response = await api.get<TaskListResponse>("/tm/tasks/assigned", {
          headers: { Authorization: `Bearer ${token}` },
        });
        return { success: true, data: response.data };
      }
    } catch (error: any) {
      console.error("Error fetching assigned tasks:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch assigned tasks.",
        error: error.response?.data?.error,
        statusCode: error.response?.status || 500,
      };
    }
  },

  createTask: async (taskData: CreateTaskRequest, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();
        
        const validationError = await validateCreateTaskRequest(taskData);
        if (validationError) {
          return {
            success: false,
            message: validationError,
            error: "Bad Request",
            statusCode: 400,
          };
        }
        
        // Handle task creation based on user type
        const collectiveUserTypes = ["fm", "kd", "operator"];
        const isCollectiveType = collectiveUserTypes.includes(taskData.userType);
        
        if (taskData.assigneeIds && taskData.assigneeIds.length > 0) {
          // Individual user types - create one task per selected user
          const createdTasks: Task[] = [];
          
          for (const assigneeId of taskData.assigneeIds) {
            const assignee = sampleAssignees.find(a => a.id === assigneeId);
            if (assignee) {
              const state = await getLocationById(taskData.stateId || '');
              const district = await getLocationById(taskData.districtId || '');
              const mandal = await getLocationById(taskData.mandalId || '');
              
              const newTask: Task = {
                id: generateId(),
                title: taskData.title,
                description: taskData.description,
                status: taskData.status,
                assigneeUserType: taskData.userType,
                assigneeId: assignee.id,
                assigneeName: assignee.name,
                stateId: taskData.stateId,
                districtId: taskData.districtId,
                mandalId: taskData.mandalId,
                stateName: state ? state.name : null,
                districtName: district ? district.name : null,
                mandalName: mandal ? mandal.name : null,
                dueDate: taskData.dueDate || null,
                assignedAt: taskData.status === "ASSIGNED" ? new Date().toISOString() : null,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              };
              
              createdTasks.push(newTask);
            }
          }
          
          sampleTasks.push(...createdTasks);
          return { success: true, data: createdTasks };
          
        } else if (isCollectiveType && taskData.status === "ASSIGNED") {
          // Collective user types - create one task for each user of this type in the location
          const allUsersOfType = sampleAssignees.filter(assignee => {
            // Map userType to role
            const roleMapping: { [key: string]: string } = {
              "fm": "FARM_MANAGER",
              "kd": "KISANI_DIDI", 
              "operator": "OPERATOR"
            };
            const expectedRole = roleMapping[taskData.userType];
            const roleMatch = assignee.role === expectedRole;
            const locationMatch = (!taskData.stateId || assignee.stateId === taskData.stateId) &&
                                (!taskData.districtId || assignee.districtId === taskData.districtId) &&
                                (!taskData.mandalId || assignee.mandalId === taskData.mandalId);
            return roleMatch && locationMatch;
          });
          
          if (allUsersOfType.length === 0) {
            return {
              success: false,
              message: "No users found for this user type and location",
              error: "Bad Request",
              statusCode: 400,
            };
          }
          
          const createdTasks: Task[] = [];
          const state = await getLocationById(taskData.stateId || '');
          const district = await getLocationById(taskData.districtId || '');
          const mandal = await getLocationById(taskData.mandalId || '');
          
          // Create one task for each user
          for (const assignee of allUsersOfType) {
            const newTask: Task = {
              id: generateId(),
              title: taskData.title,
              description: taskData.description,
              status: taskData.status,
              assigneeUserType: taskData.userType,
              assigneeId: assignee.id,
              assigneeName: assignee.name,
              stateId: taskData.stateId,
              districtId: taskData.districtId,
              mandalId: taskData.mandalId,
              stateName: state ? state.name : null,
              districtName: district ? district.name : null,
              mandalName: mandal ? mandal.name : null,
              dueDate: taskData.dueDate || null,
              assignedAt: taskData.status === "ASSIGNED" ? new Date().toISOString() : null,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            
            createdTasks.push(newTask);
          }
          
          sampleTasks.push(...createdTasks);
          return { success: true, data: createdTasks };
          
        } else {
          // Draft task - create single task without specific assignee
          const state = await getLocationById(taskData.stateId || '');
          const district = await getLocationById(taskData.districtId || '');
          const mandal = await getLocationById(taskData.mandalId || '');
          
          const newTask: Task = {
            id: generateId(),
            title: taskData.title,
            description: taskData.description,
            status: taskData.status,
            assigneeUserType: taskData.userType,
            assigneeId: null,
            assigneeName: null,
            stateId: taskData.stateId,
            districtId: taskData.districtId,
            mandalId: taskData.mandalId,
            stateName: state ? state.name : null,
            districtName: district ? district.name : null,
            mandalName: mandal ? mandal.name : null,
            dueDate: taskData.dueDate || null,
            assignedAt: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          sampleTasks.push(newTask);
          return { success: true, data: [newTask] };
        }
      } else {
        const response = await api.post<TaskListResponse>("/tm/tasks", taskData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return { success: true, data: response.data };
      }
    } catch (error: any) {
      console.error("Error creating task:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to create task.",
        error: error.response?.data?.error,
        statusCode: error.response?.status || 500,
      };
    }
  },

  fetchTaskDetails: async (taskId: string, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();
        const task = sampleTasks.find(t => t.id === taskId);
        if (!task) {
          return {
            success: false,
            message: "Task not found",
            error: "Not Found",
            statusCode: 404,
          };
        }
        return { success: true, data: task };
      } else {
        const response = await api.get<Task>(`/tm/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return { success: true, data: response.data };
      }
    } catch (error: any) {
      console.error("Error fetching task details:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch task details.",
        error: error.response?.data?.error,
        statusCode: error.response?.status || 500,
      };
    }
  },

  assignTask: async (taskId: string, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();
        const taskIndex = sampleTasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) {
          return {
            success: false,
            message: "Task not found",
            error: "Not Found",
            statusCode: 404,
          };
        }
        
        const task = sampleTasks[taskIndex];
        
        // For collective user types, check if the task has assigneeUserType but no specific assigneeId
        const collectiveUserTypes = ["fm", "kd", "operator"];
        const isCollectiveType = collectiveUserTypes.includes(task.assigneeUserType || "");
        
        if (!task.assigneeId && !isCollectiveType) {
          return {
            success: false,
            message: "Task has no assignee set",
            error: "Bad Request",
            statusCode: 400,
          };
        }
        
        // For collective user types, create multiple task instances for all users
        if (isCollectiveType && !task.assigneeId) {
          const allUsersOfType = sampleAssignees.filter(assignee => {
            // Map userType to role
            const roleMapping: { [key: string]: string } = {
              "fm": "FARM_MANAGER",
              "kd": "KISANI_DIDI", 
              "operator": "OPERATOR"
            };
            const expectedRole = roleMapping[task.assigneeUserType!];
            const roleMatch = assignee.role === expectedRole;
            const locationMatch = (!task.stateId || assignee.stateId === task.stateId) &&
                                (!task.districtId || assignee.districtId === task.districtId) &&
                                (!task.mandalId || assignee.mandalId === task.mandalId);
            return roleMatch && locationMatch;
          });
          
          if (allUsersOfType.length === 0) {
            return {
              success: false,
              message: "No users found for this user type and location",
              error: "Bad Request",
              statusCode: 400,
            };
          }
          
          // Remove the original draft task
          sampleTasks.splice(taskIndex, 1);
          
          // Create assigned tasks for each user
          const assignedTasks: Task[] = [];
          for (const assignee of allUsersOfType) {
            const assignedTask: Task = {
              ...task,
              id: generateId(),
              status: "ASSIGNED",
              assigneeId: assignee.id,
              assigneeName: assignee.name,
              assignedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            assignedTasks.push(assignedTask);
          }
          
          sampleTasks.push(...assignedTasks);
          return { success: true, data: assignedTasks[0] }; // Return first task as representative
        }
        
        // For individual user types, assign the single task
        const assignee = sampleAssignees.find(a => a.id === task.assigneeId);
        if (!assignee) {
          return {
            success: false,
            message: "Invalid assignee for this draft task",
            error: "Bad Request",
            statusCode: 400,
          };
        }
        
        sampleTasks[taskIndex].status = "ASSIGNED";
        sampleTasks[taskIndex].assignedAt = new Date().toISOString();
        sampleTasks[taskIndex].updatedAt = new Date().toISOString();
        
        return { success: true, data: sampleTasks[taskIndex] };
      } else {
        const response = await api.post<Task>(`/tm/tasks/${taskId}/assign`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return { success: true, data: response.data };
      }
    } catch (error: any) {
      console.error("Error assigning task:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to assign task.",
        error: error.response?.data?.error,
        statusCode: error.response?.status || 500,
      };
    }
  },

  updateTask: async (taskId: string, taskData: UpdateTaskRequest, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();
        const taskIndex = sampleTasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) {
          return {
            success: false,
            message: "Task not found",
            error: "Not Found",
            statusCode: 404,
          };
        }
        
        if (taskData.title !== undefined) sampleTasks[taskIndex].title = taskData.title;
        if (taskData.description !== undefined) sampleTasks[taskIndex].description = taskData.description;
        if (taskData.status !== undefined) sampleTasks[taskIndex].status = taskData.status || "DRAFT";
        if (taskData.stateId !== undefined) {
          sampleTasks[taskIndex].stateId = taskData.stateId;
          if (taskData.stateId) {
            const state = await getLocationById(taskData.stateId);
            sampleTasks[taskIndex].stateName = state ? state.name : null;
          }
        }
        if (taskData.districtId !== undefined) {
          sampleTasks[taskIndex].districtId = taskData.districtId;
          if (taskData.districtId) {
            const district = await getLocationById(taskData.districtId);
            sampleTasks[taskIndex].districtName = district ? district.name : null;
          }
        }
        if (taskData.mandalId !== undefined) {
          sampleTasks[taskIndex].mandalId = taskData.mandalId;
          if (taskData.mandalId) {
            const mandal = await getLocationById(taskData.mandalId);
            sampleTasks[taskIndex].mandalName = mandal ? mandal.name : null;
          }
        }
        if (taskData.dueDate !== undefined) sampleTasks[taskIndex].dueDate = taskData.dueDate;
        
        sampleTasks[taskIndex].updatedAt = new Date().toISOString();
        
        return { success: true, data: sampleTasks[taskIndex] };
      } else {
        const response = await api.put<Task>(`/tm/tasks/${taskId}`, taskData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return { success: true, data: response.data };
      }
    } catch (error: any) {
      console.error("Error updating task:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update task.",
        error: error.response?.data?.error,
        statusCode: error.response?.status || 500,
      };
    }
  },

  deleteTask: async (taskId: string, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();
        const taskIndex = sampleTasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) {
          return {
            success: false,
            message: "Task not found",
            error: "Not Found",
            statusCode: 404,
          };
        }
        
        if (sampleTasks[taskIndex].status !== "DRAFT") {
          return {
            success: false,
            message: "Only draft tasks can be deleted",
            error: "Bad Request",
            statusCode: 400,
          };
        }
        
        sampleTasks.splice(taskIndex, 1);
        return { success: true };
      } else {
        await api.delete<{ success: true }>("/tm/tasks/" + taskId, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return { success: true };
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to delete task.",
        error: error.response?.data?.error || "Bad Request",
        statusCode: error.response?.status || 500,
      };
    }
  },

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
        
        if (stateId && !(await validateLocationExists(stateId, "state"))) {
          return {
            success: false,
            message: "Invalid stateId",
            error: "Bad Request",
            statusCode: 400,
          };
        }
        if (districtId && !(await validateLocationExists(districtId, "district"))) {
          return {
            success: false,
            message: "Invalid districtId",
            error: "Bad Request",
            statusCode: 400,
          };
        }
        if (mandalId && !(await validateLocationExists(mandalId, "city"))) {
          return {
            success: false,
            message: "Invalid mandalId",
            error: "Bad Request",
            statusCode: 400,
          };
        }
        
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
        const response = await api.get<AssigneeListResponse>("/assignees/search", {
          headers: { Authorization: `Bearer ${token}` },
          params: { q: searchTerm, userType, stateId, districtId, mandalId },
        });
        return { success: true, data: response.data };
      }
    } catch (error: any) {
      console.error("Error searching assignees:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to search assignees.",
        error: error.response?.data?.error,
        statusCode: error.response?.status || 500,
      };
    }
  },
};