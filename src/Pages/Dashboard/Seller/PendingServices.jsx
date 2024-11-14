import React, { useContext, useEffect, useState } from "react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Check, Plus, Printer } from "lucide-react";
import { toast } from "react-hot-toast";

const PendingServices = () => {
  const { data: contextData } = useContext(WebDataDisContext);
  const axiosPublic = useAxiosPublic();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [extraServices, setExtraServices] = useState([]); // Changed to array for multiple extra services
  const [newExtraService, setNewExtraService] = useState({
    name: "",
    price: "",
  });
  const [selectedService, setSelectedService] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const fetchServices = async () => {
    if (contextData?.webInfo?.shopName) {
      try {
        setIsLoading(true);
        const res = await axiosPublic.get(
          `/bookService?key=shopName&value=${contextData.webInfo.shopName}`
        );
        setServices(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchServices();
  }, [contextData?.webInfo?.shopName]);

  const handleStatusChange = async (id, newStatus, service) => {
    if (newStatus === "finished") {
      setSelectedService(service);
      setIsConfirmModalOpen(true);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await axiosPublic.put(`/bookService/${id}`, {
        isPaid: true,
      });

      if (res.data.result.modifiedCount) {
        fetchServices();
        toast.success("Service approved successfully");
      }
    } catch (error) {
      toast.error("Error approving service");
    }
  };

  const handleAddExtraService = () => {
    setIsConfirmModalOpen(false);
    setIsModalOpen(true);
  };

  const handleExtraServiceSubmit = async () => {
    if (!selectedService) return;

    const updatedExtraServices = [
      ...extraServices,
      { ...newExtraService, price: parseFloat(newExtraService.price) },
    ];
    setExtraServices(updatedExtraServices);

    setIsModalOpen(false);
    setIsConfirmModalOpen(true);
    setNewExtraService({
      name: "",
      price: "",
    });
  };
  const calculateTotalPrice = () => {
    const extraServicesTotal = extraServices.reduce(
      (total, service) => total + parseFloat(service.price),
      0
    );
    return parseFloat(selectedService.serviceCost) + extraServicesTotal;
  };

  const handlePrint = () => {
    const printContent = document.getElementById("print-area")?.innerHTML;
    if (!printContent) return;

    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (error) return <div className="alert alert-error">{error.message}</div>;

  const handleConfirm = async () => {
    if (!selectedService) return;

    try {
      // Update the service to mark it as paid and finished
      const res = await axiosPublic.put(`/bookService/${selectedService._id}`, {
        isPaid: true, // Mark the service as paid
        status: "finished", // Mark the service as finished
      });

      // Check if the update was successful
      if (res.data.result.modifiedCount) {
        toast.success("Service finished successfully");
        fetchServices(); // Reload the services
        setShowReceipt(true); // Show the receipt modal after successful confirmation
      } else {
        toast.error("Failed to update service status");
      }

      // Close the confirmation modal after confirmation
      setIsConfirmModalOpen(false);
    } catch (error) {
      toast.error("Error confirming service");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Services</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Cost</th>
              <th>Transaction ID</th>
              <th>Payment Status</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id}>
                <td>{service.serviceName}</td>
                <td>{service.date}</td>
                <td>{service.time}</td>
                <td>BDT {service.serviceCost}</td>
                <td>{service.transactionId || "N/A"}</td>
                <td>{service.isPaid ? "Paid" : "Pending"}</td>
                <td>{service.paymentMethod || "N/A"}</td>
                <td>
                  <select
                    value={service.status}
                    onChange={(e) =>
                      handleStatusChange(service._id, e.target.value, service)
                    }
                    disabled={service.status === "finished"}
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option value="booked">Booked</option>
                    <option value="on working">On Working</option>
                    <option value="finished">Finished</option>
                  </select>
                </td>
                <td>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleApprove(service._id)}
                      disabled={service.isPaid}
                      className={`btn btn-sm ${
                        service.isPaid ? "btn-disabled" : "btn-success"
                      }`}
                    >
                      <Check size={16} className="mr-2" />
                      Approve
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isConfirmModalOpen && selectedService && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Service Details</h3>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <tbody>
                  <tr>
                    <th className="font-semibold">Name</th>
                    <th className="font-semibold">Cost</th>
                  </tr>
                  <tr>
                    <td>{selectedService.serviceName}</td>
                    <td>BDT {selectedService.serviceCost}</td>
                  </tr>
                  {extraServices.map((service) => (
                    <tr>
                      <td>{service.name}</td>
                      <td>BDT {service.price}</td>
                    </tr>
                  ))}
                  <tr>
                    <th className="font-semibold">Total</th>
                    <th className="font-semibold">
                      BDT {calculateTotalPrice()}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-action mt-6">
              <button onClick={() => handleConfirm()} className="btn">
                Confirm
              </button>
              <button
                onClick={handleAddExtraService}
                className="btn btn-primary"
              >
                <Plus size={16} className="mr-2" />
                Add Extra Service
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Extra Service</h3>
            <input
              type="text"
              placeholder="Service Name"
              value={newExtraService.name}
              onChange={(e) =>
                setNewExtraService({ ...newExtraService, name: e.target.value })
              }
              className="input input-bordered w-full mt-4"
            />
            <input
              type="number"
              placeholder="Price"
              value={newExtraService.price}
              onChange={(e) =>
                setNewExtraService({
                  ...newExtraService,
                  price: e.target.value,
                })
              }
              className="input input-bordered w-full mt-4"
            />
            <div className="modal-action">
              <button onClick={() => setIsModalOpen(false)} className="btn">
                Cancel
              </button>
              <button
                onClick={handleExtraServiceSubmit}
                className="btn btn-primary"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showReceipt && selectedService && (
        <div className="modal modal-open">
          <div className="modal-box" id="print-area">
            <h3 className="font-bold text-lg">Receipt</h3>
            <div className="mt-4">
              {/* Displaying the main service */}
              <p>
                <strong>Service:</strong> {selectedService.serviceName}
              </p>
              <p>
                <strong>Original Cost:</strong> BDT{" "}
                {selectedService.serviceCost}
              </p>

              {/* Displaying all extra services */}
              {extraServices.length > 0 ? (
                <div>
                  <p className="font-semibold mt-4">Extra Services:</p>
                  {extraServices.map((extra, index) => (
                    <div key={index} className="mt-2">
                      <p>
                        <strong>{extra.name}</strong>
                      </p>
                      <p>BDT {extra.price}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4">No extra services added.</p>
              )}

              {/* Displaying the total cost */}
              <p className="font-semibold mt-4">
                <strong>Total Cost:</strong> BDT{" "}
                {selectedService.serviceCost +
                  extraServices.reduce((sum, extra) => sum + extra.price, 0)}
              </p>
            </div>

            {/* Modal actions */}
            <div className="modal-action mt-6">
              <button onClick={() => setShowReceipt(false)} className="btn">
                Close
              </button>
              <button onClick={handlePrint} className="btn btn-primary">
                <Printer size={16} className="mr-2" />
                Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingServices;
