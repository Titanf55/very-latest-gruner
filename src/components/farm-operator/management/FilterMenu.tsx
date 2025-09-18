import React from 'react';
import { ChevronDown, X } from 'lucide-react';

interface FilterMenuProps {
  showFilterMenu: boolean;
  setShowFilterMenu: (show: boolean) => void;
  activeTab: string;
  filters: {
    status: string;
    state: string;
    district: string;
    mandal: string;
  };
  appliedFilters: {
    status: string;
    state: string;
    district: string;
    mandal: string;
  };
  handleFilterChange: (field: string, value: string) => void;
  handleResetFilters: () => void;
  handleApplyFilters: () => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({
  showFilterMenu,
  setShowFilterMenu,
  activeTab,
  filters,
  appliedFilters,
  handleFilterChange,
  handleResetFilters,
  handleApplyFilters
}) => {
  return (
    <div className="relative">
      <button 
        onClick={() => setShowFilterMenu(!showFilterMenu)}
        className={`p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-lg ${
          Object.values(appliedFilters).some(value => value !== '') ? 'relative' : ''
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
        <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 space-y-4 h-[390px]">
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
              {/* Status Filter - Only show for 'all' tab */}
              {activeTab === 'all' && (
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
              )}

              {/* State Filter */}
              <div className="relative">
                <select
                  value={filters.state}
                  onChange={(e) => handleFilterChange('state', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">States</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Rajasthan">Rajasthan</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
                  size={20}
                />
              </div>

              {/* District Filter */}
              <div className="relative">
                <select
                  value={filters.district}
                  onChange={(e) => handleFilterChange('district', e.target.value)}
                  disabled={!filters.state}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                >
                  <option value="">Districts</option>
                  {filters.state === 'Punjab' && (
                    <>
                      <option value="Ludhiana">Ludhiana</option>
                      <option value="Amritsar">Amritsar</option>
                    </>
                  )}
                  {filters.state === 'Haryana' && (
                    <>
                      <option value="Karnal">Karnal</option>
                      <option value="Panipat">Panipat</option>
                    </>
                  )}
                  {filters.state === 'Rajasthan' && (
                    <>
                      <option value="Jaipur">Jaipur</option>
                      <option value="Udaipur">Udaipur</option>
                    </>
                  )}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
                  size={20}
                />
              </div>

              {/* Mandal Filter */}
              <div className="relative">
                <select
                  value={filters.mandal}
                  onChange={(e) => handleFilterChange('mandal', e.target.value)}
                  disabled={!filters.district}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                >
                  <option value="">Mandals</option>
                  {filters.district === 'Ludhiana' && (
                    <option value="Ludhiana-I">Ludhiana-I</option>
                  )}
                  {filters.district === 'Karnal' && (
                    <option value="Karnal-II">Karnal-II</option>
                  )}
                  {filters.district === 'Amritsar' && (
                    <option value="Amritsar-I">Amritsar-I</option>
                  )}
                  {filters.district === 'Panipat' && (
                    <option value="Panipat-I">Panipat-I</option>
                  )}
                  {filters.district === 'Jaipur' && (
                    <option value="Sanganer">Sanganer</option>
                  )}
                  {filters.district === 'Udaipur' && (
                    <option value="Girwa">Girwa</option>
                  )}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
                  size={20}
                />
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
                className="flex-1 px-3 py-2 bg-[#D9D9D9] font-bold text-black border border-gray-300 rounded-md transition-colors"
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
