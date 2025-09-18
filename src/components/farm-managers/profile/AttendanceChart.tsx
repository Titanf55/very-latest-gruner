import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface AttendanceStats {
  present: number;
  absent: number;
  pending: number;
  total: number;
}

interface AttendanceChartProps {
  attendanceStats: AttendanceStats;
}

const AttendanceChart: React.FC<AttendanceChartProps> = ({ attendanceStats }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 w-[520px] h-56 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">Attendance Record</h3>
      </div>

      <div className="flex items-center justify-center gap-6">
        <div className="relative w-40 h-40">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Present', value: attendanceStats.present, color: '#3B82F6' },
                  { name: 'Absent', value: attendanceStats.absent, color: '#8B5CF6' },
                  { name: 'Pending', value: attendanceStats.pending, color: '#F59E0B' },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={65}
                paddingAngle={2}
                dataKey="value"
              >
                <Cell fill="#3B82F6" />
                <Cell fill="#8B5CF6" />
                <Cell fill="#F59E0B" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">{attendanceStats.total}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Present</span>
            </div>
            <span className="text-base font-medium text-gray-900">
              {attendanceStats.present}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Absent</span>
            </div>
            <span className="text-base font-medium text-gray-900">
              {attendanceStats.absent}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Pending</span>
            </div>
            <span className="text-base font-medium text-gray-900">
              {attendanceStats.pending}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;
