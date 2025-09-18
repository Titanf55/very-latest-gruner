import React from 'react';
import { Card } from '../../ui';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingCount: number;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab, pendingCount }) => {
  return (
    <Card variant="tab" className="w-[295px] h-[46px] p-1">
      <div className="flex items-center space-x-1">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors w-[80px] h-[38px] ${
            activeTab === 'all'
              ? 'bg-gray-800 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{ fontFamily: 'Roboto', fontSize: '14px', fontWeight: 500 }}
        >
          All FOs
        </button>

        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors w-[200px] h-[38px] ${
            activeTab === 'pending'
              ? 'bg-gray-800 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{ fontFamily: 'Roboto', fontSize: '14px', fontWeight: 500 }}
        >
          Pending Approvals ({pendingCount})
        </button>
      </div>
    </Card>
  );
};

export default TabNavigation;
