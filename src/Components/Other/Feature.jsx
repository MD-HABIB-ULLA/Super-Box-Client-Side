import React from 'react'
import {
  FaRocket,
  FaCreditCard,
  FaBox,
  FaFileInvoice,
  FaRegClipboard,
  FaChartLine,
} from "react-icons/fa"

const features = [
  {
    icon: <FaCreditCard className="w-8 h-8" />,
    title: "Secure Payments & Business Verification",
    desc: "Accept payments confidently with fraud protection and business verification that builds trust with your customers.",
  },
  {
    icon: <FaRocket className="w-8 h-8" />,
    title: "Website Creation",
    desc: "Build a professional website to expand your business online, attracting new customers and showcasing your products or services.",
  },
  {
    icon: <FaBox className="w-8 h-8" />,
    title: "Multiple Delivery and Logistics Integration",
    desc: "Seamlessly manage deliveries, whether you’re shipping products or coordinating services. Choose from multiple delivery options that suit your business needs.",
  },
  {
    icon: <FaFileInvoice className="w-8 h-8" />,
    title: "Invoicing & Sales Tracking",
    desc: "Automate invoicing and track sales in real-time, so you can stay focused on growth while we handle the paperwork.",
  },
  {
    icon: <FaRegClipboard className="w-8 h-8" />,
    title: "Order and Booking Management",
    desc: "Efficiently manage customer orders or bookings, ensuring you meet customer expectations, whether online or in-store.",
  },
  {
    icon: <FaChartLine className="w-8 h-8" />,
    title: "Basic Reporting & Business Insights",
    desc: "Access powerful reports that provide real-time data on sales, customer activity, and operational performance to help you make informed business decisions.",
  },
]

export default function Features() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">What We Offer</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            We provide a complete solution for your business—whether you’re expanding digitally or optimizing your operations in the real world.
          </p>
        </div>
        <div className="absolute inset-0 max-w-xs mx-auto h-44 blur-[118px]" style={{ background: "linear-gradient(152.92deg, rgba(75, 0, 130, 0.2) 6.54%, rgba(75, 0, 130, 0.26) 84.2%, rgba(75, 0, 130, 0.1) 77.55%)", }} ></div>  

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-700 ring-4 ring-white group-hover:bg-indigo-100 transition-colors duration-300">
                    {feature.icon}
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                    <a href="#" className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true"></span>
                      {feature.title}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                    {feature.desc}
                  </p>
                </div>
                <span
                  className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-indigo-400 transition-colors duration-300"
                  aria-hidden="true"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
