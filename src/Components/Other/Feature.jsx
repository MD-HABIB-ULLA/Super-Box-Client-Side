import React from 'react'
import {
  FaRocket,
  FaCashRegister,
  FaBoxes,
  FaWrench,
  FaGlobe,
  FaStore,
} from "react-icons/fa"

const features = [
  {
    icon: <FaRocket className="w-8 h-8" />,
    title: "Build Lightweight Webpage",
    desc: "Optimize your webpage for speed and performance, ensuring faster load times and a smooth user experience.",
  },
  {
    icon: <FaCashRegister className="w-8 h-8" />,
    title: "POS System",
    desc: "Seamless integration of point-of-sale features to manage in-store sales effortlessly.",
  },
  {
    icon: <FaBoxes className="w-8 h-8" />,
    title: "Product Management",
    desc: "Easily manage your products, including adding, removing, and updating listings in real-time.",
  },
  {
    icon: <FaWrench className="w-8 h-8" />,
    title: "Service Management",
    desc: "Offer and manage services through your platform with dedicated features to streamline bookings and support.",
  },
  {
    icon: <FaGlobe className="w-8 h-8" />,
    title: "Separate Web URL",
    desc: "Get your own custom web URL to build a personalized online presence for your business.",
  },
  {
    icon: <FaStore className="w-8 h-8" />,
    title: "Make Your Store Online",
    desc: "Bring your physical store online with all the tools needed to sell products and services virtually.",
  },
]

export default function Features() {
  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Boost Your Business with Essential Tools
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Seamlessly manage your online and in-store operations with our cutting-edge features.
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