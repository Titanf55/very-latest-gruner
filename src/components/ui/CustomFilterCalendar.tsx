import React from 'react';
import DatePicker from 'react-datepicker';
import { X } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';

export interface CustomFilterCalendarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  showResetButton?: boolean;
}

const CustomFilterCalendar: React.FC<CustomFilterCalendarProps> = ({
  value,
  onChange,
  placeholder = 'Select date',
  className = '',
  disabled = false,
  showResetButton = true
}) => {
  const handleDateChange = (date: Date | null) => {
    if (date) {
      onChange(date.toISOString().split('T')[0]);
    } else {
      onChange('');
    }
  };

  const handleReset = () => {
    onChange('');
  };

  return (
    <div className={`p-4 mb-4 ${className}`}>
      <label className="text-sm font-medium text-gray-700 block mb-2">
        {placeholder}
      </label>
      <div className="relative">
        <DatePicker
          selected={value ? new Date(value) : null}
          onChange={handleDateChange}
          customInput={
            <button
              disabled={disabled}
              className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-lg text-left hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                disabled ? 'bg-gray-100 cursor-not-allowed opacity-50' : ''
              }`}
              style={{ fontFamily: 'Roboto' }}
            >
              {value ? new Date(value).toLocaleDateString() : placeholder}
            </button>
          }
          dateFormat="yyyy-MM-dd"
          showPopperArrow={false}
          popperPlacement="bottom-start"
          popperClassName="react-datepicker-popper"
          calendarClassName="react-datepicker-calendar"
          wrapperClassName="date-picker-wrapper"
          disabled={disabled}
        />
        {showResetButton && value && !disabled && (
          <button
            onClick={handleReset}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
            title="Clear date"
          >
            <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomFilterCalendar;
