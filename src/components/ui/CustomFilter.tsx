import React from 'react';
import { ChevronDown, X } from 'lucide-react';
import CustomSelect from './CustomSelect';

interface FilterOption {
  value: string;
  label: string;
}

interface CustomFilterProps {
  isOpen: boolean;
  onToggle: () => void;
  hasActiveFilters: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
  height?: string;
  children: React.ReactNode;
}

const CustomFilter: React.FC<CustomFilterProps> = ({
  isOpen,
  onToggle,
  hasActiveFilters,
  onClose,
  title = "Filter by",
  className = "",
  height = "h-[450px]",
  children
}) => {
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={onToggle}
        className={`flex items-center gap-2 px-4 py-2 transition-colors ${
          hasActiveFilters ? 'relative' : 'border-gray-300'
        }`}
      >
        <img
          src="/filter.svg"
          alt="Filter"
          className={hasActiveFilters ? 'relative' : ''}
        />
        {hasActiveFilters && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className={`p-4 space-y-4 ${height}`}>
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={19} className="text-[#000000]" />
              </button>
            </div>

            <div className="space-y-4">
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Custom Select Component for filters
interface CustomFilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  placeholder: string;
  disabled?: boolean;
  className?: string;
}

const CustomFilterSelect: React.FC<CustomFilterSelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  className = ""
}) => {
  return (
    <div className={className}>
      <CustomSelect
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        disabled={disabled}
        className="h-10"
      />
    </div>
  );
};

// Custom Range Input Component
interface CustomFilterRangeProps {
  fromValue: string;
  toValue: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  label: string;
  disabled?: boolean;
  className?: string;
}

const CustomFilterRange: React.FC<CustomFilterRangeProps> = ({
  fromValue,
  toValue,
  onFromChange,
  onToChange,
  label,
  disabled = false,
  className = ""
}) => {
  return (
    <div className={`border rounded p-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <label className="whitespace-nowrap">From</label>
          <input
            type="number"
            min="0"
            placeholder=""
            value={fromValue}
            onChange={(e) => onFromChange(e.target.value)}
            disabled={disabled}
            className="w-[60px] px-3 py-2 border border-gray-300 rounded-md focus:border-transparent no-spin disabled:opacity-50"
          />
        </div>
        <div className="flex items-center gap-1">
          <label className="whitespace-nowrap">To</label>
          <input
            type="number"
            placeholder=""
            value={toValue}
            onChange={(e) => onToChange(e.target.value)}
            disabled={disabled}
            className="w-[60px] px-3 py-2 border border-gray-300 rounded-md focus:border-transparent no-spin disabled:opacity-50"
          />
        </div>
      </div>
    </div>
  );
};

// Custom Filter Actions Component
interface CustomFilterActionsProps {
  onReset: () => void;
  onApply: () => void;
  isApplyDisabled: boolean;
  className?: string;
}

const CustomFilterActions: React.FC<CustomFilterActionsProps> = ({
  onReset,
  onApply,
  isApplyDisabled,
  className = ""
}) => {
  return (
    <div className={`flex items-center gap-2 pt-3 ${className}`}>
      <button
        onClick={onReset}
        className="flex-1 px-3 py-2 font-bold text-black bg-white border border-gray-300 rounded-md transition-colors"
      >
        Reset
      </button>
      <button
        onClick={onApply}
        disabled={isApplyDisabled}
        className="flex-1 px-3 py-2 bg-[#D9D9D9] font-bold text-black border border-gray-300 rounded-md transition-colors disabled:opacity-50"
      >
        Apply
      </button>
    </div>
  );
};

export default CustomFilter;
export { CustomFilterSelect, CustomFilterRange, CustomFilterActions };
export type { FilterOption, CustomFilterProps, CustomFilterSelectProps, CustomFilterRangeProps, CustomFilterActionsProps };
