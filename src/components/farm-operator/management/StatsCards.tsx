import React from 'react';
import { Users, Clock } from 'lucide-react';
import { Card } from '../../ui';

interface StatsCardsProps {
  totalFarmOperators: number;
  pendingApprovals: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({ totalFarmOperators, pendingApprovals }) => {
  return (
    <div className="flex gap-4" style={{ marginTop: '10px' }}>
      <Card className="w-[279px] h-[119px] p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Roboto' }}>Total Farm Operator</p>
            <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Roboto' }}>{totalFarmOperators}</p>
          </div>
        </div>
      </Card>
      <Card className="w-[279px] h-[119px] p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <Clock className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Roboto' }}>Pending Approvals</p>
            <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Roboto' }}>{pendingApprovals}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StatsCards;
