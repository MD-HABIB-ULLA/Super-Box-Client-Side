import { useState } from 'react';

// Fake Data for conflict reports
const initialReports = [
  {
    id: 1,
    reporter: "John Doe",
    role: "Customer",
    issue: "Product not received",
    status: "Pending",
  },
  {
    id: 2,
    reporter: "Jane Smith",
    role: "Seller",
    issue: "Customer filed a false claim",
    status: "In Progress",
  },
  {
    id: 3,
    reporter: "Alice Johnson",
    role: "Customer",
    issue: "Received damaged product",
    status: "Resolved",
  },
];

const ConflictReportManagement = () => {
  const [reports, setReports] = useState(initialReports);
  const [newReport, setNewReport] = useState({
    reporter: '',
    role: '',
    issue: '',
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const report = {
      id: reports.length + 1,
      ...newReport,
      status: 'Pending',
    };
    setReports([...reports, report]);
    setNewReport({ reporter: '', role: '', issue: '' });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Conflict Report & Management</h1>

      {/* Conflict Reports List */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Current Conflict Reports</h2>
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="p-4 border rounded-lg bg-gray-50">
              <p><strong>Reporter:</strong> {report.reporter} ({report.role})</p>
              <p><strong>Issue:</strong> {report.issue}</p>
              <p><strong>Status:</strong> 
                <span
                  className={`ml-2 px-2 py-1 text-white rounded ${
                    report.status === 'Pending' ? 'bg-yellow-500' :
                    report.status === 'In Progress' ? 'bg-blue-500' :
                    'bg-green-500'
                  }`}
                >
                  {report.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* New Report Form */}
      <div className="p-6 bg-white border rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">File a New Report</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="reporter">
              Reporter Name:
            </label>
            <input
              id="reporter"
              type="text"
              value={newReport.reporter}
              onChange={(e) => setNewReport({ ...newReport, reporter: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="role">
              Role:
            </label>
            <select
              id="role"
              value={newReport.role}
              onChange={(e) => setNewReport({ ...newReport, role: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-blue-500"
              required
            >
              <option value="">Select Role</option>
              <option value="Customer">Customer</option>
              <option value="Seller">Seller</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="issue">
              Issue:
            </label>
            <textarea
              id="issue"
              value={newReport.issue}
              onChange={(e) => setNewReport({ ...newReport, issue: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConflictReportManagement;
