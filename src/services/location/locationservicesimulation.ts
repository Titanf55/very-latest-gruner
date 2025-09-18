// // location-service.ts
// import axios from "axios";

// // Defines the expected structure for a single location object.
// export interface Location {
//   id: string;
//   name: string;
//   type: string;
//   parentId: string | null;
// }

// // Defines the structure of the API response for locations.
// export interface LocationResponse {
//   statusCode: string;
//   message: string;
//   data: Location[];
//   count: number;
//   page: number;
//   limit: number;
//   totalPages: number;
//   nextPage: number;
// }

// // Defines the structure of the API response for state districts and district cities.
// export interface LocationListResponse {
//   statusCode: string;
//   message: string;
//   data: {
//     locations: Location[];
//     count: number;
//     page: number;
//     limit: number;
//     totalPages: number;
//     nextPage: number;
//   };
// }

// // Creates a pre-configured Axios instance for the location API.
// const api = axios.create({
//   baseURL: "http://172.50.5.102:3000/api/v1", // Adjust baseURL as needed
//   headers: { "Content-Type": "application/json" },
// });

// // Sample locations data
// const sampleLocations: Location[] = [
//   { id: "state-1", name: "Andhra Pradesh", type: "STATE", parentId: null },
//   { id: "state-2", name: "Telangana", type: "STATE", parentId: null },
//   { id: "state-3", name: "Karnataka", type: "STATE", parentId: null },
//   { id: "district-1", name: "Chittoor", type: "DISTRICT", parentId: "state-1" },
//   { id: "district-2", name: "Anantapur", type: "DISTRICT", parentId: "state-1" },
//   { id: "district-3", name: "Ranga Reddy", type: "DISTRICT", parentId: "state-2" },
//   { id: "district-4", name: "Medak", type: "DISTRICT", parentId: "state-2" },
//   { id: "district-5", name: "Bangalore Urban", type: "DISTRICT", parentId: "state-3" },
//   { id: "mandal-1", name: "Chittoor Mandal", type: "MANDAL", parentId: "district-1" },
//   { id: "mandal-2", name: "Madanapalle", type: "MANDAL", parentId: "district-1" },
//   { id: "mandal-3", name: "Kadiri", type: "MANDAL", parentId: "district-2" },
//   { id: "mandal-4", name: "Gandhi Pet", type: "MANDAL", parentId: "district-3" },
//   { id: "mandal-5", name: "Siddipet", type: "MANDAL", parentId: "district-4" },
//   { id: "mandal-6", name: "Anekal", type: "MANDAL", parentId: "district-5" },
// ];

// // Set to true to use mock data, false to use real API (when available)
// const USE_MOCK_DATA = true;

// // Simulate network delay in milliseconds
// const NETWORK_DELAY = 500;

// // Simulate network delay
// const simulateNetworkDelay = () => 
//   new Promise(resolve => setTimeout(resolve, NETWORK_DELAY));

// // Filter locations based on parameters
// const filterLocations = (
//   locations: Location[], 
//   type?: string, 
//   parentId?: string, 
//   stateId?: string
// ): Location[] => {
//   return locations.filter(location => {
//     if (type && location.type !== type) return false;
    
//     if (parentId) {
//       const parentIds = parentId.split(',');
//       if (!parentIds.includes(location.parentId || '')) return false;
//     }
    
//     if (stateId && location.type === "DISTRICT") {
//       const stateIds = stateId.split(',');
//       if (!stateIds.includes(location.parentId || '')) return false;
//     }
    
//     return true;
//   });
// };

// // Get paginated results
// const getPaginatedResults = (
//   items: any[],
//   page: number = 1,
//   limit: number = 10
// ) => {
//   const startIndex = (page - 1) * limit;
//   const endIndex = startIndex + limit;
//   const paginatedItems = items.slice(startIndex, endIndex);
//   const totalPages = Math.ceil(items.length / limit);
//   const nextPage = page < totalPages ? page + 1 : -1;
  
//   return {
//     items: paginatedItems,
//     count: paginatedItems.length,
//     page,
//     limit,
//     totalPages,
//     nextPage
//   };
// };

// export const locationService = {
//   /**
//    * Fetches a paginated list of locations (e.g., states, districts) from the API.
//    * @param type - The type of location (e.g., STATE, DISTRICT).
//    * @param parentId - Comma-separated parent IDs (optional).
//    * @param stateId - Comma-separated state IDs (optional).
//    * @param page - The current page number to fetch (default: 1).
//    * @param limit - The number of items per page (default: 10).
//    * @param language - The language code for location names (default: en).
//    * @param authToken - The Basic Authentication token.
//    * @returns An object with success status and either the data or an error message.
//    */
//   fetchLocations: async (
//     type: string,
//     parentId: string | undefined,
//     stateId: string | undefined,
//     page: number = 1,
//     limit: number = 10,
//     language: string = "en",
//     authToken: string
//   ) => {
//     try {
//       if (USE_MOCK_DATA) {
//         await simulateNetworkDelay();
        
//         const filteredLocations = filterLocations(sampleLocations, type, parentId, stateId);
//         const paginatedResults = getPaginatedResults(filteredLocations, page, limit);
        
//         const responseData: LocationResponse = {
//           statusCode: "SUCCESS",
//           message: "Operation successful",
//           data: paginatedResults.items,
//           count: paginatedResults.count,
//           page: paginatedResults.page,
//           limit: paginatedResults.limit,
//           totalPages: paginatedResults.totalPages,
//           nextPage: paginatedResults.nextPage
//         };
        
//         return { success: true, data: responseData };
//       } else {
//         const response = await api.get<LocationResponse>("/locations", {
//           headers: {
//             Authorization: `Basic ${authToken}`,
//             "x-language": language,
//           },
//           params: {
//             type,
//             parentId,
//             page,
//             limit,
//             stateId,
//           },
//         });
//         return { success: true, data: response.data };
//       }
//     } catch (error: any) {
//       console.error("Error fetching locations:", error);
//       return {
//         success: false,
//         message: error.response?.data?.message || "Failed to fetch locations. Please try again.",
//         statusCode: error.response?.status || 500
//       };
//     }
//   },

//   /**
//    * Fetches a paginated list of districts for a given state.
//    * @param stateId - The state ID or parent ID.
//    * @param parentId - Comma-separated parent IDs (optional).
//    * @param page - The current page number to fetch (default: 1).
//    * @param limit - The number of items per page (default: 10).
//    * @param language - The language code for location names (default: en).
//    * @param authToken - The Basic Authentication token.
//    * @returns An object with success status and either the data or an error message.
//    */
//   fetchStateDistricts: async (
//     stateId: string,
//     parentId: string | undefined,
//     page: number = 1,
//     limit: number = 10,
//     language: string = "en",
//     authToken: string
//   ) => {
//     try {
//       if (USE_MOCK_DATA) {
//         await simulateNetworkDelay();
        
//         const filteredLocations = filterLocations(sampleLocations, "DISTRICT", parentId, stateId);
//         const paginatedResults = getPaginatedResults(filteredLocations, page, limit);
        
//         const responseData: LocationListResponse = {
//           statusCode: "SUCCESS",
//           message: "Operation successful",
//           data: {
//             locations: paginatedResults.items,
//             count: paginatedResults.count,
//             page: paginatedResults.page,
//             limit: paginatedResults.limit,
//             totalPages: paginatedResults.totalPages,
//             nextPage: paginatedResults.nextPage
//           }
//         };
        
//         return { success: true, data: responseData };
//       } else {
//         const response = await api.get<LocationListResponse>("/locations/state/districts", {
//           headers: {
//             Authorization: `Basic ${authToken}`,
//             "x-language": language,
//           },
//           params: {
//             stateId,
//             parentId,
//             page,
//             limit,
//           },
//         });
//         return { success: true, data: response.data };
//       }
//     } catch (error: any) {
//       console.error("Error fetching districts:", error);
//       return {
//         success: false,
//         message: error.response?.data?.message || "Failed to fetch districts. Please try again.",
//         statusCode: error.response?.status || 500
//       };
//     }
//   },

//   /**
//    * Fetches a paginated list of cities (mandals) for a given district.
//    * @param parentId - Comma-separated parent (district) IDs.
//    * @param page - The current page number to fetch (default: 1).
//    * @param limit - The number of items per page (default: 10).
//    * @param language - The language code for location names (default: en).
//    * @param authToken - The Basic Authentication token.
//    * @returns An object with success status and either the data or an error message.
//    */
//   fetchDistrictCities: async (
//     parentId: string,
//     page: number = 1,
//     limit: number = 10,
//     language: string = "en",
//     authToken: string
//   ) => {
//     try {
//       if (USE_MOCK_DATA) {
//         await simulateNetworkDelay();
        
