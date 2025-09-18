
// AppRoutes.tsx
import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Dashboard from "../components/dashboard/Dashboard";
import Layout from "../components/layout/Layout";
import Login from "../components/auth/Login";
import FarmerManagement from "../components/farmers/FarmerManagement";
import FarmerProfile from "../components/farmers/FarmerProfile";
import AddFarmer from "../components/farmers/AddFarmer";
import EditFarmer from "../components/farmers/EditFarmer";
import KisaniDidiManagement from "../components/kisani-didi/KisaniDidiManagement";
import KisaniDidiProfile from "../components/kisani-didi/KisaniDidiProfile";
import EditKisaniDidi from "../components/kisani-didi/EditKisaniDidi";
import AddKisaniDidi from "../components/kisani-didi/AddkisaniDidi";
import TaskManagement from "../components/tasks/TaskManagement";
import CreateTask from "../components/tasks/CreateTask";
import FarmManagerManagement from "../components/farm-managers/FarmManagerManagement";
import FarmManagerProfile from "../components/farm-managers/FarmManagerProfile";
import AddFarmManager from "../components/farm-managers/AddManagerManager";
import EditFarmManager from "../components/farm-managers/EditManagerManager";
import FarmOperatorManagement from '../components/farm-operator/FarmOperatorManagement';
import FarmOperatorProfile from '../components/farm-operator/FarmOperatorProfile';
import AddFarmOperator from '../components/farm-operator/AddOperatorManager';
import EditFarmOperator from '../components/farm-operator/EditOperatorManager';
import AttendanceManagement from "../components/attendance/AttendanceManagement";
import CarbonReports from "../components/carbon/CarbonReports";
import BookingManagement from "../components/bookings/BookingManagement";
import StaticContent from "../components/static/StaticContent";
import NotificationManagement from "../components/notifications/NotificationManagement";
import PaymentManagement from "../components/payments/PaymentManagement";
import SubAdminManagement from "../components/sub-admin/SubAdminManagement";
import Settings from "../components/settings/Settings";
import ResetPassword from "../components/auth/ResetPassword";




// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public Route Component (redirects to dashboard if already authenticated)

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};


// export default function AppRoutes22() {
//   const { login, logout } = useAuth();

//   return useRoutes([
//     // ✅ Public routes
//     {
//       path: "/login",
//       element: (
//         <PublicRoute>
//           <Login onLogin={login} />
//         </PublicRoute>
//       ),
//     },
//     {
//       path: "/reset-password/:token", // <-- completely public
//       element: <ResetPassword />,
//     },

//     // ✅ Protected routes (only for logged in users)
//     {
//       path: "/",
//       element: (
//         <ProtectedRoute>
//           <Layout onLogout={logout} />
//         </ProtectedRoute>
//       ),
//       children: [
//         { index: true, element: <Navigate to="/dashboard" replace /> },
//         { path: "dashboard", element: <Dashboard /> },
//         { path: "farmers", element: <FarmerManagement /> },
//         { path: "farmers/add", element: <AddFarmer /> },
//         { path: "farmers/edit/:id", element: <EditFarmer /> },
//         { path: "farmers/:id", element: <FarmerProfile /> },
//         { path: "kisani-didi", element: <KisaniDidiManagement /> },
//         { path: "kisani-didi/add", element: <AddKisaniDidi /> },
//         { path: "kisani-didi/edit/:id", element: <EditKisaniDidi /> },
//         { path: "kisani-didi/:id", element: <KisaniDidiProfile /> },
//         // farm manager
//         { path: "farm-managers", element: <FarmManagerManagement /> },
//         { path: "farm-managers/add", element: <AddFarmManager /> },
//         { path: "farm-managers/edit/:id", element: <EditFarmManager /> },
//         { path: "farm-managers/:id", element: <FarmManagerProfile /> },
//         // farm operator
//         { path: "farm-operators", element: <FarmOperatorManagement /> },
//         { path: "farm-operators/add", element: <AddFarmOperator /> },
//         { path: "farm-operators/edit/:id", element: <EditFarmOperator /> },
//         { path: "farm-operators/:id", element: <FarmOperatorProfile /> },
//         { path: "tasks", element: <TaskManagement /> },
//         { path: "attendance", element: <AttendanceManagement /> },
//         { path: "carbon-reports", element: <CarbonReports /> },
//         { path: "bookings", element: <BookingManagement /> },
//         { path: "static-content", element: <StaticContent /> },
//         { path: "notifications", element: <NotificationManagement /> },
//         { path: "payments", element: <PaymentManagement /> },
//         { path: "sub-admins", element: <SubAdminManagement /> },
//         { path: "settings", element: <Settings /> },
//       ],
//     },

//     // Catch-all (unauthenticated users go to login, authenticated users go to dashboard)
//     {
//       path: "*",
//       element: <Navigate to="/dashboard" replace />,
//     },
//   ]);
// }



export default function AppRoutes() {
  const { login, logout } = useAuth();

  return useRoutes([
    // ✅ Public routes
    {
      path: "/login",
      element: (
        <PublicRoute>
          <Login onLogin={login} />
        </PublicRoute>
      ),
    },
    // {
    //   path: "/reset-password/:token", // <-- completely public
    //   element: <ResetPassword />,
    // },
     {
      path: "/reset-password", // <-- works with ?token=xyz
      element: <ResetPassword />, 
    },
   
    // ✅ Protected routes (only for logged in users)
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout onLogout={logout} />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Navigate to="/dashboard" replace /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "farmers", element: <FarmerManagement /> },
        { path: "farmers/add", element: <AddFarmer /> },
        { path: "farmers/edit/:id", element: <EditFarmer /> },
        { path: "farmers/:id", element: <FarmerProfile /> },
        { path: "kisani-didi", element: <KisaniDidiManagement /> },
        { path: "kisani-didi/add", element: <AddKisaniDidi /> },
        { path: "kisani-didi/edit/:id", element: <EditKisaniDidi /> },
        { path: "kisani-didi/:id", element: <KisaniDidiProfile /> },
        // farm manager
        { path: "farm-managers", element: <FarmManagerManagement /> },
        { path: "farm-managers/add", element: <AddFarmManager /> },
        { path: "farm-managers/edit/:id", element: <EditFarmManager /> },
        { path: "farm-managers/:id", element: <FarmManagerProfile /> },
        // farm operator
        { path: "farm-operators", element: <FarmOperatorManagement /> },
        { path: "farm-operators/add", element: <AddFarmOperator /> },
        { path: "farm-operators/edit/:id", element: <EditFarmOperator /> },
        { path: "farm-operators/:id", element: <FarmOperatorProfile /> },
        { path: "tasks", element: <TaskManagement /> },
        { path: "tasks/create", element: <CreateTask /> },
        { path: "attendance", element: <AttendanceManagement /> },
        { path: "carbon-reports", element: <CarbonReports /> },
        { path: "bookings", element: <BookingManagement /> },
        { path: "static-content", element: <StaticContent /> },
        { path: "notifications", element: <NotificationManagement /> },
        { path: "payments", element: <PaymentManagement /> },
        { path: "sub-admins", element: <SubAdminManagement /> },
        { path: "settings", element: <Settings /> },
      ],
    },

    // Catch-all (unauthenticated users go to login, authenticated users go to dashboard)
    {
      path: "*",
      element: <Navigate to="/dashboard" replace />,
    },
  ]);
}

