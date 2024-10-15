import React, { useContext, useState, useEffect } from "react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import axios from "axios"; // Using axios to make API calls
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

// Component for each product item
const ProductItem = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow-lg flex flex-col justify-between bg-white items-center mb-4">
      <img
        src={product.image || "https://via.placeholder.com/150"} // Using placeholder if no image is available
        alt={product.name}
        className="w-32 h-32 object-cover mb-3"
      />
      <div className="text-center">
        <h3 className="text-lg font-semibold">Product ID: {product.productId}</h3>
        <p>Shop Name: {product.shopName}</p>
        <p>Price: ${product.price}</p>
        <p>Transaction ID: {product.transactionId}</p>
      </div>
    </div>
  );
};

// Main component for product purchase history
const Purchased = () => {
  const { email } = useContext(WebDataDisContext);
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [purchaseProducts, setPurchaseProducts] = useState([]);

  // Fetch purchase history on component mount
  useEffect(() => {
    const fetchPurchasedProducts = async () => {
      try {
        const res = await axiosPublic.get(
          `/w/purchasedProduct/${email}/${user.email}`
        );
        setPurchaseProducts(res.data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching purchased products:", error);
      }
    };

    if (email && user) {
      fetchPurchasedProducts();
    }
  }, [email, user]);

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-6">Product Purchase History</h1>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {purchaseProducts.length === 0 ? (
          <p className="text-center col-span-3">No purchased products found.</p>
        ) : (
          purchaseProducts?.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default Purchased;
