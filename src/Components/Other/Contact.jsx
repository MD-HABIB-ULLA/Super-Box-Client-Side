import React from "react";
import { MapPin, Mail } from "lucide-react";

const ContactForm = () => {
  return (
    <div className=" bg-indigo-50 py-6 px-5">
      <div className="max-w-screen-xl m-auto flex flex-col  md:flex-row">
        {/* Left Section */}
        <div className="md:w-1/2 p-8 md:p-16">
          <h2 className="text-sm font-semibold text-indigo-600 mb-2">
            CONTACT US
          </h2>
          <h1 className="md:text-5xl text-3xl font-bold mb-12">
            Let's talk about your problem.
          </h1>

          <div className="mb-8">
            <div className="flex items-center mb-2">
              <MapPin className="w-6 h-6  text-blue-600 mr-2" />
              <h3 className="font-semibold text-3xl">Our Location</h3>
            </div>
            <p className="text-gray-600 ml-7">
              401 Broadway, 24th Floor,
              <br />
              Orchard Cloud View, London
            </p>
          </div>

          <div>
            <div className="flex items-center mb-2">
              <Mail className="w-6 h-6  text-blue-600 mr-2" />
              <h3 className="font-semibold text-3xl">How Can We Help?</h3>
            </div>
            <p className="text-gray-600 ml-7">info@yourdomain.com</p>
            <p className="text-gray-600 ml-7">contact@yourdomain.com</p>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="md:w-1/2 bg-white p-8 md:p-16 rounded-xl">
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name*
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Adam Gelius"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="example@yourmail.com"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone*
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="+885 1254 5211 552"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message*
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Type your message here"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
