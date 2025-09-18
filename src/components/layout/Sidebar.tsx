import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  UserCog, 
  ClipboardList, 
  Clock, 
  Leaf, 
  Calendar, 
  FileText, 
  Bell, 
  CreditCard, 
  Shield, 
  Settings,
  Sprout,
  ChevronLeft
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Farmer Management', path: '/farmers' },
    { icon: UserCheck, label: 'Kisani Didi Management', path: '/kisani-didi' },
    { icon: UserCog, label: 'Farm Manager Management', path: '/farm-managers' },
    { icon: UserCog, label: 'Farm Operator Management', path: '/farm-operators' },
    { icon: ClipboardList, label: 'Task Management', path: '/tasks' },
    { icon: Clock, label: 'Attendance Management', path: '/attendance' },
    // { icon: Leaf, label: 'Carbon Reports', path: '/carbon-reports' },
    // { icon: Calendar, label: 'Booking Management', path: '/bookings' },
    // { icon: FileText, label: 'Static Content', path: '/static-content' },
    // { icon: Bell, label: 'Notifications', path: '/notifications' },
    // { icon: CreditCard, label: 'Payment Management', path: '/payments' },
    // { icon: Shield, label: 'Sub-Admin Management', path: '/sub-admins' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <div className="bg-white w-80 shadow-sm border-r border-gray-200 flex flex-col">
      {/* Logo */}
     <div className="p-6 border-b h-[64px] border-gray-200">
  <div className="flex items-center justify-between h-full">
    {/* Left Section: Logo + Text */}
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
        <Sprout className="w-8 h-8 text-gray-800" />
      </div>
      <span className="text-xl font-semibold text-gray-900">
        Gruner's
      </span>
    </div>

    {/* Right Section: Arrow */}
    <ChevronLeft className="w-4 h-4 text-gray-400" />
  </div>
</div>


      {/* Navigation */}
      <nav className="flex-1 py-4">
        <div className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;