import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Edit, Save, X } from 'lucide-react';
import ProfileHeader from './profile/ProfileHeader';
import ProfileStatsCards from './profile/ProfileStatsCards';
import ProfileOverview from './profile/ProfileOverview';
import TaskAssignment from './profile/TaskAssignment';
import AttendanceHistory from './profile/AttendanceHistory';
import AttendanceChart from './profile/AttendanceChart';
import ConfirmationDialog from './shared/ConfirmationDialog';
import { Card } from '../ui';
import CardComponent from '../ui/Card';

// Define interfaces for data structures
interface FarmManager {
  id: number;
  name: string;
  memberId: string;
  mobile: string;
  location: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Rejected';
  joinedDate: string;
  profileImage: string;
  // Personal Information
  fullName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  fathersName: string;
  education: string;
  alternativeMobile: string;
  // KYC Documents
  aadharCard: string;
  // Address Information
  completeAddress: string;
  village: string;
  district: string;
  state: string;
  mandal: string;
  pinCode: string;
  // Bank Details
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  tasks?: Task[];
  attendanceRecords?: AttendanceRecord[];
  attendanceStats?: AttendanceStats;
}

interface Task {
  id: number;
  title: string;
  location: string;
  assignedDate: string;
  dueDate: string;
  status: string;
  priority: string;
  description: string;
  notes: string;
}

interface AttendanceRecord {
  date: string;
  checkIn: string;
  checkOut: string;
  status: string;
  taskTitle: string;
  taskDescription: string;
  checkInLocation: string;
  checkOutLocation: string;
  notes: string;
  workingHours: string;
  checkInImage: string | null;
  checkOutImage: string | null;
}

interface AttendanceStats {
  present: number;
  absent: number;
  pending: number;
  total: number;
}

interface TaskFilters {
  status: string;
}

interface AttendanceFilters {
  status: string;
  period: string;
}

// Utility type to filter keys of FarmManager that are string or number
type EditableFieldKeys = 'id' | 'name' | 'memberId' | 'mobile' | 'location' | 'status' | 'joinedDate' | 'profileImage' |
  'fullName' | 'dateOfBirth' | 'gender' | 'email' | 'fathersName' | 'education' | 'alternativeMobile' |
  'aadharCard' | 'completeAddress' | 'village' | 'district' | 'state' | 'mandal' | 'pinCode' |
  'bankName' | 'accountNumber' | 'ifscCode';

const FarmManagerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'attendance'>('overview');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // Check if this is a pending approval or edit mode
  const isPendingApproval = searchParams.get('pending') === 'true';
  const isEditFromManagement = searchParams.get('edit') === 'true';

  // Modal and dialog states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showApproveDialog, setShowApproveDialog] = useState<boolean>(false);
  const [showRejectDialog, setShowRejectDialog] = useState<boolean>(false);

  // Filter states
  const [showTaskFilter, setShowTaskFilter] = useState<boolean>(false);
  const [showAttendanceFilter, setShowAttendanceFilter] = useState<boolean>(false);
  const [taskFilters, setTaskFilters] = useState<TaskFilters>({ status: '' });
  const [appliedTaskFilters, setAppliedTaskFilters] = useState<TaskFilters>({ status: '' });
  const [attendanceFilters, setAttendanceFilters] = useState<AttendanceFilters>({ status: '', period: '' });
  const [appliedAttendanceFilters, setAppliedAttendanceFilters] = useState<AttendanceFilters>({ status: '', period: '' });

  const closeModal = () => {
    setSelectedRecord(null);
    setIsModalOpen(false);
  };

  const openTaskModal = (task: Task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setSelectedTask(null);
    setIsTaskModalOpen(false);
  };

  // Farm manager data
  const [farmManager, setFarmManager] = useState<FarmManager>({
    id: id ? parseInt(id) : 1,
    name: isPendingApproval ? 'Kavita Singh' : 'Ravi Sharma',
    memberId: isPendingApproval ? 'MEM-KD-2024-101' : 'MEM-KD-2024-001',
    mobile: isPendingApproval ? '+91 9876543220' : '+91 9785432110',
    location: isPendingApproval ? 'Bihar, Patna, Boring Road' : 'Rajasthan, Jaipur, Sangaria',
    status: isPendingApproval ? 'Pending' : 'Active',
    joinedDate: isPendingApproval ? '2024-03-15' : '2024-01-10',
    profileImage: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=150',
    // Personal Information
    fullName: isPendingApproval ? 'Kavita Singh' : 'Rajesh Kumar',
    dateOfBirth: isPendingApproval ? '1988-03-15' : '1985-06-15',
    gender: isPendingApproval ? 'Female' : 'Male',
    email: isPendingApproval ? 'kavita.singh@email.com' : 'rajesh.kumar@email.com',
    fathersName: isPendingApproval ? 'Ram Singh' : 'Ramesh Kumar',
    education: isPendingApproval ? 'Graduate' : '12th Pass',
    alternativeMobile: isPendingApproval ? '+91 9876543221' : '+91 9876543210',
    // KYC Documents
    aadharCard: isPendingApproval ? '**** **** **** 1012' : '**** **** **** 9012',
    // Address Information
    completeAddress: isPendingApproval ? 'House No 456, Gandhi Road' : 'House No 123, Main Street',
    village: isPendingApproval ? 'Patna City' : 'Rampur',
    district: isPendingApproval ? 'Patna' : 'Hyderabad',
    state: isPendingApproval ? 'Bihar' : 'Telangana',
    mandal: isPendingApproval ? 'Boring Road' : 'Secunderabad',
    pinCode: isPendingApproval ? '800001' : '500001',
    // Bank Details
    bankName: isPendingApproval ? 'Bank of India' : 'State Bank of India',
    accountNumber: isPendingApproval ? '**** **** 1012' : '**** **** 1220',
    ifscCode: isPendingApproval ? 'BKID0001012' : 'SBIN0000123',
    tasks: isPendingApproval ? [] : [
      {
        id: 1,
        title: 'Farmer Training on Organic Fertilizers',
        location: 'Farm A, Jaipur',
        assignedDate: '2024-01-20',
        dueDate: '2024-01-25',
        status: 'Completed',
        priority: 'High',
        description: 'Conduct comprehensive training session for farmers on organic fertilizer usage and benefits.',
        notes: 'Training materials provided. Ensure all farmers receive certificates.',
      },
      {
        id: 2,
        title: 'Crop Health Inspection',
        location: 'Farm B, Jaipur',
        assignedDate: '2024-01-22',
        dueDate: '2024-01-18',
        status: 'In Progress',
        priority: 'Medium',
        description: 'Inspect crop health and identify potential diseases or pest issues.',
        notes: 'Focus on wheat and rice crops. Take samples if necessary.',
      },
      {
        id: 3,
        title: 'Soil Testing Guidance',
        location: 'Farm C, Jaipur',
        assignedDate: '2024-01-18',
        dueDate: '2024-01-23',
        status: 'Overdue',
        priority: 'High',
        description: 'Guide farmers through soil testing process and interpretation of results.',
        notes: 'Bring soil testing kits and pH meters.',
      },
    ],
    attendanceRecords: isPendingApproval ? [] : [
      {
        date: '2024-01-25',
        checkIn: '09:00 AM',
        checkOut: '05:00 PM',
        status: 'Pending',
        taskTitle: 'Farmer Training on Organic Fertilizers',
        taskDescription: 'Conducted training session on organic fertilizer usage',
        checkInLocation: 'Village Sangaria, Jaipur',
        checkOutLocation: 'Jaipur, Rajasthan',
        notes: 'Successfully completed training session for 25 farmers',
        workingHours: '08:00 Hrs',
        checkInImage: null,
        checkOutImage: null,
      },
      {
        date: '2024-01-24',
        checkIn: '09:15 AM',
        checkOut: '04:45 PM',
        status: 'Pending',
        taskTitle: 'Crop Health Inspection',
        taskDescription: 'Inspected crop health in assigned fields',
        checkInLocation: 'Village Sangaria, Jaipur',
        checkOutLocation: 'Jaipur, Rajasthan',
        notes: 'Found minor pest issues in wheat crops',
        workingHours: '07:30 Hrs',
        checkInImage: null,
        checkOutImage: null,
      },
      {
        date: '2024-01-23',
        checkIn: '09:30 AM',
        checkOut: '05:15 PM',
        status: 'Present',
        taskTitle: 'Field Survey',
        taskDescription: 'Surveying fields for irrigation planning',
        checkInLocation: 'Village Sangaria, Jaipur',
        checkOutLocation: 'Jaipur, Rajasthan',
        notes: 'Field survey completed successfully',
        workingHours: '07:45 Hrs',
        checkInImage: null,
        checkOutImage: null,
      },
      {
        date: '2024-01-22',
        checkIn: 'N/A',
        checkOut: 'N/A',
        status: 'Absent',
        taskTitle: 'Field Maintenance',
        taskDescription: 'Scheduled field maintenance',
        checkInLocation: '',
        checkOutLocation: '',
        notes: 'Absent due to personal reasons',
        workingHours: '0 Hrs',
        checkInImage: null,
        checkOutImage: null,
      },
      {
        date: '2024-01-21',
        checkIn: '08:45 AM',
        checkOut: '05:30 PM',
        status: 'Present',
        taskTitle: 'Soil Testing',
        taskDescription: 'Conducted soil testing in assigned fields',
        checkInLocation: 'Village Sangaria, Jaipur',
        checkOutLocation: 'Jaipur, Rajasthan',
        notes: 'Soil testing completed, results pending',
        workingHours: '08:45 Hrs',
        checkInImage: null,
        checkOutImage: null,
      },
    ],
    attendanceStats: isPendingApproval ? { present: 0, absent: 0, pending: 0, total: 0 } : {
      present: 150,
      absent: 50,
      pending: 25,
      total: 225,
    },
  });

  const [editData, setEditData] = useState<Partial<FarmManager>>({});

  // Set edit mode if coming from management page
  useEffect(() => {
    if (isEditFromManagement) {
      setIsEditMode(true);
      setEditData({ ...farmManager });
    }
  }, [isEditFromManagement, farmManager]);

  // Filter handlers
  const handleTaskFilterChange = (field: keyof TaskFilters, value: string) => {
    setTaskFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetTaskFilters = () => {
    setTaskFilters({ status: '' });
    setAppliedTaskFilters({ status: '' });
  };

  const applyTaskFilters = () => {
    setAppliedTaskFilters({ ...taskFilters });
    setShowTaskFilter(false);
  };

  const handleAttendanceFilterChange = (field: keyof AttendanceFilters, value: string) => {
    setAttendanceFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetAttendanceFilters = () => {
    setAttendanceFilters({ status: '', period: '' });
    setAppliedAttendanceFilters({ status: '', period: '' });
  };

  const applyAttendanceFilters = () => {
    setAppliedAttendanceFilters({ ...attendanceFilters });
    setShowAttendanceFilter(false);
  };


  // Edit handlers
  const handleEdit = () => {
    // TODO: Integrate API call for editing farm manager profile
    // API Endpoint: PUT /api/farm-managers/{id}
    // Example: await updateFarmManagerProfile(farmManager.id, formData);
    setEditData({ ...farmManager });
    setIsEditMode(true);
  };

  const handleCancel = () => {
    // TODO: Integrate API call for canceling farm manager profile changes
    // API Endpoint: GET /api/farm-managers/{id} (to reset data)
    // Example: await resetFarmManagerProfile(farmManager.id);
    setEditData({});
    setIsEditMode(false);
  };

  const handleSave = () => {
    // TODO: Integrate API call for saving farm manager profile changes
    // API Endpoint: PUT /api/farm-managers/{id}
    // Example: await saveFarmManagerProfile(farmManager.id, editData);
    setFarmManager({ ...farmManager, ...editData });
    setIsEditMode(false);
    setEditData({});
  };

  const handleInputChange = (field: EditableFieldKeys, value: string | number) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Status toggle handler
  const handleToggleStatus = (newStatus: 'Active' | 'Inactive') => {
    // TODO: Integrate API call for toggling farm manager status
    // API Endpoint: PUT /api/farm-managers/{id}/status
    // Example: await toggleFarmManagerStatus(farmManager.id, newStatus);
    setFarmManager(prev => ({
      ...prev,
      status: newStatus
    }));
  };

  // Approval handlers
  const handleApprove = () => {
    setShowApproveDialog(true);
  };

  const handleReject = () => {
    setShowRejectDialog(true);
  };

  const confirmApprove = () => {
    console.log('Approving farm manager:', farmManager.id);
    
    // TODO: Integrate API call for approving farm manager from profile
    // API Endpoint: PUT /api/farm-managers/{id}/approve
    // Example: await approveFarmManager(farmManager.id);
    
    // Update the farm manager status to Active
    setFarmManager(prev => ({
      ...prev,
      status: 'Active'
    }));
    
    // Store the approval in localStorage so the management component can pick it up
    const approvalData = {
      id: farmManager.id,
      action: 'approve',
      timestamp: Date.now()
    };
    localStorage.setItem('farmManagerApproval', JSON.stringify(approvalData));
    
    // Close dialog and navigate back to farm managers list
    setShowApproveDialog(false);
    navigate('/farm-managers');
  };

  const confirmReject = () => {
    console.log('Rejecting farm manager:', farmManager.id);
    
    // TODO: Integrate API call for rejecting farm manager from profile
    // API Endpoint: PUT /api/farm-managers/{id}/reject
    // Example: await rejectFarmManager(farmManager.id);
    
    // Update the farm manager status to Rejected (this will hide them from lists)
    setFarmManager(prev => ({
      ...prev,
      status: 'Rejected'
    }));
    
    // Store the rejection in localStorage so the management component can pick it up
    const rejectionData = {
      id: farmManager.id,
      action: 'reject',
      timestamp: Date.now()
    };
    localStorage.setItem('farmManagerRejection', JSON.stringify(rejectionData));
    
    // Close dialog and navigate back to farm managers list
    setShowRejectDialog(false);
    navigate('/farm-managers');
  };





  return (
    <div className="" style={{ fontFamily: 'Roboto' }}>
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/farm-managers')}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg border border-gray-300"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Roboto' }}>
                {isPendingApproval ? 'Pending Farm Manager Profile' : 'Farm Manager Profile'}
              </h1>
            </div>
          </div>
        </div>

        {/* Profile Header */}
        <ProfileHeader 
          farmManager={farmManager} 
          isPendingApproval={isPendingApproval} 
          onToggleStatus={handleToggleStatus}
          onApprove={handleApprove}
          onReject={handleReject}
        />

        {/* Stats Cards Row */}
        <div className="relative min-h-[128px]">
          <div className="flex gap-6 min-w-full">
            <div className="flex gap-6 flex-grow">
              <ProfileStatsCards farmManager={farmManager} activeTab={activeTab} isPendingApproval={isPendingApproval} />
              {activeTab === 'attendance' && farmManager.attendanceStats && !isPendingApproval && (
                <AttendanceChart attendanceStats={farmManager.attendanceStats} />
              )}
            </div>
          </div>
        </div>

        {!isPendingApproval && (
          <>
            <br />
            <br />
          </>
        )}

        <div className="flex items-center justify-between">
          <Card variant="tab" className="p-1">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'overview' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'tasks' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Assigned Tasks ({isPendingApproval ? 0 : farmManager.tasks?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('attendance')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'attendance' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Attendance Records
              </button>
            </div>
          </Card>

          <div className="flex items-center gap-2">
            {!isPendingApproval && activeTab === 'overview' && (
              <>
                {isEditMode ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2"
                    >
                      <X size={18} />
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                    >
                      <Save size={18} />
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <Edit size={18} />
                    Edit Profile
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {activeTab === 'overview' && (
          <ProfileOverview
            farmManager={farmManager}
            isEditMode={isEditMode}
            editData={editData}
            handleInputChange={handleInputChange}
          />
        )}
        {activeTab === 'tasks' && (
          <TaskAssignment
            tasks={farmManager.tasks || []}
            isPendingApproval={isPendingApproval}
            showTaskFilter={showTaskFilter}
            setShowTaskFilter={setShowTaskFilter}
            taskFilters={taskFilters}
            appliedTaskFilters={appliedTaskFilters}
            handleTaskFilterChange={handleTaskFilterChange}
            resetTaskFilters={resetTaskFilters}
            applyTaskFilters={applyTaskFilters}
            openTaskModal={openTaskModal}
          />
        )}
        {activeTab === 'attendance' && (
          <AttendanceHistory
            attendanceRecords={farmManager.attendanceRecords || []}
            isPendingApproval={isPendingApproval}
            showAttendanceFilter={showAttendanceFilter}
            setShowAttendanceFilter={setShowAttendanceFilter}
            attendanceFilters={attendanceFilters}
            appliedAttendanceFilters={appliedAttendanceFilters}
            handleAttendanceFilterChange={handleAttendanceFilterChange}
            resetAttendanceFilters={resetAttendanceFilters}
            applyAttendanceFilters={applyAttendanceFilters}
          />
        )}

        {isTaskModalOpen && selectedTask && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-[600px]">
              <CardComponent 
                title="Task Details"
                className="relative"
              >
                <button 
                  onClick={closeTaskModal} 
                  className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 z-10"
                >
                  <X size={20} />
                </button>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Task Title</label>
                    <input
                      type="text"
                      value={selectedTask.title}
                      readOnly
                      className="w-full border rounded-lg p-2 text-sm bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input
                      type="text"
                      value={selectedTask.location}
                      readOnly
                      className="w-full border rounded-lg p-2 text-sm bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Assigned Date</label>
                    <input
                      type="text"
                      value={selectedTask.assignedDate}
                      readOnly
                      className="w-full border rounded-lg p-2 text-sm bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Due Date</label>
                    <input
                      type="text"
                      value={selectedTask.dueDate}
                      readOnly
                      className="w-full border rounded-lg p-2 text-sm bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <input
                      type="text"
                      value={selectedTask.status}
                      readOnly
                      className="w-full border rounded-lg p-2 text-sm bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Priority</label>
                    <input
                      type="text"
                      value={selectedTask.priority}
                      readOnly
                      className="w-full border rounded-lg p-2 text-sm bg-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={selectedTask.description}
                    readOnly
                    className="w-full border rounded-lg p-2 text-sm bg-gray-100 h-20 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Notes</label>
                  <textarea
                    value={selectedTask.notes}
                    readOnly
                    className="w-full border rounded-lg p-2 text-sm bg-gray-100 h-16 resize-none"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeTaskModal}
                  className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
              </CardComponent>
            </div>
          </div>
        )}

        {isModalOpen && selectedRecord && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-[800px]">
              <CardComponent 
                title={`Attendance History (${selectedRecord.date})`}
                className="relative"
              >
                <button 
                  onClick={closeModal} 
                  className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 z-10"
                >
                  <X size={20} />
                </button>

              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Roboto' }}>
                      Date
                    </label>
                    <input
                      type="text"
                      value={selectedRecord.date}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-white"
                      style={{ fontFamily: 'Roboto' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Roboto' }}>
                      Task Title
                    </label>
                    <input
                      type="text"
                      value={selectedRecord.taskTitle}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-white"
                      style={{ fontFamily: 'Roboto' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Roboto' }}>
                      Check-In Time
                    </label>
                    <input
                      type="text"
                      value={selectedRecord.checkIn}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-white"
                      style={{ fontFamily: 'Roboto' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Roboto' }}>
                      Check-In Location
                    </label>
                    <input
                      type="text"
                      value={selectedRecord.checkInLocation}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-white"
                      style={{ fontFamily: 'Roboto' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Roboto' }}>
                      Notes
                    </label>
                    <input
                      type="text"
                      value={selectedRecord.notes}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-white"
                      style={{ fontFamily: 'Roboto' }}
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Roboto' }}>
                      Task Description
                    </label>
                    <input
                      type="text"
                      value={selectedRecord.taskDescription}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-white"
                      style={{ fontFamily: 'Roboto' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Roboto' }}>
                      Check-Out Time
                    </label>
                    <input
                      type="text"
                      value={selectedRecord.checkOut}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-white"
                      style={{ fontFamily: 'Roboto' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Roboto' }}>
                      Check-Out Location
                    </label>
                    <input
                      type="text"
                      value={selectedRecord.checkOutLocation}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-white"
                      style={{ fontFamily: 'Roboto' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Roboto' }}>
                      Working Hours
                    </label>
                    <input
                      type="text"
                      value={selectedRecord.workingHours}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-white"
                      style={{ fontFamily: 'Roboto' }}
                    />
                  </div>
                </div>
              </div>

              {/* Image Placeholders - Left Side */}
              <div className="flex gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto' }}>
                    Check-In Image
                  </label>
                  <div className="w-32 h-32 border border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                    {selectedRecord.checkInImage ? (
                      <img
                        src={selectedRecord.checkInImage}
                        alt="Check-In"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm" style={{ fontFamily: 'Roboto' }}>No Image</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Roboto' }}>
                    Check-Out Image
                  </label>
                  <div className="w-32 h-32 border border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                    {selectedRecord.checkOutImage ? (
                      <img
                        src={selectedRecord.checkOutImage}
                        alt="Check-Out"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm" style={{ fontFamily: 'Roboto' }}>No Image</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons - Right Side Only */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    alert('Marked as Absent');
                    closeModal();
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  style={{ fontFamily: 'Roboto', fontSize: '13.02px', fontWeight: 600 }}
                >
                  Absent
                </button>
                <button
                  onClick={() => {
                    alert('Marked as Present');
                    closeModal();
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  style={{ fontFamily: 'Roboto', fontSize: '13.02px', fontWeight: 600 }}
                >
                  Present
                </button>
              </div>
              </CardComponent>
            </div>
          </div>
        )}

        {/* Confirmation Dialogs */}
        <ConfirmationDialog
          isOpen={showApproveDialog}
          onClose={() => setShowApproveDialog(false)}
          onConfirm={confirmApprove}
          title="Approve User"
          message="Are you sure you want to Approve this User"
        />

        <ConfirmationDialog
          isOpen={showRejectDialog}
          onClose={() => setShowRejectDialog(false)}
          onConfirm={confirmReject}
          title="Reject User"
          message="Are you sure you want to Reject this User"
        />
      </div>
    </div>
  );
};

export default FarmManagerProfile;