import React, { useState } from 'react';

interface CostEstimate {
  domainRegistration: number;
  workspace: number;
  sequencingTool: number;
  totalFirstMonth: number;
}

const CampaignSetup: React.FC = () => {
  const [formData, setFormData] = useState({
    campaignName: '',
    client: '',
    domainRegistrar: 'Namecheap',
    numberOfDomains: 10,
    domainPattern: '',
    keywords: '',
    workspaceProvider: 'Google Workspace',
    inboxesPerDomain: 3,
    inboxPattern: '',
    sequencingPlatform: 'Smartlead',
    warmupDuration: 14,
  });

  const [costEstimate, setCostEstimate] = useState<CostEstimate>({
    domainRegistration: 129.90,
    workspace: 180.00,
    sequencingTool: 97.00,
    totalFirstMonth: 406.90,
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Recalculate cost estimate when relevant fields change
    if (['numberOfDomains', 'inboxesPerDomain', 'workspaceProvider', 'sequencingPlatform'].includes(field)) {
      calculateCostEstimate({ ...formData, [field]: value });
    }
  };

  const calculateCostEstimate = (data: typeof formData) => {
    const domainCost = data.numberOfDomains * 12.99;
    const workspaceCost = data.inboxesPerDomain * data.numberOfDomains * 6; // $6 per inbox per month
    const sequencingCost = 97; // Smartlead starter plan
    
    setCostEstimate({
      domainRegistration: domainCost,
      workspace: workspaceCost,
      sequencingTool: sequencingCost,
      totalFirstMonth: domainCost + workspaceCost + sequencingCost,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement campaign creation logic
    console.log('Campaign data:', formData);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span role="img" aria-label="campaign">✨</span>
        New Campaign Setup
      </h1>

      {/* Security Warning */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-center gap-3">
        <span role="img" aria-label="warning" className="text-xl">⚠️</span>
        <span className="text-yellow-800">
          This will create real domains and incur costs. Please review all settings carefully.
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Campaign Info */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Campaign Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Q3 2025 Outreach"
                value={formData.campaignName}
                onChange={(e) => handleInputChange('campaignName', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.client}
                onChange={(e) => handleInputChange('client', e.target.value)}
              >
                <option value="">Select Client</option>
                <option value="Acme Corp">Acme Corp</option>
                <option value="TechStart Inc">TechStart Inc</option>
                <option value="Global Solutions">Global Solutions</option>
              </select>
            </div>
          </div>
        </div>

        {/* Domain Configuration */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Domain Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Domain Registrar
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.domainRegistrar}
                onChange={(e) => handleInputChange('domainRegistrar', e.target.value)}
              >
                <option value="Namecheap">Namecheap</option>
                <option value="Cloudflare">Cloudflare</option>
                <option value="GoDaddy">GoDaddy</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Domains
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max="100"
                value={formData.numberOfDomains}
                onChange={(e) => handleInputChange('numberOfDomains', parseInt(e.target.value))}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Domain Naming Pattern
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., {client}-{keyword}-{number}.com"
                value={formData.domainPattern}
                onChange={(e) => handleInputChange('domainPattern', e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords (comma separated)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="connect, reach, pro, hub"
                value={formData.keywords}
                onChange={(e) => handleInputChange('keywords', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Inbox Configuration */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Inbox Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workspace Provider
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.workspaceProvider}
                onChange={(e) => handleInputChange('workspaceProvider', e.target.value)}
              >
                <option value="Google Workspace">Google Workspace</option>
                <option value="Wholesale Provider A">Wholesale Provider A</option>
                <option value="Wholesale Provider B">Wholesale Provider B</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Inboxes per Domain
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max="10"
                value={formData.inboxesPerDomain}
                onChange={(e) => handleInputChange('inboxesPerDomain', parseInt(e.target.value))}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Inbox Naming Pattern
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., {firstname}.{lastname}"
                value={formData.inboxPattern}
                onChange={(e) => handleInputChange('inboxPattern', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Sequencing Tool */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Sequencing Tool</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.sequencingPlatform}
                onChange={(e) => handleInputChange('sequencingPlatform', e.target.value)}
              >
                <option value="Smartlead">Smartlead</option>
                <option value="Lemlist">Lemlist</option>
                <option value="Instantly">Instantly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Warmup Duration (days)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="7"
                max="30"
                value={formData.warmupDuration}
                onChange={(e) => handleInputChange('warmupDuration', parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Cost Estimate */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Cost Estimate</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-600">Domain Registration</div>
              <div className="text-xl font-semibold">${costEstimate.domainRegistration.toFixed(2)}</div>
              <div className="text-xs text-gray-500">{formData.numberOfDomains} domains × $12.99</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">{formData.workspaceProvider}</div>
              <div className="text-xl font-semibold">${costEstimate.workspace.toFixed(2)}/mo</div>
              <div className="text-xs text-gray-500">{formData.inboxesPerDomain * formData.numberOfDomains} inboxes × $6/mo</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Sequencing Tool</div>
              <div className="text-xl font-semibold">${costEstimate.sequencingTool.toFixed(2)}/mo</div>
              <div className="text-xs text-gray-500">{formData.sequencingPlatform} starter plan</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Total First Month</div>
              <div className="text-xl font-semibold text-brand-primary">${costEstimate.totalFirstMonth.toFixed(2)}</div>
              <div className="text-xs text-gray-500">One-time + Monthly</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-3 bg-brand-primary text-brand-light rounded-md hover:bg-brand-dark transition-colors flex items-center gap-2 font-bold"
          >
            <span role="img" aria-label="rocket">🚀</span>
            Start Campaign
          </button>
          <button
            type="button"
            className="px-6 py-3 bg-brand-secondary text-brand-dark rounded-md hover:bg-brand-accent transition-colors font-medium"
          >
            Save as Template
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignSetup; 