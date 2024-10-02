import { useContext } from "react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import Title from "../../../Components/Common/Title";
import { AiFillClockCircle, AiOutlineCalendar } from "react-icons/ai";

const Services = () => {
  const { services } = useContext(WebDataDisContext);
  return (
    <div className="mb-20">
      {" "}
      <div>
        <div className="py-10 border-b-2 border-dashed ">
          <Title title2={"Service Management"} />
          <div className="flex justify-end"></div>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {services &&
            services.map((service) => (
              <div
                key={service._id}
                className="bg-white relative group rounded-lg shadow-md overflow-hidden w-full mx-auto px-6 py-4"
              >
                <img
                  className="w-full h-48 object-cover rounded-t-lg"
                  src={service.image}
                  alt={service.serviceTitle}
                />
                <div className="p-4">
                  <p className="text-gray-700 mb-2">{service.serviceTitle}</p>
                  <div className="flex items-center mb-2">
                    <AiOutlineCalendar className="mr-2 text-blue-500" />
                    <span>{service.requiredTime} hours</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <AiFillClockCircle className="mr-2 text-blue-500" />
                    <span>{service.availableSlots} slots available</span>
                  </div>
                  <p className="text-gray-700">{service.serviceDescription}</p>
                  <div className=" justify-between items-center mt-4">
                    <span className="text-gray-700">Starting from:</span>
                    <span className="text-blue-500 font-bold">
                      ${service.serviceCost}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
 
      </div>
    </div>
  );
};

export default Services;
