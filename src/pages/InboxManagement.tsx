import React, { useState } from 'react';
import StatusBadge from '../components/ui/StatusBadge';

interface Inbox {
  id: string;
  email: string;
  domain: string;
  provider: 'Google Workspace' | 'Wholesale Provider A' | 'Wholesale Provider B';
  status: 'active' | 'warmup' | 'paused' | 'error';
  warmupProgress: number;
  warmupDays: number;
  sendingLimit: number;
  currentUsage: number;
  sequencerConnected: boolean;
  sequencerTool: 'Smartlead' | 'Lemlist' | 'Instantly' | null;
  lastActivity: string;
  bounceRate: number;
  spamComplaints: number;
  blacklistStatus: 'clean' | 'warned' | 'blacklisted';
}

const mockInboxes: Inbox[] = [
  {
    id: '1',
    email: 'john.doe@client-outreach-hub.com',
    domain: 'client-outreach-hub.com',
    provider: 'Google Workspace',
    status: 'active',
    warmupProgress: 100,
    warmupDays: 14,
    sendingLimit: 50,
    currentUsage: 23,
    sequencerConnected: true,
    sequencerTool: 'Smartlead',
    lastActivity: '2025-07-18 14:30',
    bounceRate: 2.1,
    spamComplaints: 0,
    blacklistStatus: 'clean',
  },
  {
    id: '2',
    email: 'sarah.smith@client-outreach-hub.com',
    domain: 'client-outreach-hub.com',
    provider: 'Google Workspace',
    status: 'warmup',
    warmupProgress: 65,
    warmupDays: 9,
    sendingLimit: 35,
    currentUsage: 28,
    sequencerConnected: true,
    sequencerTool: 'Smartlead',
    lastActivity: '2025-07-18 15:45',
    bounceRate: 1.8,
    spamComplaints: 0,
    blacklistStatus: 'clean',
  },
  {
    id: '3',
    email: 'mike.wilson@client-outreach-hub.com',
    domain: 'client-outreach-hub.com',
    provider: 'Google Workspace',
    status: 'warmup',
    warmupProgress: 35,
    warmupDays: 5,
    sendingLimit: 20,
    currentUsage: 15,
    sequencerConnected: false,
    sequencerTool: null,
    lastActivity: '2025-07-18 16:20',
    bounceRate: 0,
    spamComplaints: 0,
    blacklistStatus: 'clean',
  },
  {
    id: '4',
    email: 'contact@b2b-connect-pro.com',
    domain: 'b2b-connect-pro.com',
    provider: 'Wholesale Provider A',
    status: 'paused',
    warmupProgress: 0,
    warmupDays: 0,
    sendingLimit: 100,
    currentUsage: 0,
    sequencerConnected: false,
    sequencerTool: null,
    lastActivity: '2025-07-17 10:15',
    bounceRate: 8.5,
    spamComplaints: 2,
    blacklistStatus: 'warned',
  },
  {
    id: '5',
    email: 'sales@b2b-connect-pro.com',
    domain: 'b2b-connect-pro.com',
    provider: 'Wholesale Provider A',
    status: 'error',
    warmupProgress: 0,
    warmupDays: 0,
    sendingLimit: 100,
    currentUsage: 0,
    sequencerConnected: false,
    sequencerTool: null,
    lastActivity: '2025-07-16 09:30',
    bounceRate: 15.2,
    spamComplaints: 5,
    blacklistStatus: 'blacklisted',
  },
];

