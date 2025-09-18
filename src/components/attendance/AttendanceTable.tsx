import React from 'react';
import { Edit, Eye } from 'lucide-react';
import { AttendanceRecord } from './types';
import { CustomAttendanceStatus, CustomTable } from '../ui';
import CustomTableHeader from '../ui/CustomTableHeader';
import CustomTableRow from '../ui/CustomTableRow';

interface AttendanceTableProps {
  records: AttendanceRecord[];
  onViewRecord?: (record: AttendanceRecord) => void;
  onEditRecord?: (record: AttendanceRecord) => void;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ records, onViewRecord, onEditRecord }) => {
  return (
    <CustomTable>
      <table className="w-full">
        <CustomTableHeader>
          <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700">
            Member ID
          </th>
          <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700">
            Name
          </th>
          <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700">
            Role
          </th>
          <th className="text-left py-4 pr-8 text-sm font-semibold text-gray-700">
            Location
          </th>
          <th className="text-center py-4 pr-8 text-sm font-semibold text-gray-700">
            Check In
          </th>
          <th className="text-center py-4 pr-8 text-sm font-semibold text-gray-700">
            Check Out
          </th>
          <th className="text-center py-4 pr-8 text-sm font-semibold text-gray-700">
            Work Hours
          </th>
          <th className="text-center py-4 pr-8 text-sm font-semibold text-gray-700">
            Status
          </th>
          <th className="text-center py-4 text-sm font-semibold text-gray-700">
            Action
          </th>
        </CustomTableHeader>
        <tbody>
          {records.map((record, index) => (
            <CustomTableRow key={record.id} isLast={index === records.length - 1}>
              <td className="py-4 pr-8 text-sm text-gray-600">
                {record.id}
              </td>
              <td className="py-4 pr-8">
                <button
                  onClick={() => onViewRecord && onViewRecord(record)}
                  className="text-sm font-medium text-[#000000] hover:text-blue-800 underline"
                >
                  {record.name}
                </button>
              </td>
              <td className="py-4 pr-8 text-sm text-gray-600">
                {record.role}
              </td>
              <td className="py-4 pr-8 text-sm text-gray-600">
                {record.location}
              </td>
              <td className="py-4 pr-8 text-sm text-gray-600 text-center">
                {record.checkIn}
              </td>
              <td className="py-4 pr-8 text-sm text-gray-600 text-center">
                {record.checkOut}
              </td>
              <td className="py-4 pr-8 text-sm text-gray-600 text-center">
                {record.workHours}
              </td>
              <td className="py-4 pr-8 text-center">
                <CustomAttendanceStatus 
                  status={record.status.charAt(0).toUpperCase() + record.status.slice(1) as 'Present' | 'Pending' | 'Absent'} 
                />
              </td>
              <td className="py-4 text-center">
                <button
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  title={record.status === 'pending' ? 'Edit attendance' : 'View details'}
                  onClick={() => {
                    if (record.status === 'pending' && onEditRecord) {
                      onEditRecord(record);
                    } else if (onViewRecord) {
                      onViewRecord(record);
                    }
                  }}
                >
                  {record.status === 'pending' ? (
                    <Edit className="w-4 h-4 text-gray-600" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </td>
            </CustomTableRow>
          ))}
        </tbody>
      </table>
      {records.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No attendance records found
          </p>
        </div>
      )}
    </CustomTable>
  );
};

export default AttendanceTable;
