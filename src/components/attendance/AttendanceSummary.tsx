import React from 'react';
import { Users, Calendar } from 'lucide-react';
import { AttendanceSummary as Summary } from './types';
import Card from '../ui/Card';

interface AttendanceSummaryProps {
  summary: Summary;
  className?: string;
}

const AttendanceSummary: React.FC<AttendanceSummaryProps> = ({ 
  summary, 
  className = "" 
}) => {
  const summaryCards = [
    {
      title: 'Today Present',
      value: summary.presentCount.toString(),
      icon: Users,
      color: 'bg-gray-100',
      iconColor: 'text-gray-400'
    },
    {
      title: 'Today Absent',
      value: summary.absentCount.toString(),
      icon: Users,
      color: 'bg-gray-100',
      iconColor: 'text-gray-400'
    },
    {
      title: 'Total Pending',
      value: summary.pendingCount.toString(),
      icon: Calendar,
      color: 'bg-gray-100',
      iconColor: 'text-gray-400'
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      {summaryCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} variant="default" className="min-w-[280px] min-h-[140px]">
            <div className="flex items-center justify-between h-full">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-3" style={{ fontFamily: 'Roboto' }}>
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Roboto' }}>
                  {card.value}
                </p>
              </div>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${card.color}`}>
                <Icon className={`w-7 h-7 ${card.iconColor}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default AttendanceSummary;
