import React, { useContext, useEffect, useState } from "react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../Provider/AuthProvider";

const BookedServices = () => {
  //   const { data: contextData } = useContext(WebDataDisContext);
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [services, setServices] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    if (user) {
      try {
        setIsLoading(true);
        const res = await axiosPublic.get(
          `/bookService?key=userEmail&value=${user.email}`
        );
        setServices(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Fetch the services when the component mounts or shopName changes
  useEffect(() => {
    fetchServices();
  }, [user.email]);

  if (isLoading) return <p className="text-center py-4">Loading...</p>;
  if (error)
    return (
      <p className="text-center py-4 text-red-500">Error: {error.message}</p>
    );

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Booked Services</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Service Name</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Time</th>
              <th className="py-2 px-4 border-b">Cost</th>
              <th className="py-2 px-4 border-b">Transaction ID</th>
              <th className="py-2 px-4 border-b">Payment Status</th>
              <th className="py-2 px-4 border-b">Payment Method</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{service.serviceName}</td>
                <td className="py-2 px-4 border-b">{service.date}</td>
                <td className="py-2 px-4 border-b">{service.time}</td>
                <td className="py-2 px-4 border-b">
                  BDT {service.serviceCost}
                </td>
                <td className="py-2 px-4 border-b">
                  {service.transactionId || "N/A"}
                </td>
                <td className="py-2 px-4 border-b">
                  {service.isPaid ? "Paid" : "Pending"}
                </td>
                <td className="py-2 px-4 border-b">
                  {service.paymentMethod || "N/A"}
                </td>
                <td className="py-2 px-4 border-b">{service.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookedServices;
