import React from 'react';

type AttendanceStatus = 'Present' | 'Pending' | 'Absent';

interface CustomAttendanceStatusProps {
  status: AttendanceStatus;
  className?: string;
}

const CustomAttendanceStatus: React.FC<CustomAttendanceStatusProps> = ({ 
  status, 
  className = '' 
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Present':
        return 'bg-green-600 text-white';
      case 'Absent':
        return 'bg-red-600 text-white';
      case 'Pending':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <span
      className={`inline-flex px-3 py-1 text-xs font-medium rounded ${getStatusStyles()} ${className}`}
      style={{ fontFamily: 'Roboto' }}
    >
      {status}
    </span>
  );
};

export default CustomAttendanceStatus;
