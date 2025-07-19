import React, { useState } from 'react';
import StatusBadge from '../components/ui/StatusBadge';

interface DNSRecord {
  id: string;
  type: 'A' | 'CNAME' | 'MX' | 'TXT' | 'SPF' | 'DMARC';
  name: string;
  value: string;
  ttl: number;
  status: 'verified' | 'pending' | 'error';
}

interface DomainDNS {
  id: string;
  domain: string;
  registrar: string;
  dnsHealth: 'healthy' | 'configuring' | 'error';
  propagationStatus: 'complete' | 'in_progress' | 'failed';
  records: DNSRecord[];
  lastVerified: string;
}

const mockDomainsDNS: DomainDNS[] = [
  {
    id: '1',
    domain: 'client-outreach-hub.com',
    registrar: 'Namecheap',
    dnsHealth: 'healthy',
    propagationStatus: 'complete',
    lastVerified: '2025-07-18 14:30',
    records: [
      { id: '1', type: 'A', name: '@', value: '192.168.1.1', ttl: 300, status: 'verified' },
      { id: '2', type: 'CNAME', name: 'www', value: '@', ttl: 300, status: 'verified' },
      { id: '3', type: 'MX', name: '@', value: 'mail.google.com', ttl: 300, status: 'verified' },
      { id: '4', type: 'TXT', name: '@', value: 'v=spf1 include:_spf.google.com ~all', ttl: 300, status: 'verified' },
    ],
  },
  {
    id: '2',
    domain: 'b2b-connect-pro.com',
    registrar: 'Cloudflare',
    dnsHealth: 'configuring',
    propagationStatus: 'in_progress',
    lastVerified: '2025-07-18 15:45',
    records: [
      { id: '5', type: 'A', name: '@', value: '192.168.1.2', ttl: 300, status: 'pending' },
      { id: '6', type: 'CNAME', name: 'www', value: '@', ttl: 300, status: 'pending' },
      { id: '7', type: 'MX', name: '@', value: 'mail.google.com', ttl: 300, status: 'error' },
    ],
  },
  {
    id: '3',
    domain: 'sales-velocity.net',
    registrar: 'GoDaddy',
    dnsHealth: 'error',
    propagationStatus: 'failed',
    lastVerified: '2025-07-18 16:20',
    records: [
      { id: '8', type: 'A', name: '@', value: '192.168.1.3', ttl: 300, status: 'error' },
      { id: '9', type: 'CNAME', name: 'www', value: '@', ttl: 300, status: 'error' },
    ],
  },
];

