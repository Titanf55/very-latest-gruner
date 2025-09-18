import React from 'react';
import { X } from 'lucide-react';

interface ActiveFiltersProps {
  appliedFilters: {
    state: string;
    district: string;
    mandal: string;
    landSizeFrom: string;
    landSizeTo: string;
  };
  setFilters: (filters: any) => void;
  setAppliedFilters: (filters: any) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ 
  appliedFilters, 
  setFilters, 
  setAppliedFilters 
}) => {
  const hasActiveFilters = Object.values(appliedFilters).some(value => value !== '');

  if (!hasActiveFilters) return null;

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-gray-600">Active filters:</span>
      {appliedFilters.state && (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md">
          State: {appliedFilters.state}
          <button
            onClick={() => {
              setFilters((prev: any) => ({ ...prev, state: '' }));
              setAppliedFilters((prev: any) => ({ ...prev, state: '' }));
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            <X size={12} />
          </button>
        </span>
      )}
      {appliedFilters.district && (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md">
          District: {appliedFilters.district}
          <button
            onClick={() => {
              setFilters((prev: any) => ({ ...prev, district: '' }));
              setAppliedFilters((prev: any) => ({ ...prev, district: '' }));
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            <X size={12} />
          </button>
        </span>
      )}
      {appliedFilters.mandal && (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md">
          Mandal: {appliedFilters.mandal}
          <button
            onClick={() => {
              setFilters((prev: any) => ({ ...prev, mandal: '' }));
              setAppliedFilters((prev: any) => ({ ...prev, mandal: '' }));
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            <X size={12} />
          </button>
        </span>
      )}
      {(appliedFilters.landSizeFrom || appliedFilters.landSizeTo) && (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md">
          Land Size: {appliedFilters.landSizeFrom || '0'} - {appliedFilters.landSizeTo || '∞'}
          <button
            onClick={() => {
              setFilters((prev: any) => ({ ...prev, landSizeFrom: '', landSizeTo: '' }));
              setAppliedFilters((prev: any) => ({ ...prev, landSizeFrom: '', landSizeTo: '' }));
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            <X size={12} />
          </button>
        </span>
      )}
    </div>
  );
};

export default ActiveFilters;
