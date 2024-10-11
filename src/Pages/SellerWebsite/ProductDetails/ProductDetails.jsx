import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../ChackOutForm/CheckOutForm";
import { useContext } from "react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const ProductDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { singleProductData } = useContext(WebDataDisContext);
  const { data } = singleProductData(id);
  console.log(data);

  const onSubmit = async (data) => {
    try {
      const response = await axiosPublic.put(
        `/customer/${customerData.email}`,
        data
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error submitting customer info:", error);
    }
  };
  return (
    <>
      {data && (
        <div className="min-h-screen flex items-center justify-center px-10">
          <div
            key={data?._id}
            className="grid grid-cols-2 bg-base-100 shadow-xl rounded-3xl p-2 border"
          >
            <figure className="rounded-3xl overflow-hidden">
              <img src={data?.image} alt={data?.name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{data?.name}</h2>
              <p>{data?.description}</p>
              <div className="card-actions justify-between items-center">
                <span className="text-lg font-bold">${data?.price}</span>
                <Link>
                  <button className="btn btn-primary">Buy Now</button>
                </Link>
              </div>
              <div>
                <Elements stripe={stripePromise}>
                  <CheckOutForm data={data} />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
