// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/auth/Login';
// import Dashboard from './components/dashboard/Dashboard';
// import Layout from './components/layout/Layout';
// import FarmerManagement from './components/farmers/FarmerManagement';
// import FarmerProfile from './components/farmers/FarmerProfile';
// import AddFarmer from './components/farmers/AddFarmer';
// import EditFarmer from './components/farmers/EditFarmer';
// import KisaniDidiManagement from './components/kisani-didi/KisaniDidiManagement';
// import KisaniDidiProfile from './components/kisani-didi/KisaniDidiProfile';
// import TaskManagement from './components/tasks/TaskManagement';
// // FarmManager
// import FarmManagerManagement from './components/farm-managers/FarmManagerManagement';
// import FarmManagerProfile from './components/farm-managers/FarmManagerProfile';
// import AddFarmManager from './components/farm-managers/AddFarmManager';
// import EditFarmManager from './components/farm-managers/EditFarmManager';
// // FarmOperator
// import FarmOperatorManagement from './components/farm-operator/FarmOperatorManagement';
// import FarmOperatorProfile from './components/farm-operator/FarmOperatorProfile';
// import AddFarmOperator from './components/farm-operator/AddOperatorManager';
// import EditFarmOperator from './components/farm-operator/EditOperatorManager';
// //both are replicas operator and management 
// import AttendanceManagement from './components/attendance/AttendanceManagement';
// import CarbonReports from './components/carbon/CarbonReports';
// import BookingManagement from './components/bookings/BookingManagement';
// import StaticContent from './components/static/StaticContent';
// import NotificationManagement from './components/notifications/NotificationManagement';
// import PaymentManagement from './components/payments/PaymentManagement';
// import SubAdminManagement from './components/sub-admin/SubAdminManagement';
// import Settings from './components/settings/Settings';
// import AddKisaniDidi from './components/kisani-didi/AddKisaniDidi';
// import EditKisaniDidi from './components/kisani-didi/EditKisaniDidi';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleLogin = () => {
//     setIsAuthenticated(true);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//   };

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50">
//         {!isAuthenticated ? (
//           <Login onLogin={handleLogin} />
//         ) : (
//           <Layout onLogout={handleLogout}>
//             <Routes>
//               <Route path="/" element={<Navigate to="/dashboard" />} />
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/farmers" element={<FarmerManagement />} />
//               <Route path="/farmers/add" element={<AddFarmer />} />
//               <Route path="/farmers/edit/:id" element={<EditFarmer />} />
//               <Route path="/farmers/:id" element={<FarmerProfile />} />
//               <Route path="/kisani-didi" element={<KisaniDidiManagement />} />
//               <Route path="/kisani-didi/:id" element={<KisaniDidiProfile />} />
//               <Route path="/kisani-didi/add" element={<AddKisaniDidi />} />
//               <Route path="/kisani-didi/edit/:id" element={<EditKisaniDidi />} />
//               {/* this is farmer management */}
//               <Route path="/farm-managers" element={<FarmManagerManagement />} />
//               <Route path="/farm-managers/add" element={<AddFarmManager />} />
//               <Route path="/farm-managers/edit/:id" element={<EditFarmManager />} />
//               <Route path="/farm-managers/:id" element={<FarmManagerProfile />} />
//               {/* this is operator management */}
//               <Route path="/farm-operators" element={<FarmOperatorManagement/>}/>
//               <Route path="/farm-operators/add" element={<AddFarmOperator />}/>
//               <Route path="/farm-operators/edit/:id" element={<EditFarmOperator/>}/>
//               <Route path="/farm-operators/:id" element={<FarmOperatorProfile/>} />
//               <Route path="/tasks" element={<TaskManagement />} />
//               <Route path="/attendance" element={<AttendanceManagement />} />
//               <Route path="/carbon-reports" element={<CarbonReports />} />
//               <Route path="/bookings" element={<BookingManagement />} />
//               <Route path="/static-content" element={<StaticContent />} />
//               <Route path="/notifications" element={<NotificationManagement />} />
//               <Route path="/payments" element={<PaymentManagement />} />
//               <Route path="/sub-admins" element={<SubAdminManagement />} />
//               <Route path="/settings" element={<Settings />} />
//             </Routes>
//           </Layout>
//         )}
//       </div>
//     </Router>
//   );
// }

// export default App;


// App.tsx
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

