import React from 'react';
import { Calendar, ClipboardList } from 'lucide-react';
import { Card } from '../../ui';

interface KisaniDidi {
  id: number;
  name: string;
  memberId: string;
  mobile: string;
  location: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Rejected';
  joinedDate: string;
  profileImage: string;
  tasks?: Task[];
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

interface AttendanceStats {
  present: number;
  absent: number;
  pending: number;
  total: number;
}

interface StatsCardsProps {
  kisaniDidi: KisaniDidi;
  activeTab: string;
  isPendingApproval?: boolean;
}

const StatsCards: React.FC<StatsCardsProps> = ({ kisaniDidi, activeTab, isPendingApproval = false }) => {
  if (!kisaniDidi.tasks && !isPendingApproval) return null;

  return (
    <div className="relative min-h-[128px]">
      <div className="flex gap-6 min-w-full">
        <div className="flex gap-6 flex-grow">
          {/* Total Tasks Card */}
          <Card className="w-96 h-56 flex flex-col justify-between p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-semibold text-gray-700">Total Tasks</h3>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-gray-600" />
              </div>
            </div>
            <div className="text-left">
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {isPendingApproval ? '0' : '12'}
              </p>
              <p className="text-xs text-gray-500">8 completed, 3 pending</p>
            </div>
          </Card>

          {/* Monthly Working Days Card */}
          <Card className="w-96 h-56 flex flex-col justify-between p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-semibold text-gray-700">Monthly Working Days</h3>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-gray-600" />
              </div>
            </div>
            <div className="text-left">
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {isPendingApproval ? '0' : '10'}
              </p>
              <p className="text-xs text-gray-500">Total days since joining</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
