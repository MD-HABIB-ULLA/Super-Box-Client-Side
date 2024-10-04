import { useContext, useState } from "react";
import Title from "../../../Components/Common/Title";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import { Edit } from "lucide-react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { AiFillClockCircle, AiOutlineCalendar } from "react-icons/ai";
const PointOfSell = () => {
  // const { services, products } = useContext(WebDataDisContext);

  // for product api call
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  console.log(user);
  const {
    data: products,
    isPending: isRoleLoading,
    refetch,
  } = useQuery({
    queryKey: [user.email, "posProducts"],
    enabled: !!user.email,
    queryFn: async () => {
      if (user.email) {
        const res = await axiosPublic.get(`/sellerProducts/${user?.email}`);
        return res.data;
      }
    },
  });
  // console.log(products);
  // for service api call

  const { data } = useContext(WebDataDisContext);

  const [submittedData, setSubmittedData] = useState(null);
  const { data: services, isPending } = useQuery({
    queryKey: [data?.webInfo, "posServices"],
    enabled: !!data?.webInfo && !!data?.webInfo.shopName, // Add more conditions here
    queryFn: async () => {
      if (data?.webInfo) {
        const res = await axiosPublic.get(`/service/${data?.webInfo.shopName}`);
        return res.data;
      }
    },
  });

  const [isProductShow, showProduct] = useState(true);
  const [isServiceShow, showServices] = useState(false);
  return (
    <div>
      <div className="py-10 border-b border-dashed border-gray-600">
        <Title title1={"POS"} title2={"Point Of Sell"} />
      </div>
      <div className="flex">
        <button
          className={` text-white font-bold btn ${
            isProductShow ? "bg-blue-500" : "bg-gray-500"
          }`}
          onClick={() => {
            showServices(false);
            showProduct(true);
          }}
        >
          Products
        </button>
        <button
          onClick={() => {
            showServices(true);
            showProduct(false);
          }}
          className={` text-white font-bold btn ${
            isServiceShow ? "bg-blue-500" : "bg-gray-500"
          }`}
        >
          Services
        </button>
      </div>
      <div className={`${isProductShow ? "block" : "hidden"} h-full w-full `}>
        <div className="grid grid-cols-3 gap-3 px-2">
          {products?.map((product) => (
            <div key={product._id} className="card bg-base-100 shadow-xl">
              <figure className="h-[300px]">
                <img
                  className="h-full"
                  src={product.image}
                  alt={product.name}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p>{product.description}</p>
                <div className="card-actions justify-between items-center">
                  <span className="text-lg font-bold">${product.price}</span>
                  <Link to={`${product._id}`}>
                    <button className="btn btn-primary">sell</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`${isServiceShow ? "block" : "hidden"}`}>
        {" "}
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
      </div>
    </div>
  );
};

export default PointOfSell;
