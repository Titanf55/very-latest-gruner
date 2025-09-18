import { Operator, OperatorListResponse, OperatorProfileResponse, OperatorTask, OperatorTaskResponse, FetchOperatorsParams } from './farmerOperator';

// Set to true to use mock data
const USE_MOCK_DATA = true;

// Simulate network delay in milliseconds
const NETWORK_DELAY = 500;

// Simulate network delay
const simulateNetworkDelay = () => 
  new Promise(resolve => setTimeout(resolve, NETWORK_DELAY));

// Mock data for operators matching the frontend expectations
const sampleOperators: Operator[] = [
  {
    id: '1',
    name: 'Ravi Sharma',
    memberId: 'MEM-KD-2024-001',
    mobile: '+91 9785432110',
    isActive: true,
    status: 'Active',
    state: 'Rajasthan',
    district: 'Jaipur',
    mandal: 'Sangaria',
    village: 'Rampur'
  },
  {
    id: '2',
    name: 'Geeta Verma',
    memberId: 'MEM-KD-2024-002',
    mobile: '+91 9876543211',
    isActive: true,
    status: 'Active',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    mandal: 'Gomti Nagar',
    village: 'Village A'
  },
  {
    id: '3',
    name: 'Anjali Yadav',
    memberId: 'MEM-KD-2024-003',
    mobile: '+91 9876543212',
    isActive: false,
    status: 'Inactive',
    state: 'Madhya Pradesh',
    district: 'Bhopal',
    mandal: 'Indrapuri',
    village: 'Village B'
  },
  {
    id: '4',
    name: 'Deepika Patel',
    memberId: 'MEM-KD-2024-004',
    mobile: '+91 9876543213',
    isActive: true,
    status: 'Active',
    state: 'Maharashtra',
    district: 'Mumbai',
    mandal: 'Andheri',
    village: 'Village C'
  },
  {
    id: '5',
    name: 'Priya Singh',
    memberId: 'MEM-KD-2024-005',
    mobile: '+91 9876543214',
    isActive: true,
    status: 'Active',
    state: 'Gujarat',
    district: 'Ahmedabad',
    mandal: 'Naranpura',
    village: 'Village D'
  }
];

// Mock data for pending operators
const pendingOperators: Operator[] = [
  {
    id: '101',
    name: 'Kavita Singh',
    memberId: 'MEM-KD-2024-101',
    mobile: '+91 9876543220',
    isActive: false,
    status: 'Pending',
    state: 'Bihar',
    district: 'Patna',
    mandal: 'Boring Road',
    village: 'Patna City'
  },
  {
    id: '102',
    name: 'Ritu Kumari',
    memberId: 'MEM-KD-2024-102',
    mobile: '+91 9876543221',
    isActive: false,
    status: 'Pending',
    state: 'Jharkhand',
    district: 'Ranchi',
    mandal: 'Hinoo',
    village: 'Village E'
  },
  {
    id: '103',
    name: 'Neha Sharma',
    memberId: 'MEM-KD-2024-103',
    mobile: '+91 9876543222',
    isActive: false,
    status: 'Pending',
    state: 'Assam',
    district: 'Guwahati',
    mandal: 'Dispur',
    village: 'Village F'
  }
];

