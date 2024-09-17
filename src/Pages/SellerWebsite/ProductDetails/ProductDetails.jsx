import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../ChackOutForm/CheckOutForm";
const stripePromise = loadStripe(
  "pk_test_51PLSF52NHkygt9EvW5PNK63NKBr6kkBTgkG4tl7TmdFHGow5zH3sSxzCDExJEkTgkxbDwxbPJcB8CZ2HQR8UE5C9005BIaeGcY"
);
const ProductDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [id, "product data with id"],
    queryFn: async () => {
      if (id) {
        const res = await axiosPublic.get(`/product/${id}`);
        return res.data;
      }
      return null;
    },
    enabled: !!id, // Only run the query if the name exists
  });

  return (
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
              <CheckOutForm data={data}/>
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
