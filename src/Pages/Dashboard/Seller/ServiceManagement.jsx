import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Title from "../../../Components/Common/Title";
import { MdAddCircle } from "react-icons/md";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AiFillClockCircle, AiOutlineCalendar } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

const ServiceManagement = () => {
  const axiosPublic = useAxiosPublic();
  const { data } = useContext(WebDataDisContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [submittedData, setSubmittedData] = useState(null);
  const {
    data: services,
    isPending,
    refetch,
  } = useQuery({
    queryKey: [data?.webInfo, "services"],
    enabled: !!data?.webInfo && !!data?.webInfo.shopName, // Add more conditions here
    queryFn: async () => {
      if (data?.webInfo) {
        const res = await axiosPublic.get(`/service/${data?.webInfo.shopName}`);
        return res.data;
      }
    },
  });

  console.log(services);

  const onSubmit = (info) => {
    const shopName = data?.webInfo.shopName; // Use webInfo from context
    const imageFile = info.image?.[0]; // Ensure image is defined

    if (!imageFile) {
      toast.error("Image file is required");
      return;
    }

    const serviceCost = parseFloat(info.serviceCost);
    const availableSlots = parseFloat(info.availableSlots);
    const requiredTime = parseFloat(info.requiredTime);

    const formData = new FormData(); // Use FormData to handle file upload
    formData.append("image", imageFile); // Append the image file

    axios
      .post(
        `https://api.imgbb.com/1/upload?key=e9b3cb55e11b48d4142caf366d77cea6`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        const image = res.data.data.display_url;
        const serviceData = {
          ...info,
          image,
          shopName,
          serviceCost,
          availableSlots,
          requiredTime,
        };
        console.log(serviceData);
        return axiosPublic.post("service", serviceData);
      })
      .then(() => {
        document.getElementById("my_modal_addServices").close();
        refetch();
        reset();
        toast.success("Service added");
      })
      .catch((err) => {
        console.error(err); // Log the error for debugging
        toast.error("An error occurred");
      });
  };

  const handleDelete = (id) => {
    axiosPublic.delete(`/service/${id}`).then(() => {
      refetch();
    });
  };
  return (
    <div>
      <div className="py-10 border-b-2 border-dashed ">
        <Title title2={"Service Management"} />
        <div className="flex justify-end">
          <button
            onClick={() => {
              document.getElementById("my_modal_addServices").showModal();
            }}
            className="flex flex-row items-center gap-1 justify-end text-2xl mt-10 mr-5"
          >
            <MdAddCircle className="text-green-500 text-3xl" />
            Add Services
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {services &&
          services.map((service) => (
            <div
              key={service._id}
              className="bg-white relative group rounded-lg shadow-md overflow-hidden w-full mx-auto px-6 py-4"
            >
              <FaTrash
                onClick={() => handleDelete(service._id)}
                className="bg-red-500 absolute right-0  cursor-pointer  box-content text-white p-2 rounded-full group-hover:block hidden"
              />
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
      <dialog id="my_modal_addServices" className="modal">
        <div className="modal-box">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto bg-white"
          >
            {/* Service Title */}
            <div className="mb-4">
              <label
                htmlFor="serviceTitle"
                className="block text-gray-700 font-bold mb-2"
              >
                Service Title:
              </label>
              <input
                type="text"
                id="serviceTitle"
                {...register("serviceTitle", {
                  required: "Service title is required",
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.serviceTitle && (
                <span className="text-red-500">
                  {errors.serviceTitle.message}
                </span>
              )}
            </div>

            {/* Image URL */}
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-gray-700 font-bold mb-2"
              >
                Image URL:
              </label>
              <input
                type="file"
                accept="image/*"
                id="image"
                {...register("image", { required: "Image file is required" })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.image && (
                <span className="text-red-500">{errors.image.message}</span>
              )}
            </div>

            {/* Service Description */}
            <div className="mb-4">
              <label
                htmlFor="serviceDescription"
                className="block text-gray-700 font-bold mb-2"
              >
                Service Description:
              </label>
              <textarea
                id="serviceDescription"
                {...register("serviceDescription", {
                  required: "Description is required",
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.serviceDescription && (
                <span className="text-red-500">
                  {errors.serviceDescription.message}
                </span>
              )}
            </div>

            {/* Service Cost */}
            <div className="mb-4">
              <label
                htmlFor="serviceCost"
                className="block text-gray-700 font-bold mb-2"
              >
                Service Cost:
              </label>
              <input
                type="number"
                id="serviceCost"
                {...register("serviceCost", {
                  required: "Cost is required",
                  min: 0,
                  pattern: /^\d+$/,
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.serviceCost && (
                <span className="text-red-500">
                  {errors.serviceCost.message}
                </span>
              )}
            </div>

            {/* Required Time */}
            <div className="mb-4">
              <label
                htmlFor="requiredTime"
                className="block text-gray-700 font-bold mb-2"
              >
                Required Time (in hours):
              </label>
              <input
                type="number"
                id="requiredTime"
                {...register("requiredTime", {
                  required: "Required time is mandatory",
                  min: 0,
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.requiredTime && (
                <span className="text-red-500">
                  {errors.requiredTime.message}
                </span>
              )}
            </div>

            {/* Available Slots */}
            <div className="mb-4">
              <label
                htmlFor="availableSlots"
                className="block text-gray-700 font-bold mb-2"
              >
                Available Slots:
              </label>
              <input
                type="number"
                id="availableSlots"
                {...register("availableSlots", {
                  required: "Available slots is required",
                  min: 1,
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.availableSlots && (
                <span className="text-red-500">
                  {errors.availableSlots.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ServiceManagement;