// Mock operator profiles with detailed information
const operatorProfiles: Record<string, OperatorProfileResponse['data']> = {
  '1': {
    id: '1',
    createdAt: '2024-01-10T10:00:00Z',
    name: 'Ravi Sharma',
    phoneNumber: '+91 9785432110',
    isPhoneVerified: true,
    alternateMobile: '+91 9876543210',
    username: 'ravi_sharma',
    gender: 'Male',
    education: '12th Pass',
    dateOfBirth: '1985-06-15',
    profilePhotoUrl: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=150',
    addressLine: 'House No 123, Main Street',
    isActive: true,
    status: 'Active',
    language: 'Hindi',
    memberId: 'MEM-KD-2024-001',
    state: 'Rajasthan',
    district: 'Jaipur',
    mandal: 'Sangaria',
    village: 'Rampur',
    pincode: '500001',
    workingDays: 25,
    kycDocuments: {
      aadhaar: { documentNumber: '**** **** **** 9012' },
      pan: { documentNumber: 'ABCDE1234F' }
    }
  },
  '101': {
    id: '101',
    createdAt: '2024-03-15T10:00:00Z',
    name: 'Kavita Singh',
    phoneNumber: '+91 9876543220',
    isPhoneVerified: false,
    alternateMobile: '+91 9876543221',
    username: 'kavita_singh',
    gender: 'Female',
    education: 'Graduate',
    dateOfBirth: '1988-03-15',
    profilePhotoUrl: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=150',
    addressLine: 'House No 456, Gandhi Road',
    isActive: false,
    status: 'Pending',
    language: 'Hindi',
    memberId: 'MEM-KD-2024-101',
    state: 'Bihar',
    district: 'Patna',
    mandal: 'Boring Road',
    village: 'Patna City',
    pincode: '800001',
    workingDays: 0,
    kycDocuments: {
      aadhaar: { documentNumber: '**** **** **** 1012' },
      pan: { documentNumber: 'FGHIJ5678K' }
    }
  }
};

// Mock operator tasks
const operatorTasks: Record<string, OperatorTask[]> = {
  '1': [
    {
      id: '1',
      title: 'Farmer Training on Organic Fertilizers',
      status: 'Completed',
      assignedAt: '2024-01-20T09:00:00Z',
      dueDate: '2024-01-25T18:00:00Z',
      state: 'Rajasthan',
      district: 'Jaipur',
      mandal: 'Sangaria',
      village: 'Rampur'
    },
    {
      id: '2',
      title: 'Crop Health Inspection',
      status: 'In Progress',
      assignedAt: '2024-01-22T09:00:00Z',
      dueDate: '2024-01-28T18:00:00Z',
      state: 'Rajasthan',
      district: 'Jaipur',
      mandal: 'Sangaria',
      village: 'Rampur'
    },
    {
      id: '3',
      title: 'Soil Testing Guidance',
      status: 'Pending',
      assignedAt: '2024-01-18T09:00:00Z',
      dueDate: '2024-01-23T18:00:00Z',
      state: 'Rajasthan',
      district: 'Jaipur',
      mandal: 'Sangaria',
      village: 'Rampur'
    }
  ]
};

// Filter operators based on parameters
const filterOperators = (operators: Operator[], params: FetchOperatorsParams): Operator[] => {
  return operators.filter(operator => {
    // Search term filter
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      if (
        !operator.name.toLowerCase().includes(searchLower) &&
        !operator.mobile.includes(searchLower) &&
        !operator.memberId.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }

    // Location filters
    if (params.stateId && operator.state !== params.stateId) {
      return false;
    }
    if (params.districtId && operator.district !== params.districtId) {
      return false;
    }
    if (params.mandalId && operator.mandal !== params.mandalId) {
      return false;
    }

    return true;
  });
};

// Get paginated results
const getPaginatedResults = (items: Operator[], page: number, limit: number) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);
  const totalPages = Math.ceil(items.length / limit);

  return {
    operators: paginatedItems,
    count: items.length,
    totalPages,
    limit,
    page,
  };
};

