import React, { useState } from 'react';
import { Filter, Download, Leaf, Droplets, BarChart3 } from 'lucide-react';

const CarbonReports = () => {
  const [filters, setFilters] = useState({
    region: '',
    dateRange: '',
    farmer: ''
  });

  const carbonData = [
    {
      id: 1,
      farmer: 'Rajesh Kumar',
      region: 'Ahmedabad',
      ghgEmissions: '2.5 tons CO2',
      biodiversity: 'Improved',
      farmland: '5.5 acres',
      waterUsage: '500L/day',
      period: 'Q1 2024'
    },
    {
      id: 2,
      farmer: 'Priya Sharma',
      region: 'Surat',
      ghgEmissions: '1.8 tons CO2',
      biodiversity: 'Stable',
      farmland: '3.2 acres',
      waterUsage: '300L/day',
      period: 'Q1 2024'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Carbon Reports</h1>
          <p className="text-gray-600 mt-1">Track environmental impact and sustainability metrics</p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
          <Download size={20} />
          Export PDF
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
            <select 
              value={filters.region}
              onChange={(e) => setFilters({...filters, region: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Regions</option>
              <option value="ahmedabad">Ahmedabad</option>
              <option value="surat">Surat</option>
              <option value="rajkot">Rajkot</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select 
              value={filters.dateRange}
              onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select Period</option>
              <option value="q1-2024">Q1 2024</option>
              <option value="q2-2024">Q2 2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Farmer</label>
            <select 
              value={filters.farmer}
              onChange={(e) => setFilters({...filters, farmer: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Farmers</option>
              <option value="rajesh">Rajesh Kumar</option>
              <option value="priya">Priya Sharma</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter size={20} />
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total GHG Emissions</p>
              <p className="text-2xl font-bold text-red-600">4.3 tons CO2</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Biodiversity Index</p>
              <p className="text-2xl font-bold text-green-600">78%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Farmland</p>
              <p className="text-2xl font-bold text-blue-600">8.7 acres</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Water Usage</p>
              <p className="text-2xl font-bold text-cyan-600">800L/day</p>
            </div>
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
              <Droplets className="w-6 h-6 text-cyan-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Farmer
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Region
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                GHG Emissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Biodiversity
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Farmland
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Water Usage
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Period
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {carbonData.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {record.farmer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {record.region}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {record.ghgEmissions}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    record.biodiversity === 'Improved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {record.biodiversity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {record.farmland}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {record.waterUsage}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {record.period}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarbonReports;