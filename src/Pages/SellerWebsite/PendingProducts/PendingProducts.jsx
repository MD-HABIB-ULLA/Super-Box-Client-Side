import React, { useContext, useEffect, useState } from "react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const TransactionItem = ({ product, onDelete }) => {
  const handleCancel = async (id) => {
    try {
      await onDelete(id); // Call the passed delete function
    } catch (error) {
      console.error(`Failed to cancel transaction: ${error.message}`);
    }
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
        <p>Price: BDT: {product.price.toFixed(2)}Tk</p>
        <p>Transaction id: {product.transactionId}</p>
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch pending products
  useEffect(() => {
    const fetchPendingProducts = async () => {
      if (!email || !user?.email) return;

      setLoading(true);

      try {
        const res = await axiosPublic.get(
          `/w/pendingProduct/${email}/${user.email}`
        );
        setPendingProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    };

    fetchPendingProducts();
  }, [email, user, axiosPublic]);

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await axiosPublic.delete(`/w/payment/${id}`);
      // Remove the deleted product from the state
      setPendingProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error("Error deleting transaction:", error);
      setError(error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Your Transactions</h1>
      {pendingProducts?.map((product) => (
        <TransactionItem
          key={product._id}
          product={product}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default PendingProducts;
