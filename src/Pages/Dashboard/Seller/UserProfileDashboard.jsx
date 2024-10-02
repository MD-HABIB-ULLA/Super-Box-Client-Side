import React, { useState } from 'react';

// Fake data
const userData = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  role: "Manager",
  avatar: "/api/placeholder/100/100", // Placeholder image
};

const teamMembers = [
  { id: 1, name: "John Smith", email: "john.smith@example.com", role: "Developer", permissions: ["view", "edit"] },
  { id: 2, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Designer", permissions: ["view"] },
  { id: 3, name: "Bob Williams", email: "bob.williams@example.com", role: "Marketer", permissions: ["view", "edit", "admin"] },
];

const subscriptionData = {
  plan: "Professional",
  status: "Active",
  renewalDate: "2024-12-31",
  price: "$49.99/month",
};

const UserProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

      <div className="flex mb-6">
        <button
          className={`mr-4 px-4 py-2 rounded ${activeTab === 'profile' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`mr-4 px-4 py-2 rounded ${activeTab === 'team' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('team')}
        >
          Team
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'subscription' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('subscription')}
        >
          Subscription
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
          <div className="flex items-center mb-4">
            <img src={userData.avatar} alt="User Avatar" className="w-20 h-20 rounded-full mr-4" />
            <div>
              <p className="text-xl font-semibold">{userData.name}</p>
              <p className="text-gray-600">{userData.email}</p>
              <p className="text-gray-600">{userData.role}</p>
            </div>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Edit Profile
          </button>
        </div>
      )}

      {activeTab === 'team' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Team Members</h2>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Role</th>
                <th className="text-left p-2">Permissions</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr key={member.id} className="border-b">
                  <td className="p-2">{member.name}</td>
                  <td className="p-2">{member.email}</td>
                  <td className="p-2">{member.role}</td>
                  <td className="p-2">{member.permissions.join(', ')}</td>
                  <td className="p-2">
                    <button className="text-blue-500 hover:underline mr-2">Edit</button>
                    <button className="text-red-500 hover:underline">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Add Team Member
          </button>
        </div>
      )}

      {activeTab === 'subscription' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Subscription Details</h2>
          <div className="mb-4">
            <p><strong>Current Plan:</strong> {subscriptionData.plan}</p>
            <p><strong>Status:</strong> {subscriptionData.status}</p>
            <p><strong>Renewal Date:</strong> {subscriptionData.renewalDate}</p>
            <p><strong>Price:</strong> {subscriptionData.price}</p>
          </div>
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 mr-2">
            Upgrade Plan
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Manage Billing
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileDashboard;