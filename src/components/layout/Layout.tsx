import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';
interface LayoutProps {
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({  onLogout }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLogout={onLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-6">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default Layout;