import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon }) => (
  <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 flex flex-col items-start shadow-sm">
    <div className="flex items-center gap-2 mb-2 text-gray-700 text-lg">
      {icon && <span className="text-2xl">{icon}</span>}
      <span className="font-semibold text-3xl text-gray-900">{value}</span>
    </div>
    <span className="text-sm text-gray-500 font-medium">{label}</span>
  </div>
);

export default MetricCard; 