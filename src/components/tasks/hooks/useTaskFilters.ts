// ============================================================================
// TASK FILTERS HOOK
// ============================================================================

import { useState } from 'react';
import { FilterState, Task, AssignedTask } from '../types';

export const useTaskFilters = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    assignedTo: "",
  });
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    assignedTo: "",
  });

  // Filter functions
  const hasActiveFilters = () => {
    return Object.values(appliedFilters).some(value => value !== '');
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = (resetPagination?: () => void) => {
    setFilters({
      assignedTo: "",
    });
    setAppliedFilters({
      assignedTo: "",
    });
    if (resetPagination) {
      resetPagination();
    }
  };

  const handleApplyFilters = (resetPagination?: () => void) => {
    setAppliedFilters({ ...filters });
    setShowFilter(false);
    if (resetPagination) {
      resetPagination();
    }
  };

  // Client-side filtering for mock data
  const getFilteredData = (
    data: Task[], 
    activeTab: "draft" | "assigned", 
    searchTerm: string
  ): Task[] => {
    let filteredData = data;
    
    // Apply search filter
    if (searchTerm) {
      filteredData = filteredData.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply filters only for assigned tasks
    if (activeTab === "assigned") {
      filteredData = filteredData.filter((task) => {
        const assignedTask = task as AssignedTask;
        
        // Filter by assigned to (user type)
        if (appliedFilters.assignedTo) {
          // Map frontend filter values to display labels
          const filterMap: { [key: string]: string } = {
            "farm-manager": "Farm Manager",
            "kisani-didi": "Kisani Didi",
            "operator": "Farm Operator"
          };
          const targetLabel = filterMap[appliedFilters.assignedTo];
          if (targetLabel && !assignedTask.assignedToLabel.startsWith(targetLabel)) {
            return false;
          }
        }
        
        return true;
      });
    }
    
    return filteredData;
  };

  // Check if Apply button should be enabled
  const isApplyDisabled = () => {
    return !Object.values(filters).some(value => value !== '');
  };

  return {
    // State
    showFilter,
    setShowFilter,
    filters,
    appliedFilters,
    
    // Methods
    hasActiveFilters,
    handleFilterChange,
    handleResetFilters,
    handleApplyFilters,
    getFilteredData,
    isApplyDisabled,
  };
};
