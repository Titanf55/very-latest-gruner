import React from 'react';
import { Users, UserCheck, UserCog, Calendar, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Registered Users',
      value: '2,847',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      subtitle: 'from last month'
    },
    {
      title: 'Active Farmers',
      value: '1,234',
      change: '+8%',
      changeType: 'positive',
      icon: Users,
      subtitle: 'from last month'
    },
    {
      title: 'Active Krishi Didis',
      value: '156',
      change: '+15%',
      changeType: 'positive',
      icon: UserCheck,
      subtitle: 'from last month'
    },
    {
      title: 'Active Farm Managers',
      value: '89',
      change: '+5%',
      changeType: 'positive',
      icon: UserCog,
      subtitle: 'from last month'
    },
    {
      title: 'Total Bookings (Today)',
      value: '47',
      change: '-3%',
      changeType: 'negative',
      icon: Calendar,
      subtitle: 'from last month'
    },
    {
      title: 'System Growth',
      value: '23%',
      change: '+7%',
      changeType: 'positive',
      icon: TrendingUp,
      subtitle: 'from last month'
    }
  ];

  const recentRegistrations = [
    { name: 'Rajesh Kumar', type: 'Farmer', time: '2 hours ago' },
    { name: 'Priya Sharma', type: 'Krishi Didi', time: '4 hours ago' },
    { name: 'Amit Singh', type: 'Farm Manager', time: '6 hours ago' },
    { name: 'Sunita Devi', type: 'Farmer', time: '8 hours ago' }
  ];

  const pendingApprovals = [
    { name: 'Meera Patel', type: 'KD Sign-up', priority: 'High' },
    { name: 'Ravi Gupta', type: 'FM Registration', priority: 'Medium' },
    { name: 'Kavita Singh', type: 'KD Sign-up', priority: 'High' },
    { name: 'Suresh Kumar', type: 'FM Registration', priority: 'Low' }
  ];

  return (
    <div className="space-y-6" style={{ fontFamily: 'Roboto' }}>
      <div>
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Roboto' }}>Dashboard Overview</h1>
        <p className="text-gray-600 mt-1" style={{ fontFamily: 'Roboto' }}>Welcome to Gruner's Agricultural Management System</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Roboto' }}>{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2" style={{ fontFamily: 'Roboto' }}>{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                      stat.changeType === 'positive' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500 ml-2" style={{ fontFamily: 'Roboto' }}>{stat.subtitle}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Registrations */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Roboto' }}>Recent Registrations</h3>
          <div className="space-y-4">
            {recentRegistrations.map((registration, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900" style={{ fontFamily: 'Roboto', fontSize: '13.02px' }}>{registration.name}</p>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Roboto', fontSize: '12px' }}>{registration.type}</p>
                </div>
                <span className="text-sm text-gray-500" style={{ fontFamily: 'Roboto', fontSize: '12px' }}>{registration.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Roboto' }}>Pending Approvals</h3>
          <div className="space-y-4">
            {pendingApprovals.map((approval, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900" style={{ fontFamily: 'Roboto', fontSize: '13.02px' }}>{approval.name}</p>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Roboto', fontSize: '12px' }}>{approval.type}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  approval.priority === 'High' ? 'bg-red-100 text-red-800' :
                  approval.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {approval.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;