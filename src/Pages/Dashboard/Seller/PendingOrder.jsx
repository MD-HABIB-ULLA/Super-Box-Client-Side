import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../Provider/AuthProvider"; // Assuming you have an AuthProvider for user authentication
import useAxiosPublic from "../../../hooks/useAxiosPublic"; // Assuming you have a custom hook for Axios

const PendingOrder = () => {
  const { user } = useContext(AuthContext); // Assuming `user` is obtained from AuthContext
  const [products, setProducts] = useState([]); // All products (both pending and sent)
  const axiosPublic = useAxiosPublic(); // Use Axios instance

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (user?.email) {
          const res = await axiosPublic.get(`/payments/${user.email}`);
          console.log(res.data);
          setProducts(res.data); // Assuming your API response is an array of products
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [user, axiosPublic]);

  // Filter products into Pending and Sent categories
  const pendingProducts = products.filter(product => !product.isReceived);
  const sentProducts = products.filter(product => product.isReceived);

  // Handle sending the product
  const handleSendProduct = async (productId) => {
    try {
      // Update the product state locally
      const updatedProducts = products.map((product) =>
        product._id === productId ? { ...product, isReceived: true } : product
      );
      setProducts(updatedProducts);

      // Update the product status on the backend
      const res = await axiosPublic.patch(`/payment/${productId}`, {
        isReceived: true,
       
      });
      console.log("Delivery status updated:", res.data);
    } catch (error) {
      console.error("Error updating product status:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">WorkOut Products</h1>

      {/* Pending Orders Section */}
      <h2 className="text-2xl font-semibold mb-4">Pending Orders</h2>
      <div className="overflow-x-auto mb-6">
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
            {pendingProducts.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No pending orders found.
                </td>
              </tr>
            ) : (
              pendingProducts.map((product) => (
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
                  <td className="px-4 py-2">Pending</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleSendProduct(product._id)}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                    >
                      Send Product
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Sent Orders Section */}
      <h2 className="text-2xl font-semibold mb-4">Sent Orders</h2>
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
            </tr>
          </thead>
          <tbody>
            {sentProducts.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No sent orders found.
                </td>
              </tr>
            ) : (
              sentProducts.map((product) => (
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
                  <td className="px-4 py-2">Sent</td>
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
