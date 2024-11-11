import React, { useContext, useState } from "react";
import axios from "axios";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import { AiFillClockCircle, AiOutlineCalendar } from "react-icons/ai";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const Title = ({ children }) => (
  <h1 className="text-4xl font-extrabold text-center text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl mb-4">
    {children}
  </h1>
);

export default function Services() {
  const { services, sellerInfo, webInfo } = useContext(WebDataDisContext);
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Full Payment");
  const axiosPublic = useAxiosPublic();
  
  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    setTransactionId("");
    setDate("");
    setTime("");
    setPaymentMethod("Full Payment");
  };

  const handleBooking = async (e) => {
    e.preventDefault();
  
    const bookingData = {
      serviceId: selectedService._id,
      serviceName: selectedService.serviceTitle,
      shopName: webInfo.shopName,
      userEmail: user.email,
      transactionId: paymentMethod === "Full Payment" ? transactionId : null,
      date,
      time,
      serviceCost: selectedService.serviceCost,
      paymentMethod,
    };
  
    try {
      const response = await axiosPublic.post("/bookService", bookingData);
      console.log("Booking successful:", response.data);
      toast.success(response.data.message);
      closeModal();
    } catch (error) {
      console.error("Error booking service:", error);
  
      // Show the error message returned from the backend
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while booking the service. Please try again.");
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Title>Service Management</Title>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Explore our range of professional services tailored to meet your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services &&
            services.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1"
              >
                <div className="relative pb-48 overflow-hidden">
                  <img
                    className="absolute inset-0 h-full w-full object-cover transform hover:scale-105 transition-transform duration-300"
                    src={service.image}
                    alt={service.serviceTitle}
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-indigo-600 transition-colors duration-300">
                    {service.serviceTitle}
                  </h2>
                  <div className="flex items-center mb-3 text-gray-600">
                    <AiOutlineCalendar className="mr-2 text-indigo-500" />
                    <span>{service.requiredTime} hours</span>
                  </div>
                  <div className="flex items-center mb-3 text-gray-600">
                    <AiFillClockCircle className="mr-2 text-indigo-500" />
                    <span>{service.availableSlots} slots available</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {service.serviceDescription}
                  </p>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                    <span className="text-gray-600">Starting from:</span>
                    <span className="text-xl font-bold text-indigo-600">
                      BDT: {service.serviceCost} Tk
                    </span>
                  </div>
                </div>
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <button
                    onClick={() => openModal(service)}
                    className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Book {selectedService?.serviceTitle}
            </h2>
            <form onSubmit={handleBooking} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Select Date</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Select Time</span>
                </label>
                <input
                  type="time"
                  className="input input-bordered w-full"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Payment Method</span>
                </label>
                <select
                  className="input input-bordered w-full"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="Full Payment">Full Payment</option>
                  <option value="Pay on Hand">Pay on Hand</option>
                </select>
              </div>

              {paymentMethod === "Full Payment" && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Transaction ID</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter your transaction ID"
                    required
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                  />
                </div>
              )}

              {paymentMethod === "Full Payment" && (
                <div>
                  <p className="text-green-500">
                    Send{" "}
                    <span className="font-bold">
                      {selectedService?.serviceCost?.toFixed(2)}
                    </span>{" "}
                    BDT to this number:{" "}
                    <span className="font-bold">{sellerInfo?.bkashNumber}</span>
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="btn bg-indigo-500 w-full text-white font-semibold"
              >
                Confirm Booking
              </button>
            </form>

            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
