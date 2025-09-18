// src/hooks/KisaniDidiListing.js
import { useEffect, useState } from "react";
import api from "../services/kdapi";
import axios from "axios";



export interface FarmManager {
  id: number;
  name: string;
  phone: string;
  // add other fields
}



 export const farmManagerListing = async (filters: any) => {
  try {
    const response = await axios.get(`api/v1/fmm/`, {
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
    console.error("Failed to fetch farm Manager list", err);
    return { data: [], pagination: {} };
  }

};

 export const pendingfmListing = async (filters: any) => {
  try {
    const response = await axios.get(`api/v1/fmm/pendingRequests`, {
      params: {
        search: filters.snearch || "",
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
export const updateFmnStatus = async (id: string, action: string) => {
  const response = await axios.patch(`/fmm/changeStatus/${id}?action=${action}`);
  return response.data;
};


export const deleteFmnLStatus = async (id: string, action: string) => {
  const response = await axios.delete(`/fmm/:/${id}`);
  return response.data;
};

