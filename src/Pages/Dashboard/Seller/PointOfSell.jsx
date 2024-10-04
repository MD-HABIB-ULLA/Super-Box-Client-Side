import { useContext, useState } from "react";
import Title from "../../../Components/Common/Title";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import { Edit } from "lucide-react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
const PointOfSell = () => {
  // const { services, products } = useContext(WebDataDisContext);
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
  console.log(products);
  const [isProductShow, showProduct] = useState(true);
  const [service, showServices] = useState(false);
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
            service ? "bg-blue-500" : "bg-gray-500"
          }`}
        >
          Services
        </button>
      </div>
      <div
        className={`${
          isProductShow ? "block" : "hidden"
        } h-full w-full `}
      >
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
      <div className={`${service ? "block" : "hidden"}`}></div>
    </div>
  );
};

export default PointOfSell;
