import React from 'react';

const deliveryData = [
  { month: 'Jan', deliveries: 120 },
  { month: 'Feb', deliveries: 150 },
  { month: 'Mar', deliveries: 200 },
  { month: 'Apr', deliveries: 180 },
  { month: 'May', deliveries: 220 },
  { month: 'Jun', deliveries: 250 },
];

const shipments = [
  { id: '1', destination: 'New York', status: 'In Transit', eta: '2024-10-05', cost: 250 },
  { id: '2', destination: 'Los Angeles', status: 'Delivered', eta: '2024-10-01', cost: 300 },
  { id: '3', destination: 'Chicago', status: 'Delayed', eta: '2024-10-07', cost: 200 },
  { id: '4', destination: 'Houston', status: 'In Transit', eta: '2024-10-06', cost: 275 },
  { id: '5', destination: 'Phoenix', status: 'Processing', eta: '2024-10-08', cost: 225 },
];

const TailwindShippingDashboard = () => {
  return (
    <div className="font-sans p-6">
      <h1 className="text-3xl font-bold mb-6">Shipping and Delivery Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard title="Total Shipments" value="1,245" change="+15% from last month" />
        <MetricCard title="On-Time Deliveries" value="92%" change="+2% from last month" />
        <MetricCard title="Average Cost per Shipment" value="$245" change="-5% from last month" />
        <MetricCard title="Delayed Shipments" value="23" change="+3 from last month" />
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Monthly Deliveries</h2>
        <div className="flex items-end h-64 border border-gray-200 rounded-lg p-4">
          {deliveryData.map((data, index) => (
            <div key={index} className="flex h-full flex-col items-center flex-1">
              <div 
                className="w-full bg-blue-500 rounded-t-sm" 
               style={{height : `${(data.deliveries/250)*100}%`}}
              ></div>
             
              <span className="text-sm mt-2">{data.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Recent Shipments</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Destination</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">ETA</th>
                <th className="px-6 py-3">Cost</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((shipment) => (
                <tr key={shipment.id} className="bg-white border-b">
                  <td className="px-6 py-4">{shipment.id}</td>
                  <td className="px-6 py-4">{shipment.destination}</td>
                  <td className="px-6 py-4">{shipment.status}</td>
                  <td className="px-6 py-4">{shipment.eta}</td>
                  <td className="px-6 py-4">${shipment.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, change }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
    <div className="text-2xl font-semibold">{value}</div>
    <p className="text-sm text-gray-600">{change}</p>
  </div>
);

export default TailwindShippingDashboard;