const DNSConfiguration: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('1');
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDiagnosing, setIsDiagnosing] = useState(false);

  const currentDomain = mockDomainsDNS.find(d => d.id === selectedDomain);

  const handleVerifyDNS = async () => {
    setIsVerifying(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsVerifying(false);
  };

  const handleDiagnoseIssues = async () => {
    setIsDiagnosing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsDiagnosing(false);
  };

  const handleBulkUpdate = () => {
    // TODO: Implement bulk DNS update
    console.log('Bulk update selected records:', selectedRecords);
  };

  const getPropagationStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
        return <StatusBadge status="completed">Complete</StatusBadge>;
      case 'in_progress':
        return <StatusBadge status="in_progress">In Progress</StatusBadge>;
      case 'failed':
        return <StatusBadge status="error">Failed</StatusBadge>;
      default:
        return <StatusBadge status="in_progress">{status}</StatusBadge>;
    }
  };

  const getRecordStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <StatusBadge status="completed">Verified</StatusBadge>;
      case 'pending':
        return <StatusBadge status="in_progress">Pending</StatusBadge>;
      case 'error':
        return <StatusBadge status="error">Error</StatusBadge>;
      default:
        return <StatusBadge status="in_progress">{status}</StatusBadge>;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span role="img" aria-label="dns">🛡️</span>
        DNS Configuration
      </h1>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button 
          onClick={handleVerifyDNS}
          disabled={isVerifying}
          className="px-6 py-3 bg-brand-primary text-brand-light rounded-md hover:bg-brand-dark transition-colors font-bold disabled:opacity-50"
        >
          {isVerifying ? 'Verifying...' : 'Verify DNS'}
        </button>
        <button 
          onClick={handleDiagnoseIssues}
          disabled={isDiagnosing}
          className="px-6 py-3 bg-brand-secondary text-brand-dark rounded-md hover:bg-brand-accent transition-colors font-medium disabled:opacity-50"
        >
          {isDiagnosing ? 'Diagnosing...' : 'Diagnose Issues'}
        </button>
        {selectedRecords.length > 0 && (
          <button 
            onClick={handleBulkUpdate}
            className="px-6 py-3 bg-brand-accent text-brand-dark rounded-md hover:bg-brand-secondary transition-colors font-medium"
          >
            Bulk Update ({selectedRecords.length})
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Domain Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Domain Selection</h2>
            <div className="space-y-3">
              {mockDomainsDNS.map((domain) => (
                <div
                  key={domain.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedDomain === domain.id
                      ? 'border-brand-primary bg-brand-primary bg-opacity-10'
                      : 'border-gray-200 hover:border-brand-primary'
                  }`}
                  onClick={() => setSelectedDomain(domain.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-brand-dark">{domain.domain}</span>
                    <StatusBadge status={domain.dnsHealth === 'healthy' ? 'completed' : domain.dnsHealth === 'configuring' ? 'in_progress' : 'error'}>
                      {domain.dnsHealth}
                    </StatusBadge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>Registrar: {domain.registrar}</div>
                    <div>Last Verified: {domain.lastVerified}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DNS Health Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">DNS Health Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Healthy Domains</span>
                <span className="font-semibold text-status-success-text">
                  {mockDomainsDNS.filter(d => d.dnsHealth === 'healthy').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Configuring</span>
                <span className="font-semibold text-status-warning-text">
                  {mockDomainsDNS.filter(d => d.dnsHealth === 'configuring').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Issues</span>
                <span className="font-semibold text-status-error-text">
                  {mockDomainsDNS.filter(d => d.dnsHealth === 'error').length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* DNS Records */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">DNS Records - {currentDomain?.domain}</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Propagation:</span>
                {currentDomain && getPropagationStatusBadge(currentDomain.propagationStatus)}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-brand-light">
                  <tr>
                    <th className="px-4 py-2 text-left">
                      <input
                        type="checkbox"
                        checked={selectedRecords.length === currentDomain?.records.length}
                        onChange={() => {
                          if (selectedRecords.length === currentDomain?.records.length) {
                            setSelectedRecords([]);
                          } else {
                            setSelectedRecords(currentDomain?.records.map(r => r.id) || []);
                          }
                        }}
                        className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                      />
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-brand-dark">Type</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-brand-dark">Name</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-brand-dark">Value</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-brand-dark">TTL</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-brand-dark">Status</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-brand-dark">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentDomain?.records.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedRecords.includes(record.id)}
                          onChange={() => {
                            setSelectedRecords(prev => 
                              prev.includes(record.id) 
                                ? prev.filter(id => id !== record.id)
                                : [...prev, record.id]
                            );
                          }}
                          className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-1 bg-brand-secondary text-brand-dark rounded text-xs font-mono">
                          {record.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-brand-dark">{record.name}</td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-600 max-w-xs truncate" title={record.value}>
                        {record.value}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{record.ttl}</td>
                      <td className="px-4 py-3">
                        {getRecordStatusBadge(record.status)}
                      </td>
                      <td className="px-4 py-3">
                        <button className="px-2 py-1 bg-brand-secondary text-brand-dark rounded text-xs font-medium hover:bg-brand-accent transition-colors">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add New Record */}
            <div className="mt-6 p-4 border border-dashed border-gray-300 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Add New DNS Record</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent">
                  <option value="A">A</option>
                  <option value="CNAME">CNAME</option>
                  <option value="MX">MX</option>
                  <option value="TXT">TXT</option>
                  <option value="SPF">SPF</option>
                  <option value="DMARC">DMARC</option>
                </select>
                <input
                  type="text"
                  placeholder="Name"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Value"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
                <button className="px-4 py-2 bg-brand-primary text-brand-light rounded-md hover:bg-brand-dark transition-colors font-medium">
                  Add Record
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DNSConfiguration; 