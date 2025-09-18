import axios from "axios";

// ---------------------
// Interfaces
// ---------------------
export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: "draft" | "assigned"; // ✅ lowercase as per docs
  assigneeUserType: "fm" | "kd" | "operator" | "ifm" | "ikd" | "ioperator" | null;
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

export interface Assignee {
  id: string;
  name: string;
  memberId: string;
  role:
    | "farm-manager"
    | "kisani-didi"
    | "operator"
    | "individual-farm-manager"
    | "individual-kisani-didi"
    | "individual-operator"; // ✅ match docs
  state: string;
  district: string;
  mandal: string;
}

export type TaskListResponse = Task[];
export type AssigneeListResponse = Assignee[];

export interface CreateTaskRequest {
  title: string;
  description: string | null;
  userType: "fm" | "kd" | "operator" | "ifm" | "ikd" | "ioperator";
  assigneeIds: string[] | null; // required for individual types
  stateId: string | null;
  districtId: string | null;
  mandalId: string | null;
  dueDate: string | null;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  userType?: "fm" | "kd" | "operator" | "ifm" | "ikd" | "ioperator";
  assigneeId?: string | null;
  stateId?: string | null;
  districtId?: string | null;
  mandalId?: string | null;
  dueDate?: string | null;
}

interface DeleteTaskResponse {
  success: boolean;
  message?: string;
  error?: string;
}

interface SearchAssigneesResponse {
  success: boolean;
  data?: Assignee[];
  message?: string;
  error?: string;
}

// ---------------------
// Axios instance
// ---------------------
const api = axios.create({
  baseURL: "http://172.50.5.102:3000/api/v1/tm",
  headers: { "Content-Type": "application/json" },
});

// ---------------------
// Service Methods
// ---------------------
export const taskManagementService = {
  // Draft tasks
  fetchDraftTasks: async (token: string) => {
    try {
      const response = await api.get<TaskListResponse>("/tasks/drafts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Error fetching draft tasks:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to fetch draft tasks. Please try again.",
      };
    }
  },

  // Assigned tasks
  fetchAssignedTasks: async (token: string) => {
    try {
      const response = await api.get<TaskListResponse>("/tasks/assigned", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Error fetching assigned tasks:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to fetch assigned tasks. Please try again.",
      };
    }
  },

  // Create task (status is query param, not body)
  createTask: async (
    taskData: CreateTaskRequest,
    token: string,
    status: "draft" | "assign" = "draft"
  ) => {
    try {
      const response = await api.post<TaskListResponse>(
        `/tasks?status=${status}`,
        taskData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Error creating task:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to create task.",
      };
    }
  },

  // Task details
  fetchTaskDetails: async (taskId: string, token: string) => {
    try {
      const response = await api.get<Task>(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Error fetching task details:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch task details.",
      };
    }
  },

  // Assign draft task
  assignTask: async (taskId: string, token: string) => {
    try {
      const response = await api.post<Task>(
        `/tasks/${taskId}/assign`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Error assigning task:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to assign task.",
      };
    }
  },

  // Update draft task (status as query param if assigning)
  updateTask: async (
    taskId: string,
    taskData: UpdateTaskRequest,
    token: string,
    status: "draft" | "assign" = "draft"
  ) => {
    try {
      const response = await api.put<Task>(
        `/tasks/${taskId}?status=${status}`,
        taskData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Error updating task:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update task.",
      };
    }
  },

  // Delete draft task
  deleteTask: async (
    taskId: string,
    token: string
  ): Promise<DeleteTaskResponse> => {
    try {
      await api.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true };
    } catch (error: any) {
      console.error("Error deleting task:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to delete task.",
        error: error.response?.data?.error,
      };
    }
  },

  // Search assignees (userType required)
  searchAssignees: async (
    searchTerm: string,
    userType: "ifm" | "ikd" | "ioperator",
    stateId: string | undefined,
    districtId: string | undefined,
    mandalId: string | undefined,
    token: string
  ): Promise<SearchAssigneesResponse> => {
    try {
      const response = await api.get<AssigneeListResponse>(
        "/assignees/search",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { q: searchTerm, userType, stateId, districtId, mandalId },
        }
      );
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Error searching assignees:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to search assignees.",
        error: error.response?.data?.error,
      };
    }
  },
};
