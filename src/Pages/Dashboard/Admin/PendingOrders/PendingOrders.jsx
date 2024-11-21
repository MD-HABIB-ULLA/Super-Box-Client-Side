import React, { useState, useEffect } from "react";
import axios from "axios";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const PendingOrders = () => {
    const axiosPublic = useAxiosPublic()
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch orders dynamically from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosPublic.get("/productDelivery");
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  console.log(orders)
  return (
    <div className="font-sans p-4">
      <h1 className="text-2xl text-indigo-600 font-semibold mb-6">
        Order Management
      </h1>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border-collapse border border-gray-200">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Product ID</th>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Shop Name</th>
              <th className="py-3 px-4 text-left">Seller Email</th>
              <th className="py-3 px-4 text-left">Buyer Email</th>
              <th className="py-3 px-4 text-left">Transaction ID</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr
                key={order._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-4">{order._id}</td>
                <td className="py-3 px-4">
                  <img
                    src={order.image}
                    alt={order.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-4">${order.price}</td>
                <td className="py-3 px-4">{order.shopName}</td>
                <td className="py-3 px-4">{order.sellerEmail}</td>
                <td className="py-3 px-4">{order.buyerEmail}</td>
                <td className="py-3 px-4">{order.transactionId}</td>
                <td className="py-3 px-4">
                  <span
                    className={`py-1 px-2 rounded text-xs font-semibold ${
                      order.paymentStatus === "success"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => openModal(order)}
                    className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md overflow-y-auto">
            <h2 className="text-xl text-indigo-600 font-semibold mb-4">
              Order Details
            </h2>
            <p>
              <strong>Product Name:</strong> {selectedOrder.name}
            </p>
            <p>
              <strong>Description:</strong> {selectedOrder.description}
            </p>
            <p>
              <strong>Price:</strong> ${selectedOrder.price}
            </p>
            <p>
              <strong>Shop Name:</strong> {selectedOrder.shopName}
            </p>
            <p>
              <strong>Seller Email:</strong> {selectedOrder.sellerEmail}
            </p>
            <p>
              <strong>Buyer Email:</strong> {selectedOrder.buyerEmail}
            </p>
            <p>
              <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
            </p>
            <p>
              <strong>Is Received:</strong>{" "}
              {selectedOrder.isReceived ? "Yes" : "No"}
            </p>
            <p>
              <strong>Payment Status:</strong> {selectedOrder.paymentStatus}
            </p>
            <p>
              <strong>Transaction ID:</strong> {selectedOrder.transactionId}
            </p>
            <h3 className="text-lg text-indigo-600 font-semibold mt-4">
              Customer Address
            </h3>
            <p>
              <strong>Street:</strong> {selectedOrder.customerAddress.street}
            </p>
            <p>
              <strong>City:</strong> {selectedOrder.customerAddress.city}
            </p>
            <p>
              <strong>State:</strong> {selectedOrder.customerAddress.state}
            </p>
            <p>
              <strong>Postal Code:</strong>{" "}
              {selectedOrder.customerAddress.postalCode}
            </p>
            <p>
              <strong>Country:</strong> {selectedOrder.customerAddress.country}
            </p>
            <button
              onClick={closeModal}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingOrders;