//         const filteredLocations = filterLocations(sampleLocations, "MANDAL", parentId);
//         const paginatedResults = getPaginatedResults(filteredLocations, page, limit);
        
//         const responseData: LocationListResponse = {
//           statusCode: "SUCCESS",
//           message: "Operation successful",
//           data: {
//             locations: paginatedResults.items,
//             count: paginatedResults.count,
//             page: paginatedResults.page,
//             limit: paginatedResults.limit,
//             totalPages: paginatedResults.totalPages,
//             nextPage: paginatedResults.nextPage
//           }
//         };
        
//         return { success: true, data: responseData };
//       } else {
//         const response = await api.get<LocationListResponse>("/locations/district/cities", {
//           headers: {
//             Authorization: `Basic ${authToken}`,
//             "x-language": language,
//           },
//           params: {
//             parentId,
//             page,
//             limit,
//           },
//         });
//         return { success: true, data: response.data };
//       }
//     } catch (error: any) {
//       console.error("Error fetching cities:", error);
//       return {
//         success: false,
//         message: error.response?.data?.message || "Failed to fetch cities. Please try again.",
//         statusCode: error.response?.status || 500
//       };
//     }
//   },
// };



import { Location, LocationListResponse } from './locationService';

// Set to true to use mock data
const USE_MOCK_DATA = true;

// Simulate network delay in milliseconds
const NETWORK_DELAY = 500;

// Simulate network delay
const simulateNetworkDelay = () => 
  new Promise(resolve => setTimeout(resolve, NETWORK_DELAY));

// Minimal mock data for locations
const sampleLocations: Location[] = [
  { id: 'state1', name: 'Karnataka', type: 'state', parentId: null },
  { id: 'state2', name: 'Maharashtra', type: 'state', parentId: null },
  { id: 'district1', name: 'Bangalore', type: 'district', parentId: 'state1' },
  { id: 'district2', name: 'Pune', type: 'district', parentId: 'state2' },
  { id: 'city1', name: 'Mandya', type: 'city', parentId: 'district1' },
  { id: 'city2', name: 'Shivaji Nagar', type: 'city', parentId: 'district2' },
];

// Filter locations based on parameters
const filterLocations = (
  locations: Location[],
  type: 'state' | 'district' | 'city',
  parentId?: string,
  stateId?: string
): Location[] => {
  return locations.filter(location => {
    // Type filter
    if (location.type !== type) {
      return false;
    }

    // Parent ID filter
    if (parentId) {
      const parentIds = parentId.split(',');
      if (!parentIds.includes(location.parentId || '')) {
        return false;
      }
    }

    // State ID filter
    if (stateId) {
      const stateIds = stateId.split(',');
      if (type === 'state') {
        if (!stateIds.includes(location.id)) {
          return false;
        }
      } else {
        if (!stateIds.includes(location.parentId || '')) {
          return false;
        }
      }
    }

    return true;
  });
};

// Get paginated results
const getPaginatedResults = (items: Location[], page: number, limit: number) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);
  const totalPages = Math.ceil(items.length / limit);
  const nextPage = page < totalPages ? page + 1 : -1;

  return {
    locations: paginatedItems,
    count: items.length,
    totalPages,
    nextPage,
    limit,
    page,
  };
};

