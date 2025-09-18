import React, { useState } from 'react';
import CustomSelect, { SelectOption } from './CustomSelect';

// Example component showing different usage patterns
const CustomSelectExamples: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [allOptions, setAllOptions] = useState<SelectOption[]>([
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add more options
    const newOptions: SelectOption[] = Array.from({ length: 5 }, (_, i) => ({
      value: `option${allOptions.length + i + 1}`,
      label: `Option ${allOptions.length + i + 1}`
    }));
    
    setAllOptions(prev => [...prev, ...newOptions]);
    
    // Simulate no more data after 20 options
    if (allOptions.length >= 20) {
      setHasMore(false);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold">CustomSelect Examples</h2>
      
      {/* Basic Usage */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Usage</h3>
        <CustomSelect
          value={selectedValue}
          onChange={setSelectedValue}
          options={[
            { value: 'basic1', label: 'Basic Option 1' },
            { value: 'basic2', label: 'Basic Option 2' },
            { value: 'basic3', label: 'Basic Option 3' },
          ]}
          placeholder="Select an option"
        />
      </div>

      {/* With Infinite Scroll */}
      <div>
        <h3 className="text-lg font-semibold mb-4">With Infinite Scroll</h3>
        <CustomSelect
          value={selectedValue}
          onChange={setSelectedValue}
          options={allOptions}
          placeholder="Select with infinite scroll"
          enableInfiniteScroll={true}
          hasMore={hasMore}
          isLoading={isLoading}
          onLoadMore={handleLoadMore}
          maxHeight="200px"
          loadingText="Loading more options..."
        />
      </div>

      {/* Disabled State */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Disabled State</h3>
        <CustomSelect
          value="disabled"
          onChange={() => {}}
          options={[
            { value: 'disabled', label: 'Disabled Option' }
          ]}
          placeholder="This is disabled"
          disabled={true}
        />
      </div>

      {/* With Error State */}
      <div>
        <h3 className="text-lg font-semibold mb-4">With Error State</h3>
        <CustomSelect
          value=""
          onChange={() => {}}
          options={[
            { value: 'error1', label: 'Error Option 1' },
            { value: 'error2', label: 'Error Option 2' },
          ]}
          placeholder="This has an error"
          error="This field is required"
          touched={true}
        />
      </div>
    </div>
  );
};

export default CustomSelectExamples;
