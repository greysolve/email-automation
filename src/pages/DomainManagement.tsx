import React, { useState } from 'react';
import StatusBadge from '../components/ui/StatusBadge';

interface Domain {
  id: string;
  domain: string;
  registrar: string;
  status: 'active' | 'pending' | 'error';
  inboxes: string;
  dnsHealth: 'healthy' | 'configuring' | 'error';
  created: string;
}

const mockDomains: Domain[] = [
  {
    id: '1',
    domain: 'client-outreach-hub.com',
    registrar: 'Namecheap',
    status: 'active',
    inboxes: '3/3',
    dnsHealth: 'healthy',
    created: '2025-07-15',
  },
  {
    id: '2',
    domain: 'b2b-connect-pro.com',
    registrar: 'Cloudflare',
    status: 'active',
    inboxes: '3/3',
    dnsHealth: 'configuring',
    created: '2025-07-18',
  },
  {
    id: '3',
    domain: 'sales-velocity.net',
    registrar: 'GoDaddy',
    status: 'pending',
    inboxes: '0/3',
    dnsHealth: 'error',
    created: '2025-07-19',
  },
  {
    id: '4',
    domain: 'lead-gen-master.com',
    registrar: 'Namecheap',
    status: 'active',
    inboxes: '2/3',
    dnsHealth: 'healthy',
    created: '2025-07-14',
  },
];

const DomainManagement: React.FC = () => {
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectAll = () => {
    if (selectedDomains.length === mockDomains.length) {
      setSelectedDomains([]);
    } else {
      setSelectedDomains(mockDomains.map(d => d.id));
    }
  };

  const handleSelectDomain = (domainId: string) => {
    setSelectedDomains(prev => 
      prev.includes(domainId) 
        ? prev.filter(id => id !== domainId)
        : [...prev, domainId]
    );
  };

  const filteredDomains = mockDomains.filter(domain =>
    domain.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    domain.registrar.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <StatusBadge status="completed">Active</StatusBadge>;
      case 'pending':
        return <StatusBadge status="in_progress">Pending</StatusBadge>;
      case 'error':
        return <StatusBadge status="error">Error</StatusBadge>;
      default:
        return <StatusBadge status="in_progress">{status}</StatusBadge>;
    }
  };

  const getDNSHealthBadge = (health: string) => {
    switch (health) {
      case 'healthy':
        return <StatusBadge status="completed">Healthy</StatusBadge>;
      case 'configuring':
        return <StatusBadge status="in_progress">Configuring</StatusBadge>;
      case 'error':
        return <StatusBadge status="error">Error</StatusBadge>;
      default:
        return <StatusBadge status="in_progress">{health}</StatusBadge>;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span role="img" aria-label="domains">🌐</span>
        Domain Management
      </h1>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button className="px-6 py-3 bg-brand-primary text-brand-light rounded-md hover:bg-brand-dark transition-colors font-bold">
          Register New Domains
        </button>
        <button className="px-6 py-3 bg-brand-secondary text-brand-dark rounded-md hover:bg-brand-accent transition-colors font-medium">
          Bulk Import
        </button>
        {selectedDomains.length > 0 && (
          <button className="px-6 py-3 bg-brand-accent text-brand-dark rounded-md hover:bg-brand-secondary transition-colors font-medium">
            Bulk Actions ({selectedDomains.length})
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search domains or registrars..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="error">Error</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent">
            <option value="">All Registrars</option>
            <option value="namecheap">Namecheap</option>
            <option value="cloudflare">Cloudflare</option>
            <option value="godaddy">GoDaddy</option>
          </select>
        </div>
      </div>

      {/* Domains Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-brand-light">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedDomains.length === mockDomains.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                  />
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Domain</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Registrar</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Inboxes</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">DNS Health</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Created</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDomains.map((domain) => (
                <tr key={domain.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedDomains.includes(domain.id)}
                      onChange={() => handleSelectDomain(domain.id)}
                      className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-brand-dark">
                    {domain.domain}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {domain.registrar}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(domain.status)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {domain.inboxes}
                  </td>
                  <td className="px-6 py-4">
                    {getDNSHealthBadge(domain.dnsHealth)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {domain.created}
                  </td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1 bg-brand-secondary text-brand-dark rounded text-xs font-medium hover:bg-brand-accent transition-colors">
                      Manage
                    </button>
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
          <div className="text-2xl font-bold text-brand-primary">{mockDomains.length}</div>
          <div className="text-sm text-gray-600">Total Domains</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-status-success-text">
            {mockDomains.filter(d => d.status === 'active').length}
          </div>
          <div className="text-sm text-gray-600">Active Domains</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-status-warning-text">
            {mockDomains.filter(d => d.dnsHealth === 'healthy').length}
          </div>
          <div className="text-sm text-gray-600">Healthy DNS</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-status-error-text">
            {mockDomains.filter(d => d.dnsHealth === 'error').length}
          </div>
          <div className="text-sm text-gray-600">DNS Issues</div>
        </div>
      </div>
    </div>
  );
};

export default DomainManagement; 