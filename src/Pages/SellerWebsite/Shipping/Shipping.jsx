import { useContext, useEffect, useState } from "react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Shipping = () => {
  const {
    customerData,
    singleProductData,
    webCartItem,
    name,
    setConfirmProduct,
  } = useContext(WebDataDisContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const typeParam = searchParams.get("type");
  const productIdParam = searchParams.get("productId");

  useEffect(() => {
    if (typeParam === "single" && productIdParam) {
      const fetchProductData = async () => {
        try {
          const res = await axiosPublic.get(`/product/${productIdParam}`);
          setProductData([res.data]);
          setConfirmProduct([res.data]);
        } catch (error) {
          console.log("Error fetching product data:", error);
        }
      };
      fetchProductData();
    } else {
      if (webCartItem.length !== 0) {
        setProductData(webCartItem);
        setConfirmProduct(webCartItem);
      }
    }
  }, [typeParam, productIdParam, axiosPublic, webCartItem, setConfirmProduct]);

  // Function to calculate the total price including shipping
  const calculateTotal = () => {
    if (!productData) return 0;
    const productTotal = productData.reduce(
      (acc, product) => acc + product.price,
      0
    );
    const shippingTotal = productData.length * 4.99; // Shipping charge $4.99 for each product
    return productTotal + shippingTotal;
  };

  const totalPrice = calculateTotal();

  const handleEdit = () => {
    document.getElementById("customerInfo").showModal();
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
    <div>
      <div className="min-h-screen bg-gray-100 p-5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 grid-cols-1 gap-6">
          {/* Left Side */}
          <div className="md:col-span-8 bg-white p-6 shadow-lg rounded-md">
            {/* Shipping and Billing */}
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Shipping & Billing</h3>
                <button
                  onClick={handleEdit}
                  className="text-blue-500 hover:underline"
                >
                  EDIT
                </button>
              </div>
              <div className="mt-4">
                <span className="font-bold">
                  {customerData?.authData.displayName}
                </span>
                <p>{customerData?.phone}</p>
                <span className="inline-block bg-lime-400/45 text-gray-700 px-2 py-1 rounded-full text-xs font-semibold mr-2">
                  Location
                </span>
                <p>
                  {customerData?.address.state} / {customerData?.address.street}
                  , {customerData?.address.city},{" "}
                  {customerData?.address.country}
                </p>
              </div>
            </div>

            {/* Product Details */}
            {productData &&
              productData?.map((item) => (
                <div key={item.id}>
                  <div className="flex items-center mt-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="ml-4">
                      <p className="font-semibold">{item?.name}</p>
                      <p className="text-gray-500">{item.description}</p>
                      <p className="font-bold text-indigo-600 mt-2">
                        BDT: {item.price}Tk
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Right Side */}
          <div className="md:col-span-4 bg-white p-6 shadow-lg rounded-md">
            <div>
              {/* Order Summary */}
              <div className="pt-4">
                <h4 className="font-semibold text-lg mb-2">Order Summary</h4>
                <div className="flex justify-between mb-2">
                  <span>Items Total ({productData?.length || 0} Items)</span>
                  <span>
                    BDT{" "}
                    {productData
                      ?.reduce((acc, item) => acc + item.price, 0)
                      .toFixed(2)}{" "}
                    Tk
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping Fee (4.99 per item)</span>
                  <span>BDT: {(productData?.length * 4.99).toFixed(2)}Tk</span>
                </div>
                <div className="flex justify-between font-bold text-indigo-600 text-lg">
                  <span>Total</span>
                  <span>BDT: {totalPrice.toFixed(2)}Tk</span>
                </div>
              </div>

              {/* Proceed to Pay */}
              <button
                onClick={() =>
                  navigate(
                    `/w/${name}/checkout?totalAmount=${totalPrice.toFixed(2)}`
                  )
                }
                className="w-full bg-indigo-500 text-white font-bold py-3 mt-6 rounded hover:bg-indigo-600"
              >
                Order
              </button>
            </div>
          </div>
        </div>
      </div>

      <dialog id="customerInfo" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Please fill this form to checkout
          </h3>

          {/* Form starts here */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label">Phone</label>
              <input
                type="text"
                {...register("phone", { required: true })}
                className="input input-bordered w-full"
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-500">Phone is required</p>
              )}
            </div>

            <div>
              <label className="label">Street</label>
              <input
                type="text"
                {...register("address.street", { required: true })}
                className="input input-bordered w-full"
                placeholder="Enter your street"
              />
              {errors.address?.street && (
                <p className="text-red-500">Street is required</p>
              )}
            </div>

            <div>
              <label className="label">City</label>
              <input
                type="text"
                {...register("address.city", { required: true })}
                className="input input-bordered w-full"
                placeholder="Enter your city"
              />
              {errors.address?.city && (
                <p className="text-red-500">City is required</p>
              )}
            </div>

            <div>
              <label className="label">State</label>
              <input
                type="text"
                {...register("address.state", { required: true })}
                className="input input-bordered w-full"
                placeholder="Enter your state"
              />
              {errors.address?.state && (
                <p className="text-red-500">State is required</p>
              )}
            </div>

            <div>
              <label className="label">Postal Code</label>
              <input
                type="text"
                {...register("address.postalCode", { required: true })}
                className="input input-bordered w-full"
                placeholder="Enter your postal code"
              />
              {errors.address?.postalCode && (
                <p className="text-red-500">Postal Code is required</p>
              )}
            </div>

            <div>
              <label className="label">Country</label>
              <input
                type="text"
                {...register("address.country", { required: true })}
                className="input input-bordered w-full"
                placeholder="Enter your country"
              />
              {errors.address?.country && (
                <p className="text-red-500">Country is required</p>
              )}
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>

        {/* Backdrop and close button */}
        <form method="dialog" className="modal-backdrop">
          <button className="">Close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Shipping;
