import React from 'react';
import StatusBadge from '../ui/StatusBadge';

export interface ActivityItem {
  timestamp: string;
  action: string;
  domain: string;
  status: 'completed' | 'in_progress' | 'error';
  user: string;
}

interface RecentActivityTableProps {
  data: ActivityItem[];
}

const RecentActivityTable: React.FC<RecentActivityTableProps> = ({ data }) => (
  <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
    <table className="min-w-full text-sm">
      <thead>
        <tr className="bg-gray-50">
          <th className="px-4 py-2 text-left font-semibold text-gray-700">Timestamp</th>
          <th className="px-4 py-2 text-left font-semibold text-gray-700">Action</th>
          <th className="px-4 py-2 text-left font-semibold text-gray-700">Domain</th>
          <th className="px-4 py-2 text-left font-semibold text-gray-700">Status</th>
          <th className="px-4 py-2 text-left font-semibold text-gray-700">User</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx} className="border-t">
            <td className="px-4 py-2 whitespace-nowrap">{item.timestamp}</td>
            <td className="px-4 py-2 whitespace-nowrap">{item.action}</td>
            <td className="px-4 py-2 whitespace-nowrap">{item.domain}</td>
            <td className="px-4 py-2 whitespace-nowrap">
              <StatusBadge status={item.status} />
            </td>
            <td className="px-4 py-2 whitespace-nowrap">{item.user}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default RecentActivityTable; 