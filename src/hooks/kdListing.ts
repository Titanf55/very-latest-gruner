// src/hooks/KisaniDidiListing.js
import { useEffect, useState } from "react";
import api from "../services/kdapi";
import axios from "axios";


// export default function kdListing(params = {}) {
//   const [data, setData] = useState([]);
//   const [pagination, setPagination] = useState({
//     total: 0,
//     page: 1,
//     limit: 10,
//     totalPages: 0,
//   });
//   const [loading, setLoading] = useState(false);

//   const fetchData = async (queryParams = {}) => {
//     setLoading(true);
//     try {
//       const response = await api.get("/kisaniDidi/getAllKisaniDidi", {
//         params: {
//           search: queryParams.search || "",
//           stateId: queryParams.stateId || "",
//           districtId: queryParams.districtId || "",
//           mandalId: queryParams.mandalId || "",
//           page: queryParams.page || 1,
//           limit: queryParams.limit || 10,
//         },
//       });

//       if (response.data?.statusCode === 200) {
//         setData(response.data.data);
//         setPagination({
//           total: response.data.total,
//           page: response.data.page,
//           limit: response.data.limit,
//           totalPages: response.data.totalPages,
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching Kisani Didi staff:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData(params);
//   }, [params]);

//   return { data, pagination, loading, fetchData };
// }

// s

export interface KisaniDidi {
  id: number;
  name: string;
  phone: string;
  // add other fields
}



 export const kdListing = async (filters: any) => {
  try {
    const response = await axios.get(`api/v1/kd`, {
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
    console.error("Failed to fetch KD list", err);
    return { data: [], pagination: {} };
  }

};

 export const pendingkdListing = async (filters: any) => {
  try {
    const response = await axios.get(`api/v1/pendingkdRequest`, {
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
    console.error("Failed to fetch KD list", err);
    return { data: [], pagination: {} };
  }

};




// services/kisaniDidiService.ts

export const updateKisaniDidiStatus = async (id: string, action: string) => {
  const response = await axios.patch(`/changeStatus/${id}?action=${action}`);
  return response.data;
};


export const deleteKisaniDidiStatus = async (id: string, action: string) => {
  const response = await axios.delete(`/${id}`);
  return response.data;
};

