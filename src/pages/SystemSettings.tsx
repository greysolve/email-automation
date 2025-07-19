import React, { useState } from 'react';
import StatusBadge from '../components/ui/StatusBadge';

interface SystemSettings {
  // API Credentials
  googleWorkspaceCredentials: File | null;
  googleWorkspaceCredentialsName: string;
  googleDomainsApiKey: string;
  wholesaleProviderAApiKey: string;
  wholesaleProviderBApiKey: string;
  smartleadApiKey: string;
  lemlistApiKey: string;
  instantlyApiKey: string;

  // Security Settings
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
  };
  auditLogging: boolean;
  ipWhitelist: string[];

  // Notification Settings
  emailNotifications: boolean;
  slackNotifications: boolean;
  slackWebhookUrl: string;
  notificationTypes: {
    domainIssues: boolean;
    inboxWarnings: boolean;
    systemAlerts: boolean;
    costAlerts: boolean;
    securityEvents: boolean;
  };

  // System Configuration
  defaultInboxesPerDomain: number;
  defaultWarmupDays: number;
  maxDomainsPerCampaign: number;
  autoRenewalEnabled: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  logRetentionDays: number;
  costThreshold: number;
}

const mockSettings: SystemSettings = {
  // API Credentials
  googleWorkspaceCredentials: null,
  googleWorkspaceCredentialsName: '',
  googleDomainsApiKey: '••••••••••••••••••••••••••••••••',
  wholesaleProviderAApiKey: '••••••••••••••••••••••••••••••••',
  wholesaleProviderBApiKey: '••••••••••••••••••••••••••••••••',
  smartleadApiKey: '••••••••••••••••••••••••••••••••',
  lemlistApiKey: '••••••••••••••••••••••••••••••••',
  instantlyApiKey: '••••••••••••••••••••••••••••••••',

  // Security Settings
  twoFactorEnabled: true,
  sessionTimeout: 30,
  maxLoginAttempts: 5,
  passwordPolicy: {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
  },
  auditLogging: true,
  ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],

  // Notification Settings
  emailNotifications: true,
  slackNotifications: false,
  slackWebhookUrl: '',
  notificationTypes: {
    domainIssues: true,
    inboxWarnings: true,
    systemAlerts: true,
    costAlerts: true,
    securityEvents: true,
  },

  // System Configuration
  defaultInboxesPerDomain: 3,
  defaultWarmupDays: 14,
  maxDomainsPerCampaign: 10,
  autoRenewalEnabled: true,
  backupFrequency: 'daily',
  logRetentionDays: 90,
  costThreshold: 500,
};

const SystemSettings: React.FC = () => {
  const [settings, setSettings] = useState<SystemSettings>(mockSettings);
  const [activeTab, setActiveTab] = useState<'api' | 'security' | 'notifications' | 'system'>('api');
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [googleWorkspaceFile, setGoogleWorkspaceFile] = useState<File | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
    // Show success message
  };

  const handleInputChange = (section: keyof SystemSettings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSecurityChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [field]: value,
      },
    }));
  };

  const handlePasswordPolicyChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      passwordPolicy: {
        ...prev.passwordPolicy,
        [field]: value,
      },
    }));
  };

  const handleNotificationChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      notificationTypes: {
        ...prev.notificationTypes,
        [field]: value,
      },
    }));
  };

  const getConnectionStatus = (apiKey: string) => {
    // Mock connection status based on whether key is masked
    return apiKey.includes('••••') ? 'connected' : 'disconnected';
  };

  const handleGoogleWorkspaceFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setGoogleWorkspaceFile(file);
      setSettings(prev => ({
        ...prev,
        googleWorkspaceCredentials: file,
        googleWorkspaceCredentialsName: file.name,
      }));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <StatusBadge status="completed">Connected</StatusBadge>;
      case 'disconnected':
        return <StatusBadge status="error">Disconnected</StatusBadge>;
      default:
        return <StatusBadge status="in_progress">Unknown</StatusBadge>;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span role="img" aria-label="settings">⚙️</span>
        System Settings
      </h1>

      {/* Warning Banner */}
      <div className="bg-status-warning-bg border border-status-warning-border rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2">
          <span role="img" aria-label="warning">⚠️</span>
          <span className="text-status-warning-text font-medium">
            API keys are encrypted and stored securely. Only administrators can modify these settings.
          </span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('api')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'api'
              ? 'bg-brand-primary text-brand-light'
              : 'text-gray-600 hover:text-brand-dark'
          }`}
        >
          API Credentials
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'security'
              ? 'bg-brand-primary text-brand-light'
              : 'text-gray-600 hover:text-brand-dark'
          }`}
        >
          Security
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'notifications'
              ? 'bg-brand-primary text-brand-light'
              : 'text-gray-600 hover:text-brand-dark'
          }`}
        >
          Notifications
        </button>
        <button
          onClick={() => setActiveTab('system')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'system'
              ? 'bg-brand-primary text-brand-light'
              : 'text-gray-600 hover:text-brand-dark'
          }`}
        >
          System Config
        </button>
      </div>

      {/* API Credentials Tab */}
      {activeTab === 'api' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-brand-dark mb-4">API Credentials</h3>
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">API keys are masked for security</span>
            <button
              onClick={() => setShowApiKeys(!showApiKeys)}
              className="px-3 py-1 bg-brand-secondary text-brand-dark rounded text-sm font-medium hover:bg-brand-accent transition-colors"
            >
              {showApiKeys ? 'Hide Keys' : 'Show Keys'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Google Workspace */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Google Workspace</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Account Credentials (JSON)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-brand-primary transition-colors">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleGoogleWorkspaceFileChange}
                    className="hidden"
                    id="google-workspace-file"
                  />
                  <label htmlFor="google-workspace-file" className="cursor-pointer">
                    {googleWorkspaceFile ? (
                      <div>
                        <span role="img" aria-label="file" className="text-2xl">📄</span>
                        <p className="text-sm font-medium text-brand-dark mt-2">{googleWorkspaceFile.name}</p>
                        <p className="text-xs text-gray-500 mt-1">Click to change file</p>
                      </div>
                    ) : (
                      <div>
                        <span role="img" aria-label="upload" className="text-2xl">📁</span>
                        <p className="text-sm font-medium text-brand-dark mt-2">Upload service account JSON</p>
                        <p className="text-xs text-gray-500 mt-1">Drag and drop or click to browse</p>
                      </div>
                    )}
                  </label>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  Download from Google Cloud Console → IAM & Admin → Service Accounts
                </div>
                <div className="mt-1">
                  {googleWorkspaceFile ? (
                    getStatusBadge('connected')
                  ) : (
                    getStatusBadge('disconnected')
                  )}
                </div>
              </div>
            </div>

            {/* Google Domains */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Google Domains</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                <input
                  type={showApiKeys ? 'text' : 'password'}
                  value={settings.googleDomainsApiKey}
                  onChange={(e) => handleInputChange('googleDomainsApiKey', '', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
                <div className="mt-1">{getStatusBadge(getConnectionStatus(settings.googleDomainsApiKey))}</div>
              </div>
            </div>

            {/* Wholesale Providers */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Wholesale Provider A</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                <input
                  type={showApiKeys ? 'text' : 'password'}
                  value={settings.wholesaleProviderAApiKey}
                  onChange={(e) => handleInputChange('wholesaleProviderAApiKey', '', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
                <div className="mt-1">{getStatusBadge(getConnectionStatus(settings.wholesaleProviderAApiKey))}</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Wholesale Provider B</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                <input
                  type={showApiKeys ? 'text' : 'password'}
                  value={settings.wholesaleProviderBApiKey}
                  onChange={(e) => handleInputChange('wholesaleProviderBApiKey', '', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
                <div className="mt-1">{getStatusBadge(getConnectionStatus(settings.wholesaleProviderBApiKey))}</div>
              </div>
            </div>

            {/* Sequencing Tools */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Smartlead</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                <input
                  type={showApiKeys ? 'text' : 'password'}
                  value={settings.smartleadApiKey}
                  onChange={(e) => handleInputChange('smartleadApiKey', '', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
                <div className="mt-1">{getStatusBadge(getConnectionStatus(settings.smartleadApiKey))}</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Lemlist</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                <input
                  type={showApiKeys ? 'text' : 'password'}
                  value={settings.lemlistApiKey}
                  onChange={(e) => handleInputChange('lemlistApiKey', '', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
                <div className="mt-1">{getStatusBadge(getConnectionStatus(settings.lemlistApiKey))}</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Instantly</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                <input
                  type={showApiKeys ? 'text' : 'password'}
                  value={settings.instantlyApiKey}
                  onChange={(e) => handleInputChange('instantlyApiKey', '', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
                <div className="mt-1">{getStatusBadge(getConnectionStatus(settings.instantlyApiKey))}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-brand-dark mb-4">Security Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Two-Factor Authentication */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Two-Factor Authentication</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Enable 2FA for all users</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.twoFactorEnabled}
                    onChange={(e) => handleSecurityChange('twoFactorEnabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                </label>
              </div>
            </div>

            {/* Session Management */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Session Management</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
                <input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Login Attempts</label>
                <input
                  type="number"
                  value={settings.maxLoginAttempts}
                  onChange={(e) => handleSecurityChange('maxLoginAttempts', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Password Policy */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Password Policy</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Length</label>
                <input
                  type="number"
                  value={settings.passwordPolicy.minLength}
                  onChange={(e) => handlePasswordPolicyChange('minLength', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.passwordPolicy.requireUppercase}
                    onChange={(e) => handlePasswordPolicyChange('requireUppercase', e.target.checked)}
                    className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                  />
                  <label className="ml-2 text-sm text-gray-700">Require uppercase letters</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.passwordPolicy.requireLowercase}
                    onChange={(e) => handlePasswordPolicyChange('requireLowercase', e.target.checked)}
                    className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                  />
                  <label className="ml-2 text-sm text-gray-700">Require lowercase letters</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.passwordPolicy.requireNumbers}
                    onChange={(e) => handlePasswordPolicyChange('requireNumbers', e.target.checked)}
                    className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                  />
                  <label className="ml-2 text-sm text-gray-700">Require numbers</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.passwordPolicy.requireSpecialChars}
                    onChange={(e) => handlePasswordPolicyChange('requireSpecialChars', e.target.checked)}
                    className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                  />
                  <label className="ml-2 text-sm text-gray-700">Require special characters</label>
                </div>
              </div>
            </div>

            {/* Audit Logging */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Audit & Logging</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Enable audit logging</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.auditLogging}
                    onChange={(e) => handleSecurityChange('auditLogging', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">IP Whitelist (one per line)</label>
                <textarea
                  value={settings.ipWhitelist.join('\n')}
                  onChange={(e) => handleSecurityChange('ipWhitelist', e.target.value.split('\n').filter(ip => ip.trim()))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  placeholder="192.168.1.0/24&#10;10.0.0.0/8"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-brand-dark mb-4">Notification Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Notifications */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Email Notifications</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Enable email notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => setSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                </label>
              </div>
            </div>

            {/* Slack Notifications */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Slack Notifications</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Enable Slack notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.slackNotifications}
                    onChange={(e) => setSettings(prev => ({ ...prev, slackNotifications: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                </label>
              </div>
              {settings.slackNotifications && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slack Webhook URL</label>
                  <input
                    type="url"
                    value={settings.slackWebhookUrl}
                    onChange={(e) => setSettings(prev => ({ ...prev, slackWebhookUrl: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    placeholder="https://hooks.slack.com/services/..."
                  />
                </div>
              )}
            </div>

            {/* Notification Types */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="font-medium text-gray-700">Notification Types</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notificationTypes.domainIssues}
                    onChange={(e) => handleNotificationChange('domainIssues', e.target.checked)}
                    className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                  />
                  <label className="ml-2 text-sm text-gray-700">Domain issues and DNS problems</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notificationTypes.inboxWarnings}
                    onChange={(e) => handleNotificationChange('inboxWarnings', e.target.checked)}
                    className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                  />
                  <label className="ml-2 text-sm text-gray-700">Inbox warnings and warmup issues</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notificationTypes.systemAlerts}
                    onChange={(e) => handleNotificationChange('systemAlerts', e.target.checked)}
                    className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                  />
                  <label className="ml-2 text-sm text-gray-700">System alerts and maintenance</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notificationTypes.costAlerts}
                    onChange={(e) => handleNotificationChange('costAlerts', e.target.checked)}
                    className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                  />
                  <label className="ml-2 text-sm text-gray-700">Cost threshold alerts</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notificationTypes.securityEvents}
                    onChange={(e) => handleNotificationChange('securityEvents', e.target.checked)}
                    className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                  />
                  <label className="ml-2 text-sm text-gray-700">Security events and login attempts</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Configuration Tab */}
      {activeTab === 'system' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-brand-dark mb-4">System Configuration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Default Settings */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Default Settings</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default Inboxes per Domain</label>
                <input
                  type="number"
                  value={settings.defaultInboxesPerDomain}
                  onChange={(e) => setSettings(prev => ({ ...prev, defaultInboxesPerDomain: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default Warmup Days</label>
                <input
                  type="number"
                  value={settings.defaultWarmupDays}
                  onChange={(e) => setSettings(prev => ({ ...prev, defaultWarmupDays: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Domains per Campaign</label>
                <input
                  type="number"
                  value={settings.maxDomainsPerCampaign}
                  onChange={(e) => setSettings(prev => ({ ...prev, maxDomainsPerCampaign: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* System Preferences */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">System Preferences</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Enable auto-renewal</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoRenewalEnabled}
                    onChange={(e) => setSettings(prev => ({ ...prev, autoRenewalEnabled: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Backup Frequency</label>
                <select
                  value={settings.backupFrequency}
                  onChange={(e) => setSettings(prev => ({ ...prev, backupFrequency: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Log Retention (days)</label>
                <input
                  type="number"
                  value={settings.logRetentionDays}
                  onChange={(e) => setSettings(prev => ({ ...prev, logRetentionDays: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cost Threshold ($)</label>
                <input
                  type="number"
                  value={settings.costThreshold}
                  onChange={(e) => setSettings(prev => ({ ...prev, costThreshold: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-8 py-3 bg-brand-primary text-brand-light rounded-md hover:bg-brand-dark transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
};

export default SystemSettings; 