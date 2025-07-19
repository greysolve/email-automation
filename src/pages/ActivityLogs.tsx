import React, { useState } from 'react';
import StatusBadge from '../components/ui/StatusBadge';

interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  category: 'domain' | 'campaign' | 'inbox' | 'dns' | 'system' | 'security';
  status: 'success' | 'error' | 'warning' | 'info';
  details: string;
  resourceId?: string;
  resourceType?: string;
  ipAddress?: string;
  userAgent?: string;
  duration?: number;
  affectedRecords?: number;
}

const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    timestamp: '2025-07-18 16:45:23',
    user: 'admin@greysolve.com',
    action: 'Domain Registration',
    category: 'domain',
    status: 'success',
    details: 'Successfully registered domain "b2b-connect-pro.com" with Google Domains',
    resourceId: 'b2b-connect-pro.com',
    resourceType: 'domain',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    duration: 2.3,
    affectedRecords: 1,
  },
  {
    id: '2',
    timestamp: '2025-07-18 16:42:15',
    user: 'admin@greysolve.com',
    action: 'Inbox Provisioning',
    category: 'inbox',
    status: 'success',
    details: 'Created 3 Google Workspace inboxes for domain "client-outreach-hub.com"',
    resourceId: 'client-outreach-hub.com',
    resourceType: 'domain',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    duration: 8.7,
    affectedRecords: 3,
  },
  {
    id: '3',
    timestamp: '2025-07-18 16:38:42',
    user: 'admin@greysolve.com',
    action: 'DNS Configuration',
    category: 'dns',
    status: 'warning',
    details: 'DNS verification failed for MX records on "b2b-connect-pro.com" - manual review required',
    resourceId: 'b2b-connect-pro.com',
    resourceType: 'domain',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    duration: 1.2,
    affectedRecords: 1,
  },
  {
    id: '4',
    timestamp: '2025-07-18 16:35:18',
    user: 'admin@greysolve.com',
    action: 'Sequencer Connection',
    category: 'inbox',
    status: 'success',
    details: 'Connected inbox "john.doe@client-outreach-hub.com" to Smartlead sequencer',
    resourceId: 'john.doe@client-outreach-hub.com',
    resourceType: 'inbox',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    duration: 3.1,
    affectedRecords: 1,
  },
  {
    id: '5',
    timestamp: '2025-07-18 16:30:55',
    user: 'admin@greysolve.com',
    action: 'Campaign Setup',
    category: 'campaign',
    status: 'success',
    details: 'Created new campaign "Q4 B2B Outreach" with 5 domains and 15 inboxes',
    resourceId: 'campaign-001',
    resourceType: 'campaign',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    duration: 12.4,
    affectedRecords: 20,
  },
  {
    id: '6',
    timestamp: '2025-07-18 16:25:33',
    user: 'admin@greysolve.com',
    action: 'API Key Update',
    category: 'security',
    status: 'success',
    details: 'Updated Google Workspace API credentials - connection verified successfully',
    resourceId: 'api-google-workspace',
    resourceType: 'api_credentials',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    duration: 1.8,
    affectedRecords: 1,
  },
  {
    id: '7',
    timestamp: '2025-07-18 16:20:12',
    user: 'admin@greysolve.com',
    action: 'Bulk DNS Update',
    category: 'dns',
    status: 'error',
    details: 'Failed to update SPF records for 3 domains - rate limit exceeded',
    resourceId: 'bulk-dns-001',
    resourceType: 'bulk_operation',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    duration: 15.2,
    affectedRecords: 3,
  },
  {
    id: '8',
    timestamp: '2025-07-18 16:15:47',
    user: 'admin@greysolve.com',
    action: 'System Backup',
    category: 'system',
    status: 'success',
    details: 'Completed automated daily backup - 2.3GB of data backed up successfully',
    resourceId: 'backup-2025-07-18',
    resourceType: 'system_backup',
    ipAddress: '192.168.1.100',
    userAgent: 'System/Automated',
    duration: 45.7,
    affectedRecords: 1250,
  },
  {
    id: '9',
    timestamp: '2025-07-18 16:10:29',
    user: 'admin@greysolve.com',
    action: 'Inbox Warmup',
    category: 'inbox',
    status: 'info',
    details: 'Started warmup process for 5 new inboxes - Day 1 of 14',
    resourceId: 'warmup-batch-001',
    resourceType: 'warmup_batch',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    duration: 0.5,
    affectedRecords: 5,
  },
  {
    id: '10',
    timestamp: '2025-07-18 16:05:14',
    user: 'admin@greysolve.com',
    action: 'Health Check',
    category: 'system',
    status: 'warning',
    details: 'High bounce rate detected on domain "b2b-connect-pro.com" - 8.5% exceeds threshold',
    resourceId: 'b2b-connect-pro.com',
    resourceType: 'domain',
    ipAddress: '192.168.1.100',
    userAgent: 'System/Automated',
    duration: 2.1,
    affectedRecords: 1,
  },
];

const ActivityLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateRange, setDateRange] = useState('24h');
  const [selectedLogs, setSelectedLogs] = useState<string[]>([]);

  const handleSelectAll = () => {
    if (selectedLogs.length === mockActivityLogs.length) {
      setSelectedLogs([]);
    } else {
      setSelectedLogs(mockActivityLogs.map(log => log.id));
    }
  };

  const handleSelectLog = (logId: string) => {
    setSelectedLogs(prev => 
      prev.includes(logId) 
        ? prev.filter(id => id !== logId)
        : [...prev, logId]
    );
  };

  const filteredLogs = mockActivityLogs.filter(log =>
    (log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
     log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
     log.user.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (categoryFilter === '' || log.category === categoryFilter) &&
    (statusFilter === '' || log.status === statusFilter)
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <StatusBadge status="completed">Success</StatusBadge>;
      case 'error':
        return <StatusBadge status="error">Error</StatusBadge>;
      case 'warning':
        return <StatusBadge status="in_progress">Warning</StatusBadge>;
      case 'info':
        return <StatusBadge status="in_progress">Info</StatusBadge>;
      default:
        return <StatusBadge status="in_progress">{status}</StatusBadge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'domain':
        return '🌐';
      case 'campaign':
        return '📧';
      case 'inbox':
        return '📬';
      case 'dns':
        return '🔗';
      case 'system':
        return '⚙️';
      case 'security':
        return '🔒';
      default:
        return '📋';
    }
  };

  const formatDuration = (duration?: number) => {
    if (!duration) return '-';
    return `${duration.toFixed(1)}s`;
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span role="img" aria-label="activity">📊</span>
        Activity Logs
      </h1>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button className="px-6 py-3 bg-brand-primary text-brand-light rounded-md hover:bg-brand-dark transition-colors font-bold">
          Export Logs
        </button>
        <button className="px-6 py-3 bg-brand-secondary text-brand-dark rounded-md hover:bg-brand-accent transition-colors font-medium">
          Clear Old Logs
        </button>
        {selectedLogs.length > 0 && (
          <button className="px-6 py-3 bg-brand-accent text-brand-dark rounded-md hover:bg-brand-secondary transition-colors font-medium">
            Export Selected ({selectedLogs.length})
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search actions, details, or users..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="domain">Domain</option>
            <option value="campaign">Campaign</option>
            <option value="inbox">Inbox</option>
            <option value="dns">DNS</option>
            <option value="system">System</option>
            <option value="security">Security</option>
          </select>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="success">Success</option>
            <option value="error">Error</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {/* Activity Logs Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-brand-light">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedLogs.length === mockActivityLogs.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                  />
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Timestamp</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">User</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Action</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Details</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Duration</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Records</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedLogs.includes(log.id)}
                      onChange={() => handleSelectLog(log.id)}
                      className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-brand-dark">{log.timestamp}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{log.user}</div>
                    {log.ipAddress && (
                      <div className="text-xs text-gray-500">{log.ipAddress}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-brand-dark">{log.action}</div>
                    {log.resourceId && (
                      <div className="text-xs text-gray-500">ID: {log.resourceId}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label={log.category}>{getCategoryIcon(log.category)}</span>
                      <span className="text-sm text-gray-600 capitalize">{log.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(log.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-xs truncate" title={log.details}>
                      {log.details}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{formatDuration(log.duration)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{log.affectedRecords || '-'}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-brand-primary">{mockActivityLogs.length}</div>
          <div className="text-sm text-gray-600">Total Logs</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-status-success-text">
            {mockActivityLogs.filter(log => log.status === 'success').length}
          </div>
          <div className="text-sm text-gray-600">Successful Actions</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-status-error-text">
            {mockActivityLogs.filter(log => log.status === 'error').length}
          </div>
          <div className="text-sm text-gray-600">Errors</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-status-warning-text">
            {mockActivityLogs.filter(log => log.status === 'warning').length}
          </div>
          <div className="text-sm text-gray-600">Warnings</div>
        </div>
      </div>

      {/* Audit Trail Info */}
      <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-brand-dark mb-4">Audit Trail Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Log Retention</h4>
            <p className="text-sm text-gray-600">All activity logs are retained for 90 days for compliance and debugging purposes.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Export Options</h4>
            <p className="text-sm text-gray-600">Logs can be exported in CSV or JSON format with full metadata for external analysis.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Security</h4>
            <p className="text-sm text-gray-600">All logs include IP addresses, user agents, and timestamps for security auditing.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Real-time Monitoring</h4>
            <p className="text-sm text-gray-600">System automatically logs all user actions, API calls, and system events in real-time.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs; 