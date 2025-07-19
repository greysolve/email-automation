import React from 'react';

interface StatusBadgeProps {
  status: 'completed' | 'in_progress' | 'error';
  children?: React.ReactNode;
}

const statusStyles: Record<string, string> = {
  completed: 'bg-status-success-bg text-status-success-text',
  in_progress: 'bg-status-warning-bg text-status-warning-text',
  error: 'bg-status-error-bg text-status-error-text',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, children }) => (
  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusStyles[status]}`}>{children || status.replace('_', ' ')}</span>
);

export default StatusBadge; 