import { useState } from 'react';

// Fake data for authorization requests
const initialAuthorizations = [
  {
    id: 1,
    businessName: "Tech Solutions Inc.",
    licenseType: "Business Operation License",
    status: "Approved",
    submissionDate: "2023-08-01",
  },
  {
    id: 2,
    businessName: "Smart Gadgets Co.",
    licenseType: "Health & Safety Certificate",
    status: "Pending",
    submissionDate: "2023-09-15",
  },
  {
    id: 3,
    businessName: "Eco World",
    licenseType: "Environmental Clearance",
    status: "In Progress",
    submissionDate: "2023-09-10",
  },
];

const BusinessAuthorizations = () => {
  const [authorizations, setAuthorizations] = useState(initialAuthorizations);
  const [newAuthorization, setNewAuthorization] = useState({
    businessName: '',
    licenseType: '',
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const authorization = {
      id: authorizations.length + 1,
      ...newAuthorization,
      status: "Pending",
      submissionDate: new Date().toISOString().split('T')[0], // Add current date
    };
    setAuthorizations([...authorizations, authorization]);
    setNewAuthorization({ businessName: '', licenseType: '' });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Business Authorizations (Paid)</h1>

      {/* Authorization Requests List */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Current Business Authorizations</h2>
        <div className="space-y-4">
          {authorizations.map((auth) => (
            <div key={auth.id} className="p-4 border rounded-lg bg-gray-50">
              <p><strong>Business Name:</strong> {auth.businessName}</p>
              <p><strong>License Type:</strong> {auth.licenseType}</p>
              <p><strong>Status:</strong> 
                <span
                  className={`ml-2 px-2 py-1 text-white rounded ${
                    auth.status === 'Pending' ? 'bg-yellow-500' :
                    auth.status === 'In Progress' ? 'bg-blue-500' :
                    'bg-green-500'
                  }`}
                >
                  {auth.status}
                </span>
              </p>
              <p><strong>Submission Date:</strong> {auth.submissionDate}</p>
            </div>
          ))}
        </div>
      </div>

      {/* New Authorization Form */}
      <div className="p-6 bg-white border rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Request New Business Authorization</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="businessName">
              Business Name:
            </label>
            <input
              id="businessName"
              type="text"
              value={newAuthorization.businessName}
              onChange={(e) => setNewAuthorization({ ...newAuthorization, businessName: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="licenseType">
              License Type:
            </label>
            <input
              id="licenseType"
              type="text"
              value={newAuthorization.licenseType}
              onChange={(e) => setNewAuthorization({ ...newAuthorization, licenseType: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Authorization Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusinessAuthorizations;
