import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span role="img" aria-label="dashboard">📊</span>
        Dashboard Overview
      </h1>
      
      <div className="bg-blue-100 p-4 rounded-lg mb-6">
        <p className="text-blue-800">Dashboard is working! Testing basic rendering...</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-gray-900">147</div>
          <div className="text-sm text-gray-500">Active Domains</div>
        </div>
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-gray-900">441</div>
          <div className="text-sm text-gray-500">Total Inboxes</div>
        </div>
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-gray-900">98%</div>
          <div className="text-sm text-gray-500">DNS Health</div>
        </div>
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-gray-900">12</div>
          <div className="text-sm text-gray-500">Active Campaigns</div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <p className="text-gray-600">Activity table will be added back once we confirm basic rendering works.</p>
      </div>
    </div>
  );
};

export default Dashboard;