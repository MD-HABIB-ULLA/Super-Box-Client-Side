import React, { useContext, useEffect, useState } from "react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

// Sample image for products
const placeholderImage =
  "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80D";

const TransactionItem = ({ product }) => {
  console.log(product);
  const handleCancel = (id) => {
    // Logic for canceling the transaction
    console.log(`Cancel transaction: ${id}`);
  };
  return (
    <div className="border rounded-lg p-4 shadow-lg bg-white flex justify-between items-center mb-4">
      <img
        src={product.image}
        alt="Product"
        className="w-24 h-24 object-cover rounded-md"
      />
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold">{product.shopName}</h3>

        <p>Price: ${product.price.toFixed(2)}</p>
        <p>Transaction id:{product.transactionId}</p>
        <p>Status: {product.isReceived ? "Received" : "Not Received"}</p>
      </div>
      {product.paymentStatus === "success" ? (
        <div>
          <p className="px-2 py-1 rounded-full bg-green-600/25 ">Paid</p>
        </div>
      ) : (
        <button
          onClick={() => handleCancel(product._id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Cancel
        </button>
      )}
    </div>
  );
};

const PendingProducts = () => {
  const [pendingProducts, setPendingProducts] = useState(null);
  const { email } = useContext(WebDataDisContext);
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  // Loading state for better UX
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Make sure email and user.email are available
  useEffect(() => {
    const fetchPendingProducts = async () => {
      if (!email || !user?.email) return; // Avoid making the request if data is missing

      setLoading(true); // Start loading

      try {
        const res = await axiosPublic.get(
          `/w/pendingProduct/${email}/${user.email}`
        );
        setPendingProducts(res.data); // Set data
        setLoading(false); // End loading
      } catch (err) {
        console.error(err);
        setError(err); // Handle error
        setLoading(false); // End loading
      }
    };

    fetchPendingProducts(); // Call the function
  }, [email, user, axiosPublic]);

  // Optionally render UI for loading and error state
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data</p>;
  }

  console.log(pendingProducts);

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <h1 className="text-2xl font-bold mb-6">Your Transactions</h1>
      {pendingProducts?.map((product) => (
        <TransactionItem key={product._id} product={product} />
      ))}
    </div>
  );
};

export default PendingProducts;
