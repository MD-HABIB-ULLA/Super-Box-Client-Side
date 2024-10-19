import { useContext } from "react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import Title from "../../../Components/Common/Title";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import ProductCard from "../../../Components/SellerWebPage/ProductCard";

const Products = () => {
  const { products, addWebCartItem, name, customerData } =
    useContext(WebDataDisContext);
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleAddToCart = (id) => {
    if (!user) {
      navigate(`/w/${name}/login`);
    }
    addWebCartItem(id);
  };

  const handlePayment = (id) => {
    if (!user) {
      navigate(`/w/${name}/login`);
    }

    if (customerData.phone !== "") {
      navigate(`/w/${name}/shipping?type=single&productId=${id}`);
    } else {
      document.getElementById("customerInfo").showModal();
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await axiosPublic.put(
        `/customer/${customerData.email}`,
        data
      );

      toast.success(response.data.message);

      // Reload the page after the form is successfully submitted
      setTimeout(() => {
        window.location.reload(); // Reload the page after a short delay
      }, 1500); // Adjust the delay as needed
    } catch (error) {
      console.error("Error submitting customer info:", error);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Choose Your Products
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Explore our curated selection of high-quality products
          </p>
        </div>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products?.map((product) => (
            <ProductCard
              handlePayment={handlePayment}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Checkout Modal */}
      </div>
    </div>
  );
};

export default Products;
