import React, { useState } from 'react';
import { Plus, Edit, Trash2, FileText } from 'lucide-react';

const StaticContent = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const content = [
    { id: 1, title: 'Terms & Conditions', type: 'Terms', lastUpdated: '2024-01-15', status: 'Published' },
    { id: 2, title: 'Privacy Policy', type: 'Privacy', lastUpdated: '2024-01-14', status: 'Published' },
    { id: 3, title: 'About Us', type: 'About', lastUpdated: '2024-01-13', status: 'Published' },
    { id: 4, title: 'FAQ - Farmers', type: 'FAQ', lastUpdated: '2024-01-12', status: 'Draft' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Static Content Management</h1>
          <p className="text-gray-600 mt-1">Manage terms, policies, FAQs, and other static content</p>
        </div>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2">
          <Plus size={20} />
          Add New Content
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {['all', 'terms', 'privacy', 'faq', 'about'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
              activeTab === tab
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab === 'all' ? 'All Content' : tab}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {content.map((item) => (
          <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.type}</p>
                  <p className="text-xs text-gray-500 mt-1">Last updated: {item.lastUpdated}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                item.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {item.status}
              </span>
            </div>
            
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">
                <Edit size={16} />
                Edit
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaticContent;