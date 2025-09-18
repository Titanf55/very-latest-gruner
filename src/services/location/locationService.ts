
import axios from "axios";

// Defines the expected structure for a single location object.
export interface Location {
  id: string;
  name: string;
  type: "state" | "district" | "city";
  parentId: string | null;
}

// Defines the structure of the API response for locations.
export interface LocationListResponse {
  statusCode: number;
  message: string;
  data: {
    locations: Location[];
    count: number;
    page: number;
    limit: number;
    totalPages: number;
    nextPage: number;
  };
}

// Creates a pre-configured Axios instance for the location API.
const api = axios.create({
  baseURL: "http://172.50.5.102:3000/api/v1/locations",
  headers: { "Content-Type": "application/json" },
});

export const locationService = {
  /**
   * Fetches a paginated list of locations (states, districts, or cities) from the API.
   * @param type - The type of location (state, district, or city).
   * @param parentId - Comma-separated parent IDs (optional).
   * @param stateId - Comma-separated state IDs (optional).
   * @param page - The current page number (default: 1).
   * @param limit - The number of items per page (default: 10).
   * @param language - The language code for location names (default: en).
   * @param authToken - The Basic Authentication token (optional for Auth service).
   * @returns An object with success status and either the data or an error message.
   */
  fetchLocations: async (
    type: "state" | "district" | "city",
    parentId?: string,
    stateId?: string,
    page: number = 1,
    limit: number = 10,
    language: string = "en",
    authToken?: string
  ) => {
    try {
      const headers: Record<string, string> = { "x-language": language };
      if (authToken) {
        headers["Authorization"] = `Basic ${authToken}`;
      }

      const response = await api.get<LocationListResponse>("/", {
        headers,
        params: {
          type,
          parentId,
          stateId,
          page,
          limit,
        },
      });
      return { success: true, data: response.data.data };
    } catch (error: any) {
      console.error("Error fetching locations:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch locations.",
      };
    }
  },

  /**
   * Fetches a paginated list of districts for given states.
   * @param stateId - Comma-separated state IDs.
   * @param parentId - Comma-separated parent IDs (optional).
   * @param page - The current page number (default: 1).
   * @param limit - The number of items per page (default: 10).
   * @param language - The language code for location names (default: en).
   * @param authToken - The Basic Authentication token (optional for Auth service).
   * @returns An object with success status and either the data or an error message.
   */
  fetchStateDistricts: async (
    stateId: string,
    parentId?: string,
    page: number = 1,
    limit: number = 10,
    language: string = "en",
    authToken?: string
  ) => {
    try {
      const headers: Record<string, string> = { "x-language": language };
      if (authToken) {
        headers["Authorization"] = `Basic ${authToken}`;
      }

      const response = await api.get<LocationListResponse>("/state/districts", {
        headers,
        params: {
          type: "district", // Explicitly set as per spec
          stateId,
          parentId,
          page,
          limit,
        },
      });
      return { success: true, data: response.data.data };
    } catch (error: any) {
      console.error("Error fetching districts:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch districts.",
      };
    }
  },

  /**
   * Fetches a paginated list of cities for given districts.
   * @param parentId - Comma-separated district IDs.
   * @param page - The current page number (default: 1).
   * @param limit - The number of items per page (default: 10).
   * @param language - The language code for location names (default: en).
   * @param authToken - The Basic Authentication token (optional for Auth service).
   * @returns An object with success status and either the data or an error message.
   */
  fetchDistrictCities: async (
    parentId: string,
    page: number = 1,
    limit: number = 10,
    language: string = "en",
    authToken?: string
  ) => {
    try {
      const headers: Record<string, string> = { "x-language": language };
      if (authToken) {
        headers["Authorization"] = `Basic ${authToken}`;
      }

      const response = await api.get<LocationListResponse>("/district/cities", {
        headers,
        params: {
          type: "city", // Explicitly set as per spec
          parentId,
          page,
          limit,
        },
      });
      return { success: true, data: response.data.data };
    } catch (error: any) {
      console.error("Error fetching cities:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch cities.",
      };
    }
  },
};