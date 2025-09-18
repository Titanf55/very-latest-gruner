// ============================================================================
// TASK FILTER COMPONENT
// ============================================================================

import React from 'react';
import CustomFilter, { CustomFilterActions } from "../../ui/CustomFilter";
import CustomSelect from "../../ui/CustomSelect";
import { FilterState, FilterOption } from '../types';

interface TaskFilterProps {
  showFilter: boolean;
  setShowFilter: (show: boolean) => void;
  filters: FilterState;
  hasActiveFilters: () => boolean;
  handleFilterChange: (key: keyof FilterState, value: string) => void;
  handleResetFilters: (resetPagination?: () => void) => void;
  handleApplyFilters: (resetPagination?: () => void) => void;
  isApplyDisabled: () => boolean;
  resetPagination: () => void;
  assignedToOptions: FilterOption[];
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  showFilter,
  setShowFilter,
  filters,
  hasActiveFilters,
  handleFilterChange,
  handleResetFilters,
  handleApplyFilters,
  isApplyDisabled,
  resetPagination,
  assignedToOptions,
}) => {
  return (
    <CustomFilter
      isOpen={showFilter}
      onToggle={() => setShowFilter(!showFilter)}
      onClose={() => setShowFilter(false)}
      hasActiveFilters={hasActiveFilters()}
      title="Filter by"
      height="h-[250px]"
    >
      <div className="space-y-4">
        {/* Assigned To Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
          <div className="relative">
            <CustomSelect
              value={filters.assignedTo}
              onChange={(value) => handleFilterChange("assignedTo", value)}
              options={assignedToOptions}
              placeholder="All User Type"
              className="h-8"
              enableInfiniteScroll={true}
              maxHeight="200px"
            />
          </div>
        </div>

        {/* Filter Actions */}
        <CustomFilterActions
          onReset={() => handleResetFilters(resetPagination)}
          onApply={() => handleApplyFilters(resetPagination)}
          isApplyDisabled={isApplyDisabled()}
        />
      </div>
    </CustomFilter>
  );
};

export default TaskFilter;
