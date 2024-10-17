import React, { useContext } from "react"
import { WebDataDisContext } from "../../../Context/WebDataDisContext"
import { AiFillClockCircle, AiOutlineCalendar } from "react-icons/ai"

const Title = ({ children }) => (
  <h1 className="text-4xl font-extrabold text-center text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl mb-4">
    {children}
  </h1>
)

export default function Services() {
  const { services } = useContext(WebDataDisContext)

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
          {services && services.map((service) => (
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
                  <span className="text-2xl font-bold text-indigo-600">
                    ${service.serviceCost}
                  </span>
                </div>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <button className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}