import React from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Location } from '../../../services/location/locationService';

interface FilterMenuProps {
  showFilterMenu: boolean;
  setShowFilterMenu: (show: boolean) => void;
  filters: {
    status: string;
    stateId: string;
    districtId: string;
    mandalId: string;
    landSizeFrom: string;
    landSizeTo: string;
  };
  appliedFilters: {
    status: string;
    stateId: string;
    districtId: string;
    mandalId: string;
    landSizeFrom: string;
    landSizeTo: string;
  };
  states: Location[];
  districts: Location[];
  mandals: Location[];
  handleFilterChange: (filterType: string, value: string) => void;
  handleResetFilters: () => void;
  handleApplyFilters: () => void;
  isApplyDisabled: boolean;
}

const FilterMenu: React.FC<FilterMenuProps> = ({
  showFilterMenu,
  setShowFilterMenu,
  filters,
  appliedFilters,
  states,
  districts,
  mandals,
  handleFilterChange,
  handleResetFilters,
  handleApplyFilters,
  isApplyDisabled
}) => {
  return (
    <div className="relative">
      <button
        onClick={() => setShowFilterMenu(!showFilterMenu)}
        className={`flex items-center gap-2 px-4 py-2 transition-colors ${
          Object.values(appliedFilters).some(value => value !== '') ? 'relative' : 'border-gray-300'
        }`}
      >
        <img
          src="/filter.svg"
          alt="Filter"
          className={Object.values(appliedFilters).some(value => value !== '') ? 'relative' : ''}
        />
        {Object.values(appliedFilters).some(value => value !== '') && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {showFilterMenu && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 space-y-4 h-[450px]">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Filter by</h3>
              <button
                onClick={() => setShowFilterMenu(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={19} className="text-[#000000]" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Status Filter */}
              <div className="relative">
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
                  size={20}
                />
              </div>

              {/* State Filter */}
              <div className="relative">
                <select
                  value={filters.stateId}
                  onChange={(e) => handleFilterChange('stateId', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">States</option>
                  {states.map(state => (
                    <option key={state.id} value={state.id}>{state.name}</option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
                  size={20}
                />
              </div>

              {/* District Filter */}
              <div className="relative">
                <select
                  value={filters.districtId}
                  onChange={(e) => handleFilterChange('districtId', e.target.value)}
                  disabled={!filters.stateId}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                >
                  <option value="">Districts</option>
                  {districts.map(district => (
                    <option key={district.id} value={district.id}>{district.name}</option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
                  size={20}
                />
              </div>

              {/* Mandal Filter */}
              <div className="relative">
                <select
                  value={filters.mandalId}
                  onChange={(e) => handleFilterChange('mandalId', e.target.value)}
                  disabled={!filters.districtId}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                >
                  <option value="">Mandals</option>
                  {mandals.map(mandal => (
                    <option key={mandal.id} value={mandal.id}>{mandal.name}</option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
                  size={20}
                />
              </div>

              {/* Land Size Filter */}
              <div className="border rounded p-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Total land size</label>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <label className="whitespace-nowrap">From</label>
                    <input
                      type="number"
                      min="0"
                      placeholder=""
                      value={filters.landSizeFrom}
                      onChange={(e) => handleFilterChange('landSizeFrom', e.target.value)}
                      disabled={!filters.stateId}
                      className="w-[60px] px-3 py-2 border border-gray-300 rounded-md focus:border-transparent no-spin disabled:opacity-50"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <label className="whitespace-nowrap">To</label>
                    <input
                      type="number"
                      placeholder=""
                      value={filters.landSizeTo}
                      onChange={(e) => handleFilterChange('landSizeTo', e.target.value)}
                      disabled={!filters.stateId}
                      className="w-[60px] px-3 py-2 border border-gray-300 rounded-md focus:border-transparent no-spin disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3">
              <button
                onClick={handleResetFilters}
                className="flex-1 px-3 py-2 font-bold text-black bg-white border border-gray-300 rounded-md transition-colors"
              >
                Reset
              </button>
              <button
                onClick={handleApplyFilters}
                disabled={isApplyDisabled}
                className="flex-1 px-3 py-2 bg-[#D9D9D9] font-bold text-black border border-gray-300 rounded-md transition-colors disabled:opacity-50"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterMenu;
