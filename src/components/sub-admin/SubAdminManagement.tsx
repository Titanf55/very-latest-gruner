import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Shield } from 'lucide-react';

const SubAdminManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const subAdmins = [
    {
      id: 1,
      name: 'Suresh Kumar',
      email: 'suresh.admin@gruner.com',
      role: 'Regional Manager',
      region: 'Gujarat North',
      permissions: ['Farmers', 'Kisani Didis', 'Tasks'],
      status: 'Active',
      lastLogin: '2024-01-15 10:30 AM'
    },
    {
      id: 2,
      name: 'Anita Patel',
      email: 'anita.admin@gruner.com', 
      role: 'Operations Manager',
      region: 'Gujarat South',
      permissions: ['Bookings', 'Payments', 'Reports'],
      status: 'Active',
      lastLogin: '2024-01-14 02:15 PM'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sub-Admin Management</h1>
          <p className="text-gray-600 mt-1">Create and manage sub-admin accounts with role-based access</p>
        </div>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2">
          <Plus size={20} />
          Add Sub-Admin
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search sub-admins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Sub-Admins Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {subAdmins.map((admin) => (
          <div key={admin.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{admin.name}</h3>
                  <p className="text-sm text-gray-600">{admin.email}</p>
                  <p className="text-sm font-medium text-blue-600">{admin.role}</p>
                </div>
              </div>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                {admin.status}
              </span>
            </div>
            
            <div className="mt-4 space-y-2">
              <div>
                <span className="text-sm text-gray-600">Region: </span>
                <span className="text-sm font-medium text-gray-900">{admin.region}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Permissions: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {admin.permissions.map((permission, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Last Login: </span>
                <span className="text-sm text-gray-900">{admin.lastLogin}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-100">
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

export default SubAdminManagement;