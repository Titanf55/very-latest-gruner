import axios from "axios";



export interface FarmOperator {
  id: number;
  name: string;
  phone: string;
  // add other fields
}

export interface OperatorTask {
  id: string;
  title: string;
  status: string;
  assignedAt: string; // ISO 8601
  dueDate?: string | null;
  state?: string | null;
  district?: string | null;
  mandal?: string | null;
  village?: string | null;
}
export interface OperatorTaskResponse {
  statusCode: number;
  message: string;
  data: OperatorTask[];
}

 export const fmoListing = async (filters: any) => {
  try {
    const response = await axios.get(`api/v1/op/`, {
      params: {
        search: filters.search || "",
        stateId: filters.state || "",
        districtId: filters.district || "",
        mandalId: filters.mandal || "",
        page: filters.page || 1,
        limit: filters.limit || 10,
      },
    });

    return {
      data: response.data?.data || [],
      pagination: response.data?.pagination || {},
    };
     // return response.json();
  } catch (err) {
    console.error("Failed to fetch FarmOperator list", err);
    return { data: [], pagination: {} };
  }

};

 export const pendingfmoListing = async (filters: any) => {
  try {
    const response = await axios.get(`api/v1/op/pendingRequests`, {
      params: {
        search: filters.search || "",
        stateId: filters.state || "",
        districtId: filters.district || "",
        mandalId: filters.mandal || "",
        page: filters.page || 1,
        limit: filters.limit || 10,
      },
    }); 


    return {
      data: response.data?.data || [],
      pagination: response.data?.pagination || {},
    };
     // return response.json();
  } catch (err) {
    console.error("Failed to fetch FMO list", err);
    return { data: [], pagination: {} };
  }

};




// services/kisaniDidiService.ts

export const updateFmoStatus = async (id: number, action: string) => {
  const response = await axios.patch(`/op/changeStatus/${id}?action=${action}`);
  return response.data;
};



export const deleteFmoStatus = async (id: number, action: string) => {
  const response = await axios.delete(`/op/${id}`);
  return response.data;
};


export const viewOperatorById = async (id: number, action: string) => {
  const response = await axios.get(`/api/v1/op/${id}`);
  return response.data;
};
export const updateOperatorById = async (id: number, payload: any) => {
  try {
    const response = await axios.patch(`/op/${id}`, payload);
    return response.data;
  } catch (error: any) {
    console.error("Error updating operator:", error);
    throw error.response?.data || error;
  }
};


/**
 * Get tasks assigned to a specific operator.
 * @param id Operator ID
 * @param status Optional task status filter (pending | in_progress | completed)
 */
export const getOperatorTasks = async (
  id: string,
  status?: string
): Promise<OperatorTaskResponse> => {
  try {
    const response = await axios.get<OperatorTaskResponse>(`/op/task/${id}`, {
      params: status ? { status } : {}, // ✅ attach query param only if provided
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to fetch tasks");
    }
    throw new Error("Network error while fetching operator tasks");
  }
};





