import axios from "axios";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Title from "../../Components/Common/Title";

const Transaction = () => {
  const [data, setData] = useState();
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic.get("/transaction").then((res) => {
      setData(res.data);
    });
  }, []);
  console.log(data);
  return (
    <div className="px-3">
      <div className="py-10">
        <Title title1={"products"} title2={"All Products"}></Title>
      </div>
      <div className=" flex flex-col gap-3">
        {data?.map((product) => (
          <div className="border rounded-lg p-4 mb-4" key={product._id}>
            <div className="grid grid-cols-2 gap-4 items-center">
              {/* Date */}
              <div>
                <h2 className="font-semibold text-gray-700">Date:</h2>
                <p>{new Date(product.date).toLocaleString()}</p>
              </div>

              {/* Shop Name */}
              <div>
                <h2 className="font-semibold text-gray-700">Shop Name:</h2>
                <p>{product.shopName}</p>
              </div>

              {/* Price */}
              <div>
                <h2 className="font-semibold text-gray-700">Price:</h2>
                <p>${product.price}</p>
              </div>

              {/* Seller Email */}
              <div>
                <h2 className="font-semibold text-gray-700">Seller Email:</h2>
                <p>{product.sellerEmail}</p>
              </div>

              {/* Product ID */}
              <div>
                <h2 className="font-semibold text-gray-700">Product ID:</h2>
                <p>{product.productId}</p>
              </div>

              {/* Transaction ID */}
              <div>
                <h2 className="font-semibold text-gray-700">Transaction ID:</h2>
                <p>{product.transactionId}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transaction;
