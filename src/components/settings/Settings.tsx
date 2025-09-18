import React from 'react';
import { User, Lock, Bell, Database, Globe, Shield } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account and system preferences</p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Profile Settings</h3>
              <p className="text-sm text-gray-600">Update your personal information</p>
            </div>
          </div>
          <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            Edit Profile Information
          </button>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Security</h3>
              <p className="text-sm text-gray-600">Manage passwords and security</p>
            </div>
          </div>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              Change Password
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              Two-Factor Authentication
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              <p className="text-sm text-gray-600">Configure notification preferences</p>
            </div>
          </div>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300" defaultChecked />
              <span className="ml-3 text-sm text-gray-700">Email notifications</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300" defaultChecked />
              <span className="ml-3 text-sm text-gray-700">Push notifications</span>
            </label>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">System Settings</h3>
              <p className="text-sm text-gray-600">Configure system preferences</p>
            </div>
          </div>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              Backup & Restore
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              System Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;