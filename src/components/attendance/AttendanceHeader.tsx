import React from 'react';

interface AttendanceHeaderProps {
  title?: string;
}

const AttendanceHeader: React.FC<AttendanceHeaderProps> = ({ 
  title = "Attendance Management" 
}) => {
  return (
    <div className="flex items-center justify-between">
      <h1 
        className="text-2xl font-bold text-gray-900" 
        style={{ fontFamily: 'Roboto' }}
      >
        {title}
      </h1>
    </div>
  );
};

export default AttendanceHeader;
