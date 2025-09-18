import React, { useState } from 'react';
import { Search, Filter, Download, Eye } from 'lucide-react';

const PaymentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const payments = [
    {
      id: 'PAY-2024-001',
      farmer: 'Rajesh Kumar',
      service: 'Soil Testing',
      amount: '₹500',
      status: 'Completed',
      date: '2024-01-15',
      paymentMethod: 'UPI',
      kisaniDidi: 'Meera Patel',
      commission: '₹50'
    },
    {
      id: 'PAY-2024-002',
      farmer: 'Priya Sharma', 
      service: 'Crop Advisory',
      amount: '₹300',
      status: 'Pending',
      date: '2024-01-14',
      paymentMethod: 'Bank Transfer',
      kisaniDidi: 'Ravi Gupta',
      commission: '₹30'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-gray-600 mt-1">Track transactions, payouts, and commission payments</p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
          <Download size={20} />
          Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
          <p className="text-2xl font-bold text-green-600">₹45,230</p>
          <p className="text-xs text-gray-500">This month</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600">Pending Payments</h3>
          <p className="text-2xl font-bold text-yellow-600">₹8,500</p>
          <p className="text-xs text-gray-500">5 transactions</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600">KD Commissions</h3>
          <p className="text-2xl font-bold text-blue-600">₹4,520</p>
          <p className="text-xs text-gray-500">To be paid</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600">Failed Payments</h3>
          <p className="text-2xl font-bold text-red-600">₹1,200</p>
          <p className="text-xs text-gray-500">2 transactions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter size={20} />
          More Filters
        </button>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Payment ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Farmer
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                KD Commission
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {payment.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {payment.farmer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {payment.service}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {payment.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    payment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {payment.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {payment.commission}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="p-1 text-gray-400 hover:text-blue-600">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentManagement;