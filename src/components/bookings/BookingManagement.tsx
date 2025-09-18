import React, { useState } from 'react';
import { Search, Filter, Eye, MoreHorizontal } from 'lucide-react';

const BookingManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const bookings = [
    {
      id: 'BK-2024-001',
      farmer: 'Rajesh Kumar',
      service: 'Soil Testing',
      date: '2024-01-20',
      status: 'Confirmed',
      amount: '₹500',
      assignedTo: 'Meera Patel'
    },
    {
      id: 'BK-2024-002', 
      farmer: 'Priya Sharma',
      service: 'Crop Advisory',
      date: '2024-01-22',
      status: 'Pending',
      amount: '₹300',
      assignedTo: 'Ravi Gupta'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
        <p className="text-gray-600 mt-1">Manage service bookings and assignments</p>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter size={20} />
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Booking ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Farmer
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Assigned To
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {booking.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {booking.farmer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {booking.service}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {booking.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {booking.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {booking.assignedTo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-gray-400 hover:text-blue-600">
                      <Eye size={16} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={16} />
                    </button>
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

export default BookingManagement;