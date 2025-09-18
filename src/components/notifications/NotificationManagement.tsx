import React, { useState } from 'react';
import { Plus, Send, Eye, Edit } from 'lucide-react';

const NotificationManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const notifications = [
    {
      id: 1,
      title: 'New Soil Testing Service Available',
      message: 'Get your soil tested for optimal crop yield...',
      type: 'Service Update',
      audience: 'All Farmers',
      status: 'Sent',
      sentDate: '2024-01-15',
      recipients: 1234
    },
    {
      id: 2,
      title: 'Weekly Task Reminder',
      message: 'Complete your assigned tasks before the deadline...',
      type: 'Task Reminder',
      audience: 'Kisani Didis',
      status: 'Draft',
      sentDate: '-',
      recipients: 156
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notification Management</h1>
          <p className="text-gray-600 mt-1">Create and send targeted notifications to users</p>
        </div>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2">
          <Plus size={20} />
          Create Notification
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900">Send to All Farmers</h3>
          <p className="text-sm text-blue-700 mt-1">Broadcast to all registered farmers</p>
          <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
            Create
          </button>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="font-semibold text-green-900">Send to Kisani Didis</h3>
          <p className="text-sm text-green-700 mt-1">Notify all active Kisani Didis</p>
          <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">
            Create
          </button>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h3 className="font-semibold text-purple-900">Send to Region</h3>
          <p className="text-sm text-purple-700 mt-1">Target specific geographical areas</p>
          <button className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700">
            Create
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'all'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          All Notifications
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'sent'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Sent
        </button>
        <button
          onClick={() => setActiveTab('draft')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'draft'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Drafts
        </button>
      </div>

      {/* Notifications Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Audience
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Recipients
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {notifications.map((notification) => (
              <tr key={notification.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                    <p className="text-sm text-gray-600 truncate">{notification.message}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {notification.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {notification.audience}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {notification.recipients.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    notification.status === 'Sent' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {notification.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {notification.sentDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-gray-400 hover:text-blue-600">
                      <Eye size={16} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-green-600">
                      <Edit size={16} />
                    </button>
                    {notification.status === 'Draft' && (
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <Send size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationManagement;