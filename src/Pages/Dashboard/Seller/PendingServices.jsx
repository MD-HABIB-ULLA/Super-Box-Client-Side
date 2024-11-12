import React, { useContext, useEffect, useState } from "react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Check, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

const PendingServices = () => {
  const { data: contextData } = useContext(WebDataDisContext);
  const axiosPublic = useAxiosPublic();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    if (contextData?.webInfo?.shopName) {
      try {
        setIsLoading(true);
        const res = await axiosPublic.get(
          `/bookService?key=shopName&value=${contextData?.webInfo?.shopName}`
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
  }, [contextData?.webInfo?.shopName]);

  // Handler to update service status
  const handleStatusChange = async (id, newStatus) => {
    console.log(newStatus);
    try {
      await axiosPublic
        .put(`/bookService/${id}`, { status: newStatus })
        .then((response) => {
          fetchServices();
          toast.success(response.data.message);
          console.log(response.data);
        });
      setServices((prevServices) =>
        prevServices.map((service) =>
          service._id === id ? { ...service, status: newStatus } : service
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Handler to approve the service and set isPaid to true
  const handleApprove = async (id) => {
    try {
      const res = await axiosPublic.put(`/bookService/${id}`, {
        isPaid: true,
      });

      if (res.data.result.modifiedCount) {
        fetchServices();
        toast.success(res.data.message);
        setServices((prevServices) =>
          prevServices.map((service) =>
            service._id === id ? { ...service, isPaid: true } : service
          )
        );
      }
    } catch (error) {
      console.error("Error approving service:", error);
    }
  };

  if (isLoading) return <p className="text-center py-4">Loading...</p>;
  if (error)
    return (
      <p className="text-center py-4 text-red-500">Error: {error.message}</p>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Services</h2>
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
              <th className="py-2 px-4 border-b">Actions</th>
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
                <td className="py-2 px-4 border-b">
                  <div className="relative">
                    <select
                      value={service.status}
                      onChange={(e) =>
                        handleStatusChange(service._id, e.target.value)
                      }
                      disabled={service.isPaid}
                      className="appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="booked">Booked</option>
                      <option value="on working">On Working</option>
                      <option value="finished">Finished</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleApprove(service._id)}
                    disabled={service.isPaid}
                    className={`flex items-center justify-center px-4 py-2 rounded ${
                      service.isPaid
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    <Check size={16} className="mr-2" />
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingServices;
