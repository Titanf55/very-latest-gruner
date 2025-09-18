import React from 'react';
import { Card } from '../../ui';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ['Overview', 'Machinery & Livestock', 'Land & Crop'];

  return (
    <Card variant="tab" className="mt-8 mb-6 py-1 px-1">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab}
             type='button'// Add this line to prevent form submission
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-gray-800 font-medium text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </Card>
  );
};

export default TabNavigation;