const InboxManagement: React.FC = () => {
  const [selectedInboxes, setSelectedInboxes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [providerFilter, setProviderFilter] = useState('');

  const handleSelectAll = () => {
    if (selectedInboxes.length === mockInboxes.length) {
      setSelectedInboxes([]);
    } else {
      setSelectedInboxes(mockInboxes.map(i => i.id));
    }
  };

  const handleSelectInbox = (inboxId: string) => {
    setSelectedInboxes(prev => 
      prev.includes(inboxId) 
        ? prev.filter(id => id !== inboxId)
        : [...prev, inboxId]
    );
  };

  const filteredInboxes = mockInboxes.filter(inbox =>
    (inbox.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     inbox.domain.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === '' || inbox.status === statusFilter) &&
    (providerFilter === '' || inbox.provider === providerFilter)
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <StatusBadge status="completed">Active</StatusBadge>;
      case 'warmup':
        return <StatusBadge status="in_progress">Warmup</StatusBadge>;
      case 'paused':
        return <StatusBadge status="in_progress">Paused</StatusBadge>;
      case 'error':
        return <StatusBadge status="error">Error</StatusBadge>;
      default:
        return <StatusBadge status="in_progress">{status}</StatusBadge>;
    }
  };

  const getBlacklistStatusBadge = (status: string) => {
    switch (status) {
      case 'clean':
        return <StatusBadge status="completed">Clean</StatusBadge>;
      case 'warned':
        return <StatusBadge status="in_progress">Warned</StatusBadge>;
      case 'blacklisted':
        return <StatusBadge status="error">Blacklisted</StatusBadge>;
      default:
        return <StatusBadge status="in_progress">{status}</StatusBadge>;
    }
  };

  const getUsagePercentage = (current: number, limit: number) => {
    return Math.round((current / limit) * 100);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span role="img" aria-label="inboxes">📧</span>
        Inbox Management
      </h1>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button className="px-6 py-3 bg-brand-primary text-brand-light rounded-md hover:bg-brand-dark transition-colors font-bold">
          Provision New Inboxes
        </button>
        <button className="px-6 py-3 bg-brand-secondary text-brand-dark rounded-md hover:bg-brand-accent transition-colors font-medium">
          Connect to Sequencer
        </button>
        {selectedInboxes.length > 0 && (
          <button className="px-6 py-3 bg-brand-accent text-brand-dark rounded-md hover:bg-brand-secondary transition-colors font-medium">
            Bulk Update ({selectedInboxes.length})
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search inboxes or domains..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="warmup">Warmup</option>
            <option value="paused">Paused</option>
            <option value="error">Error</option>
          </select>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            value={providerFilter}
            onChange={(e) => setProviderFilter(e.target.value)}
          >
            <option value="">All Providers</option>
            <option value="Google Workspace">Google Workspace</option>
            <option value="Wholesale Provider A">Wholesale Provider A</option>
            <option value="Wholesale Provider B">Wholesale Provider B</option>
          </select>
        </div>
      </div>

      {/* Inboxes Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-brand-light">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedInboxes.length === mockInboxes.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                  />
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Domain</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Provider</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Warmup</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Usage</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Sequencer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Health</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInboxes.map((inbox) => (
                <tr key={inbox.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedInboxes.includes(inbox.id)}
                      onChange={() => handleSelectInbox(inbox.id)}
                      className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-brand-dark">{inbox.email}</div>
                    <div className="text-xs text-gray-500">{inbox.lastActivity}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{inbox.domain}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{inbox.provider}</td>
                  <td className="px-6 py-4">
                    {getStatusBadge(inbox.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-brand-secondary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${inbox.warmupProgress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{inbox.warmupProgress}%</span>
                    </div>
                    {inbox.warmupDays > 0 && (
                      <div className="text-xs text-gray-500 mt-1">Day {inbox.warmupDays}/14</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">
                      {inbox.currentUsage}/{inbox.sendingLimit}
                    </div>
                    <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                      <div 
                        className={`h-1 rounded-full transition-all duration-300 ${
                          getUsagePercentage(inbox.currentUsage, inbox.sendingLimit) > 80 
                            ? 'bg-status-error-bg' 
                            : getUsagePercentage(inbox.currentUsage, inbox.sendingLimit) > 60 
                            ? 'bg-status-warning-bg' 
                            : 'bg-status-success-bg'
                        }`}
                        style={{ width: `${getUsagePercentage(inbox.currentUsage, inbox.sendingLimit)}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {inbox.sequencerConnected ? (
                      <div className="flex items-center gap-2">
                        <StatusBadge status="completed">Connected</StatusBadge>
                        <span className="text-xs text-gray-600">{inbox.sequencerTool}</span>
                      </div>
                    ) : (
                      <StatusBadge status="in_progress">Disconnected</StatusBadge>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-xs">
                        <span className="text-gray-600">Bounce:</span> 
                        <span className={`ml-1 ${inbox.bounceRate > 5 ? 'text-status-error-text' : 'text-status-success-text'}`}>
                          {inbox.bounceRate}%
                        </span>
                      </div>
                      <div className="text-xs">
                        <span className="text-gray-600">Spam:</span> 
                        <span className={`ml-1 ${inbox.spamComplaints > 0 ? 'text-status-error-text' : 'text-status-success-text'}`}>
                          {inbox.spamComplaints}
                        </span>
                      </div>
                      {getBlacklistStatusBadge(inbox.blacklistStatus)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <button className="px-2 py-1 bg-brand-secondary text-brand-dark rounded text-xs font-medium hover:bg-brand-accent transition-colors">
                        Edit
                      </button>
                      <button className="px-2 py-1 bg-brand-accent text-brand-dark rounded text-xs font-medium hover:bg-brand-secondary transition-colors">
                        Test
                      </button>
                    </div>
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
          <div className="text-2xl font-bold text-brand-primary">{mockInboxes.length}</div>
          <div className="text-sm text-gray-600">Total Inboxes</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-status-success-text">
            {mockInboxes.filter(i => i.status === 'active').length}
          </div>
          <div className="text-sm text-gray-600">Active Inboxes</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-status-warning-text">
            {mockInboxes.filter(i => i.status === 'warmup').length}
          </div>
          <div className="text-sm text-gray-600">In Warmup</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-status-error-text">
            {mockInboxes.filter(i => i.status === 'error' || i.blacklistStatus === 'blacklisted').length}
          </div>
          <div className="text-sm text-gray-600">Issues</div>
        </div>
      </div>
    </div>
  );
};

export default InboxManagement; 