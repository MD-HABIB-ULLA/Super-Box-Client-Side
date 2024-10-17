import React from "react";
import { BiMailSend } from "react-icons/bi";
import { PiPhoneCallDuotone } from "react-icons/pi";
import { FcHome } from "react-icons/fc";

 const Title = ({ title1, title2 }) => (
  <div className="text-center mb-8">
    <h2 className="text-3xl font-bold text-gray-800 mb-2">{title1}</h2>
    <h3 className="text-4xl font-extrabold text-indigo-600 capitalize">
      {title2}
    </h3>
  </div>
);

function ContactCard({ icon, title, content }) {
  return (
    <div className=" rounded-lg shadow-lg p-6 bg-transparent transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
      <div className="flex flex-col items-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <div className="text-gray-600 text-center">{content}</div>
      </div>
    </div>
  );
}

export default function ContactInfo({
  location,
  mobile,
  hotline,
  emailInfo,
  emailSupport,
}) {
  return (
    <div className=" py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Title title1="Any queries?" title2="Contact with us" />
        <p className="text-center max-w-2xl mx-auto text-gray-600 text-lg mb-12">
          We always want to hear from you! Let us know how we can best help you
          and we'll do our very best.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ContactCard
            icon={<FcHome className="text-5xl" />}
            title="Location"
            content={<p>{location}</p>}
          />
          <ContactCard
            icon={<PiPhoneCallDuotone className="text-5xl text-indigo-600" />}
            title="Call Us"
            content={
              <>
                <p>Mobile: {mobile}</p>
                <p>Hotline: {hotline}</p>
              </>
            }
          />
          <ContactCard
            icon={<BiMailSend className="text-5xl text-indigo-600" />}
            title="Mail Us"
            content={
              <>
                <p>Info: {emailInfo}</p>
                <p>Support: {emailSupport}</p>
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}
