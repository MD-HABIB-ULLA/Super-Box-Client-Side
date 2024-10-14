import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../Provider/AuthProvider"; // Assuming you have an AuthProvider for user authentication
import useAxiosPublic from "../../../hooks/useAxiosPublic"; // Assuming you have a custom hook for Axios

const PendingOrder = () => {
  const { user } = useContext(AuthContext); // Assuming `user` is obtained from AuthContext
  const [products, setProducts] = useState([]);
  const axiosPublic = useAxiosPublic(); // Use Axios instance

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (user?.email) {
          const res = await axiosPublic.get(`/payments/${user.email}`);
          setProducts(res.data); // Assuming your API response is an array of products
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [user, axiosPublic]);

  // Handle sending the product
  const handleSendProduct = async (productId) => {
    try {
      const updatedProducts = products.map((product) =>
        product._id === productId ? { ...product, isReceived: true } : product
      );
      setProducts(updatedProducts);
      // Optionally send the updated product status to the backend here
      // const res = await axiosPublic.patch(`/payments/${productId}`, { isReceived: true });
    } catch (error) {
      console.error("Error updating product status:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">WorkOut Products</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Product Image</th>
              <th className="px-4 py-2 text-left">Product ID</th>
              <th className="px-4 py-2 text-left">Transaction ID</th>
              <th className="px-4 py-2 text-left">Payment Method</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No pending orders found.
                </td>
              </tr>
            ) : (
              products?.map((product) => (
                <tr key={product._id} className="border-t border-gray-300">
                  <td className="px-4 py-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="px-4 py-2">{product._id}</td>
                  <td className="px-4 py-2">{product.transactionId}</td>
                  <td className="px-4 py-2">{product.paymentMethod}</td>
                  <td className="px-4 py-2">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    {product.isReceived ? "Received" : "Pending"}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleSendProduct(product._id)}
                      className={`px-4 py-2 rounded ${
                        product.isReceived
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                      disabled={product.isReceived}
                    >
                      {product.isReceived ? "Sent" : "Send Product"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingOrder;
