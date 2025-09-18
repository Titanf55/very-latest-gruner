// ============================================================================
// TASK MANAGEMENT TYPES
// ============================================================================

export interface DraftTask {
  id: string;
  title: string;
  status: "draft";
  assignedToLabel: string;
  createdAt: string;
  // Additional properties for form handling
  userType?: string;
  state?: string;
  district?: string;
  mandal?: string;
  selectedUsers?: number[];
  taskDescription?: string;
  dueDate?: string;
}

export interface AssignedTask {
  id: string;
  title: string;
  status: "assigned";
  assignedToLabel: string;
  assignedAt: string;
  dueDate: string;
  taskStatus: "completed" | "in-progress" | "overdue";
  // Additional properties for backward compatibility
  taskDescription?: string;
  userType?: string;
  state?: string;
  district?: string;
  mandal?: string;
  assignedTo?: string[];
  assignedToNames?: string[];
  assignedDate?: string;
  stateName?: string;
  districtName?: string;
  mandalName?: string;
}

// Response interfaces for pagination
export interface DraftTasksResponse {
  data: DraftTask[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface AssignedTasksResponse {
  data: AssignedTask[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export type Task = DraftTask | AssignedTask;

// Task Details interface for modal (from fetchTaskDetails API)
export interface TaskDetails {
  id: string;
  title: string;
  description: string;
  status: "draft" | "assigned";
  assigneeUserType: "fm" | "kd" | "operator" | "ifm" | "ikd" | "ioperator";
  assigneeId: string | null;
  assignedAt: string | null;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  stateName: string;
  districtName: string;
  mandalName: string;
  assignedToLabel: string;
  assignedCount: number | null;
}

export interface User {
  id: number;
  name: string;
  memberId: string;
  userType: string;
  stateId?: string;
  districtId?: string;
  mandalId?: string;
  location?: string; // Display name for location
}

export interface FormData {
  userType: string;
  state: string;
  district: string;
  mandal: string;
  selectedUsers: number[]; // Array of selected user IDs
  taskTitle: string;
  taskDescription: string;
  dueDate: string;
}

export interface FilterState {
  assignedTo: string;
}

export interface FilterOption {
  value: string;
  label: string;
}
