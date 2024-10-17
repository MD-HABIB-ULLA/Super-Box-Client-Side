import { useContext } from "react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import Title from "../../../Components/Common/Title";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

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
          <div key={product._id} className="group">
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-center object-cover group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
            <div className="mt-6">
              <button
                onClick={() => handleAddToCart(product._id)}
                className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add to cart
              </button>
              <Link 
                to="#" 
                onClick={() => handlePayment(product._id)}
                className="mt-2 w-full bg-gray-200 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Buy Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Modal */}
      <div id="customerInfo" className="fixed inset-0 overflow-y-auto hidden">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Please fill this form to checkout
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    {...register("phone", { required: true })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <p className="mt-2 text-sm text-red-600">Phone is required</p>}
                </div>

                <div>
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street</label>
                  <input
                    type="text"
                    id="street"
                    {...register("address.street", { required: true })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your street"
                  />
                  {errors.address?.street && <p className="mt-2 text-sm text-red-600">Street is required</p>}
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    id="city"
                    {...register("address.city", { required: true })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your city"
                  />
                  {errors.address?.city && <p className="mt-2 text-sm text-red-600">City is required</p>}
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                  <input
                    type="text"
                    id="state"
                    {...register("address.state", { required: true })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your state"
                  />
                  {errors.address?.state && <p className="mt-2 text-sm text-red-600">State is required</p>}
                </div>

                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    {...register("address.postalCode", { required: true })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your postal code"
                  />
                  {errors.address?.postalCode && <p className="mt-2 text-sm text-red-600">Postal Code is required</p>}
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                  <input
                    type="text"
                    id="country"
                    {...register("address.country", { required: true })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your country"
                  />
                  {errors.address?.country && <p className="mt-2 text-sm text-red-600">Country is required</p>}
                </div>

                <div className="mt-5 sm:mt-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Products;