export const operatorServiceSimulation = {
  /**
   * Simulates fetching a paginated and searchable list of operators.
   * @param params - An object containing all query parameters.
   * @param token - The authentication token.
   * @returns An object with success status and either the data or an error message.
   */
  fetchOperators: async (params: FetchOperatorsParams, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();

        let filteredOperators = filterOperators(sampleOperators, params);
        const paginatedResults = getPaginatedResults(filteredOperators, params.page ?? 1, params.limit ?? 10);

        const responseData: OperatorListResponse = {
          statusCode: 200,
          message: 'Success',
          data: paginatedResults.operators,
          total: paginatedResults.count,
          page: paginatedResults.page,
          limit: paginatedResults.limit,
          totalPages: paginatedResults.totalPages,
          pendingApprovalCount: pendingOperators.length
        };

        return { success: true, data: responseData };
      } else {
        // This block is for reference; it won't be used since USE_MOCK_DATA is true
        const response = await fetch('/api/v1/op/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch operators');
        }
        const data = await response.json();
        return { success: true, data: data };
      }
    } catch (error: any) {
      console.error('Error fetching operators:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch operators. Please try again.',
      };
    }
  },

  /**
   * Simulates fetching a list of operators pending approval.
   * @param params - An object containing all query parameters.
   * @param token - The authentication token.
   * @returns An object with success status and either the data or an error message.
   */
  fetchPendingOperators: async (params: FetchOperatorsParams, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();

        let filteredOperators = filterOperators(pendingOperators, params);
        const paginatedResults = getPaginatedResults(filteredOperators, params.page ?? 1, params.limit ?? 10);

        const responseData: OperatorListResponse = {
          statusCode: 200,
          message: 'Success',
          data: paginatedResults.operators,
          total: paginatedResults.count,
          page: paginatedResults.page,
          limit: paginatedResults.limit,
          totalPages: paginatedResults.totalPages,
          pendingApprovalCount: paginatedResults.count
        };

        return { success: true, data: responseData };
      } else {
        const response = await fetch('/api/v1/op/pendingRequests', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch pending operators');
        }
        const data = await response.json();
        return { success: true, data: data };
      }
    } catch (error: any) {
      console.error('Error fetching pending operators:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch pending operators.',
      };
    }
  },

  /**
   * Simulates changing the status of an operator (block, unblock, approve, reject).
   * @param operatorId - The ID of the operator to update.
   * @param action - The action to perform.
   * @param token - The authentication token.
   * @returns An object with success status and either the data or an error message.
   */
  changeOperatorStatus: async (
    operatorId: string,
    action: "block" | "unblock" | "approve" | "reject",
    token: string
  ) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();

        // Handle approval - move from pending to active
        if (action === 'approve') {
          const pendingIndex = pendingOperators.findIndex(op => op.id === operatorId);
          if (pendingIndex !== -1) {
            const approvedOperator = pendingOperators[pendingIndex];
            approvedOperator.status = 'Active';
            approvedOperator.isActive = true;
            sampleOperators.push(approvedOperator);
            pendingOperators.splice(pendingIndex, 1);
            return { success: true, data: { isActive: true, status: 'Active' } };
          }
        }

        // Handle rejection - remove from pending
        if (action === 'reject') {
          const pendingIndex = pendingOperators.findIndex(op => op.id === operatorId);
          if (pendingIndex !== -1) {
            pendingOperators.splice(pendingIndex, 1);
            return { success: true, data: { isActive: false, status: 'Rejected' } };
          }
        }

        // Handle block/unblock
        const operatorIndex = sampleOperators.findIndex(op => op.id === operatorId);
        if (operatorIndex !== -1) {
          const operator = sampleOperators[operatorIndex];
          if (action === 'block') {
            operator.status = 'Blocked';
            operator.isActive = false;
            return { success: true, data: { isActive: false, status: 'Blocked' } };
          } else if (action === 'unblock') {
            operator.status = 'Active';
            operator.isActive = true;
            return { success: true, data: { isActive: true, status: 'Active' } };
          }
        }

        return { success: false, message: 'Operator not found' };
      } else {
        const response = await fetch(`/api/v1/op/changeStatus/${operatorId}?action=${action}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to change operator status');
        }
        const data = await response.json();
        return { success: true, data: data.data };
      }
    } catch (error: any) {
      console.error('Error changing operator status:', error);
      return {
        success: false,
        message: error.message || 'Failed to change operator status.',
      };
    }
  },

  /**
   * Simulates fetching an operator profile by ID.
   * @param operatorId - The ID of the operator.
   * @param token - The authentication token.
   * @returns An object with success status and either the data or an error message.
   */
  fetchOperatorProfile: async (operatorId: string, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();

        const profile = operatorProfiles[operatorId];
        if (!profile) {
          return { success: false, message: 'Operator profile not found' };
        }

        const responseData: OperatorProfileResponse = {
          statusCode: 200,
          message: 'Success',
          data: profile
        };

        return { success: true, data: responseData.data };
      } else {
        const response = await fetch(`/api/v1/op/${operatorId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch operator profile');
        }
        const data = await response.json();
        return { success: true, data: data.data };
      }
    } catch (error: any) {
      console.error('Error fetching operator profile:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch operator profile.',
      };
    }
  },

  /**
   * Simulates deleting an operator by ID.
   * @param operatorId - The ID of the operator to delete.
   * @param token - The authentication token.
   * @returns An object with success status and an optional error message.
   */
  deleteOperator: async (operatorId: string, token: string) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();

        const index = sampleOperators.findIndex(op => op.id === operatorId);
        if (index === -1) {
          return { success: false, message: 'Operator not found' };
        }
        sampleOperators.splice(index, 1);
        return { success: true, data: { statusCode: 200, message: 'Success' } };
      } else {
        const response = await fetch(`/api/v1/op/${operatorId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to delete operator');
        }
        return { success: true };
      }
    } catch (error: any) {
      console.error('Error deleting operator:', error);
      return {
        success: false,
        message: error.message || 'Failed to delete operator.',
      };
    }
  },

  /**
   * Simulates updating an operator's profile by ID.
   * @param operatorId - The ID of the operator to update.
   * @param updates - The updates to apply.
   * @param token - The authentication token.
   * @returns An object with success status and either the data or an error message.
   */
  updateOperatorProfile: async (
    operatorId: string,
    updates: {
      name?: string;
      phoneNumber?: string;
      alternateMobile?: string;
      username?: string;
      gender?: string;
      education?: string;
      dateOfBirth?: string;
      profilePhotoUrl?: string;
      addressLine?: string;
      language?: string;
      stateId?: string;
      districtId?: string;
      mandalId?: string;
      villageId?: string;
    },
    token: string
  ) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();

        const profile = operatorProfiles[operatorId];
        if (!profile) {
          return { success: false, message: 'Operator profile not found' };
        }

        // Update the profile
        Object.assign(profile, updates);

        // Also update the operator in the main list if it exists
        const operatorIndex = sampleOperators.findIndex(op => op.id === operatorId);
        if (operatorIndex !== -1) {
          sampleOperators[operatorIndex] = {
            ...sampleOperators[operatorIndex],
            name: updates.name || sampleOperators[operatorIndex].name,
            mobile: updates.phoneNumber || sampleOperators[operatorIndex].mobile,
            state: updates.stateId || sampleOperators[operatorIndex].state,
            district: updates.districtId || sampleOperators[operatorIndex].district,
            mandal: updates.mandalId || sampleOperators[operatorIndex].mandal,
            village: updates.villageId || sampleOperators[operatorIndex].village
          };
        }

        return { success: true, data: profile };
      } else {
        const response = await fetch(`/api/v1/op/${operatorId}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updates),
        });
        if (!response.ok) {
          throw new Error('Failed to update operator profile');
        }
        const data = await response.json();
        return { success: true, data: data.data };
      }
    } catch (error: any) {
      console.error('Error updating operator profile:', error);
      return {
        success: false,
        message: error.message || 'Failed to update operator profile.',
      };
    }
  },

  /**
   * Simulates fetching tasks assigned to an operator, with optional status filter.
   * @param operatorId - The ID of the operator.
   * @param token - The authentication token.
   * @param status - Optional status filter.
   * @returns An object with success status and either the data or an error message.
   */
  getOperatorTasks: async (
    operatorId: string,
    token: string,
    status?: "pending" | "in_progress" | "completed"
  ) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();

        let tasks = operatorTasks[operatorId] || [];

        // Apply status filter if provided
        if (status) {
          const statusMap: Record<string, string> = {
            'pending': 'Pending',
            'in_progress': 'In Progress',
            'completed': 'Completed'
          };
          tasks = tasks.filter(task => task.status === statusMap[status]);
        }

        const responseData: OperatorTaskResponse = {
          statusCode: 200,
          message: 'Success',
          data: tasks
        };

        return { success: true, data: responseData.data };
      } else {
        const url = status 
          ? `/api/v1/op/task/${operatorId}?status=${status}`
          : `/api/v1/op/task/${operatorId}`;
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch operator tasks');
        }
        const data = await response.json();
        return { success: true, data: data.data };
      }
    } catch (error: any) {
      console.error('Error fetching operator tasks:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch operator tasks.',
      };
    }
  },
};
