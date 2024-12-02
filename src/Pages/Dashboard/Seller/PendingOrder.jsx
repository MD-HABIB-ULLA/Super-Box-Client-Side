import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../Provider/AuthProvider"; // Assuming you have an AuthProvider for user authentication
import useAxiosPublic from "../../../hooks/useAxiosPublic"; // Assuming you have a custom hook for Axios

const PendingOrder = () => {
  const { user } = useContext(AuthContext); // Assuming `user` is obtained from AuthContext
  const [products, setProducts] = useState([]); // All products
  const [filteredProducts, setFilteredProducts] = useState([]); // Products filtered by search
  const [searchQuery, setSearchQuery] = useState(""); // Search query for filtering
  const [selectedProduct, setSelectedProduct] = useState(null); // Product for modal
  const axiosPublic = useAxiosPublic(); // Use Axios instance

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (user?.email) {
          const res = await axiosPublic.get(`/payments/${user.email}`);
          console.log(res.data);
          setProducts(res.data); // Assuming your API response is an array of products
          setFilteredProducts(res.data); // Initialize the filtered products
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [user, axiosPublic]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.customerData.email.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  // Handle sending the product
  const handleSendProduct = async (productId) => {
    try {
      // Update the product state locally
      const updatedProducts = products.map((product) =>
        product._id === productId
          ? { ...product, isApproved: true, deliveryStatus: "pending" }
          : product
      );
      setProducts(updatedProducts);

      // Update the product status on the backend
      await axiosPublic.patch(`/payment/${productId}`, {
        isApproved: true,
        deliveryStatus: "pending",
      });
      console.log("Product marked as sent.");
    } catch (error) {
      console.error("Error updating product status:", error);
    }
  };

  // Open modal with product details
  const openModal = (product) => {
    setSelectedProduct(product);
  };

  // Close modal
  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Search Bar */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Pending Orders</h2>
        <input
          type="text"
          placeholder="Search by buyer email"
          value={searchQuery}
          onChange={handleSearchChange}
          className="input input-bordered w-64"
        />
      </div>

      {/* Pending Orders Table */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Product Image</th>
              <th className="px-4 py-2 text-left">Customer Email</th>
              <th className="px-4 py-2 text-left">Customer Phone</th>
              <th className="px-4 py-2 text-left">Transaction ID</th>
              <th className="px-4 py-2 text-left">Payment Method</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No orders found.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product._id} className="border-t border-gray-300">
                  <td className="px-4 py-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="px-4 py-2">{product.customerData.email}</td>
                  <td className="px-4 py-2">{product.customerData.phone}</td>
                  <td className="px-4 py-2">
                    {product.transactionId || "N/A"}
                  </td>
                  <td className="px-4 py-2">{product.paymentMethod}</td>
                  <td className="px-4 py-2">BDT{product.price.toFixed(2)}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleSendProduct(product._id)}
                      className={`px-4 py-2 ${
                        product.isApproved
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600"
                      } text-white rounded`}
                      disabled={product.isApproved}
                    >
                      {product.isApproved ? "Sent" : "Send"}
                    </button>
                    <button
                      onClick={() => openModal(product)}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <button
              onClick={closeModal}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold">Delivery Details</h3>
            <p className="mt-2">
              <strong>Customer Email:</strong>{" "}
              {selectedProduct.customerData.email}
            </p>
            <p>
              <strong>Customer Phone:</strong>{" "}
              {selectedProduct.customerData.phone}
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {`${selectedProduct.customerData.address.street}, ${selectedProduct.customerData.address.city}, ${selectedProduct.customerData.address.country}`}
            </p>
            {selectedProduct.deliveryStatus && (
              <p>
                <strong>Delivery Status:</strong>{" "}
                {selectedProduct.deliveryStatus}
              </p>
            )}
            <h3 className="text-lg font-bold mt-4">Product Details</h3>
            <p>
              <strong>Product Name:</strong> {selectedProduct.name}
            </p>
            <p>
              <strong>Price:</strong> BDT{selectedProduct.price.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingOrder;
