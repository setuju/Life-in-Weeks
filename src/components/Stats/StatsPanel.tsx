import React from 'react';
import { getAgeFromWeeks } from '../../utils/dateUtils';

interface StatsPanelProps {
  weeksLived: number;
  weeksRemaining: number;
  percentageUsed: number;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ weeksLived, weeksRemaining, percentageUsed }) => {
  const { years, weeks } = getAgeFromWeeks(weeksLived);

  const stats = [
    { label: 'Current Age', value: `${years} years, ${weeks} weeks` },
    { label: 'Weeks Lived', value: weeksLived.toLocaleString() },
    { label: 'Weeks Remaining', value: weeksRemaining.toLocaleString() },
    { label: 'Life Used', value: `${percentageUsed.toFixed(1)}%` },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">{stat.label}</p>
          <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsPanel;
