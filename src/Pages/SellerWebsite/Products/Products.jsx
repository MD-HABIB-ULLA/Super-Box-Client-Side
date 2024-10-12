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
    <div className="px-10">
      <div className="py-10">
        <Title title1={"Choose your products"} title2={"Products"}></Title>
      </div>
      <div>
        <div className="mt-10">
          <div className="grid grid-cols-3 gap-3">
            {products?.map((product) => (
              <div key={product._id} className="card bg-base-100 shadow-xl">
                <figure className="h-[300px]">
                  <img
                    className="h-full"
                    src={product.image}
                    alt={product.name}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{product.name}</h2>
                  <p>{product.description}</p>
                  <div className="card-actions justify-between items-center">
                    <span className="text-lg font-bold">${product.price}</span>
                    <div>
                      <button
                        onClick={() => handleAddToCart(product._id)}
                        className="btn- btn"
                      >
                        Add to cart{" "}
                      </button>
                      <Link onClick={() => handlePayment(product._id)}>
                        <button className="btn btn-primary">Buy Now</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
    </div>
  );
};

export default Products;
