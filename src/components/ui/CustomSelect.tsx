import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  className?: string;
  // Infinite scroll props
  enableInfiniteScroll?: boolean;
  hasMore?: boolean;
  isLoading?: boolean;
  onLoadMore?: () => void;
  maxHeight?: string;
  loadingText?: string;
  // Custom styling props
  selectedOptionBgColor?: string;
  selectedOptionTextColor?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  error,
  touched,
  disabled = false,
  className = '',
  enableInfiniteScroll = false,
  hasMore = false,
  isLoading = false,
  onLoadMore,
  maxHeight = '200px',
  loadingText = 'Loading more options...',
  selectedOptionBgColor = 'bg-blue-50',
  selectedOptionTextColor = 'text-blue-700'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(option => option.value === value);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!enableInfiniteScroll || !hasMore || isLoading || !onLoadMore) return;

    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const threshold = 10; // Trigger when 10px from bottom

    if (scrollHeight - scrollTop <= clientHeight + threshold) {
      onLoadMore();
    }
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const buttonClasses = `
    w-full h-12 px-4 py-3 bg-white border rounded-xl text-gray-900 
    transition-all duration-300 focus:ring-2 focus:ring-green-100 
    focus:border-green-400 focus:outline-none shadow-sm cursor-pointer 
    flex items-center justify-between
    ${touched && error ? 'border-red-300 focus:ring-red-100 focus:border-red-400' : 'border-gray-200 hover:border-gray-300'}
    ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}
    ${className}
  `.trim();

  return (
    <div className="relative" ref={selectRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={buttonClasses}
      >
        <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          {enableInfiniteScroll ? (
            <div 
              ref={scrollRef}
              className="overflow-y-auto"
              style={{ maxHeight }}
              onScroll={handleScroll}
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleOptionClick(option.value)}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors duration-200 hover:bg-gray-100 ${
                    option.value === value ? `${selectedOptionBgColor} ${selectedOptionTextColor} font-medium` : 'text-gray-900'
                  }`}
                >
                  {option.label}
                </button>
              ))}
              
              {isLoading && (
                <div className="px-4 py-3 text-center text-gray-500 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">{loadingText}</span>
                  </div>
                </div>
              )}
              
              {!hasMore && options.length > 0 && (
                <div className="px-4 py-2 text-center text-gray-400 text-xs border-t border-gray-100">
                  No more options
                </div>
              )}
            </div>
          ) : (
            <div>
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleOptionClick(option.value)}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors duration-200 hover:bg-gray-100 ${
                    option.value === value ? `${selectedOptionBgColor} ${selectedOptionTextColor} font-medium` : 'text-gray-900'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      
      {touched && error && (
        <div className="text-red-500 text-xs mt-1">{error}</div>
      )}
    </div>
  );
};

export default CustomSelect;