export const locationServiceMock = {
  /**
   * Simulates fetching a paginated list of locations (states, districts, or cities).
   * @param type - The type of location (state, district, or city).
   * @param parentId - Comma-separated parent IDs (optional).
   * @param stateId - Comma-separated state IDs (optional).
   * @param page - The current page number (default: 1).
   * @param limit - The number of items per page (default: 10).
   * @param language - The language code for location names (default: en).
   * @param authToken - The Basic Authentication token (optional).
   * @returns An object with success status and either the data or an error message.
   */
  fetchLocations: async (
    type: 'state' | 'district' | 'city',
    parentId?: string,
    stateId?: string,
    page: number = 1,
    limit: number = 10,
    language: string = 'en',
    authToken?: string
  ) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();

        const filteredLocations = filterLocations(sampleLocations, type, parentId, stateId);

        const paginatedResults = getPaginatedResults(filteredLocations, page, limit);

        const responseData: LocationListResponse = {
          statusCode: 200,
          message: 'Success',
          data: {
            locations: paginatedResults.locations,
            count: paginatedResults.count,
            totalPages: paginatedResults.totalPages,
            nextPage: paginatedResults.nextPage,
            limit: paginatedResults.limit,
            page: paginatedResults.page,
          },
        };

        return { success: true, data: responseData.data };
      } else {
        // This block is for reference; it won't be used since USE_MOCK_DATA is true
        const response = await fetch('/api/v1/locations/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-language': language,
            ...(authToken && { Authorization: `Basic ${authToken}` }),
          },
          // Note: Actual params would need to be serialized for fetch
        });
        if (!response.ok) {
          throw new Error('Failed to fetch locations');
        }
        const data = await response.json();
        return { success: true, data: data.data };
      }
    } catch (error: any) {
      console.error('Error fetching locations:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch locations.',
      };
    }
  },

  /**
   * Simulates fetching a paginated list of districts for given states.
   * @param stateId - Comma-separated state IDs.
   * @param parentId - Comma-separated parent IDs (optional).
   * @param page - The current page number (default: 1).
   * @param limit - The number of items per page (default: 10).
   * @param language - The language code for location names (default: en).
   * @param authToken - The Basic Authentication token (optional).
   * @returns An object with success status and either the data or an error message.
   */
  fetchStateDistricts: async (
    stateId: string,
    parentId?: string,
    page: number = 1,
    limit: number = 10,
    language: string = 'en',
    authToken?: string
  ) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();

        const filteredLocations = filterLocations(sampleLocations, 'district', parentId, stateId);

        const paginatedResults = getPaginatedResults(filteredLocations, page, limit);

        const responseData: LocationListResponse = {
          statusCode: 200,
          message: 'Success',
          data: {
            locations: paginatedResults.locations,
            count: paginatedResults.count,
            totalPages: paginatedResults.totalPages,
            nextPage: paginatedResults.nextPage,
            limit: paginatedResults.limit,
            page: paginatedResults.page,
          },
        };

        return { success: true, data: responseData.data };
      } else {
        // This block is for reference; it won't be used since USE_MOCK_DATA is true
        const response = await fetch('/api/v1/locations/state/districts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-language': language,
            ...(authToken && { Authorization: `Basic ${authToken}` }),
          },
          // Note: Actual params would need to be serialized for fetch
        });
        if (!response.ok) {
          throw new Error('Failed to fetch districts');
        }
        const data = await response.json();
        return { success: true, data: data.data };
      }
    } catch (error: any) {
      console.error('Error fetching districts:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch districts.',
      };
    }
  },

  /**
   * Simulates fetching a paginated list of cities for given districts.
   * @param parentId - Comma-separated district IDs.
   * @param page - The current page number (default: 1).
   * @param limit - The number of items per page (default: 10).
   * @param language - The language code for location names (default: en).
   * @param authToken - The Basic Authentication token (optional).
   * @returns An object with success status and either the data or an error message.
   */
  fetchDistrictCities: async (
    parentId: string,
    page: number = 1,
    limit: number = 10,
    language: string = 'en',
    authToken?: string
  ) => {
    try {
      if (USE_MOCK_DATA) {
        await simulateNetworkDelay();

        const filteredLocations = filterLocations(sampleLocations, 'city', parentId, undefined);

        const paginatedResults = getPaginatedResults(filteredLocations, page, limit);

        const responseData: LocationListResponse = {
          statusCode: 200,
          message: 'Success',
          data: {
            locations: paginatedResults.locations,
            count: paginatedResults.count,
            totalPages: paginatedResults.totalPages,
            nextPage: paginatedResults.nextPage,
            limit: paginatedResults.limit,
            page: paginatedResults.page,
          },
        };

        return { success: true, data: responseData.data };
      } else {
        // This block is for reference; it won't be used since USE_MOCK_DATA is true
        const response = await fetch('/api/v1/locations/district/cities', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-language': language,
            ...(authToken && { Authorization: `Basic ${authToken}` }),
          },
          // Note: Actual params would need to be serialized for fetch
        });
        if (!response.ok) {
          throw new Error('Failed to fetch cities');
        }
        const data = await response.json();
        return { success: true, data: data.data };
      }
    } catch (error: any) {
      console.error('Error fetching cities:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch cities.',
      };
    }
  },
};
