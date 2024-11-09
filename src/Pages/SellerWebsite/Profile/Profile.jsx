import { useContext, useEffect } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import {
  Calendar,
  Clock,
  Edit,
  Mail,
  MapPin,
  Phone,
  UserCheck,
} from "lucide-react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const Profile = () => {
  const axiosPublic = useAxiosPublic();
  const { customerInfo } = useContext(AuthContext);
  const { setCustomerEmail, customerData } = useContext(WebDataDisContext);
  useEffect(() => {
    setCustomerEmail(customerInfo?.email);
  }, [customerInfo]);
  console.log(customerInfo)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
    <>
      {customerInfo?.photoURL && (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl group mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="md:flex relative ">
              <div className="absolute right-2 top-2 group-hover:block hidden cursor-pointer">
                <Edit
                  onClick={() => {
                    handleEdit();
                  }}
                ></Edit>
              </div>
              <div className="md:flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 p-8 flex items-center justify-center">
                <img
                  className="h-48 w-48 rounded-full border-4 border-white shadow-lg"
                  src={
                    customerInfo?.photoURL || "https://via.placeholder.com/150"
                  }
                  alt="Profile"
                />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  Customer Profile
                </div>
                <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  {customerInfo?.displayName ||
                    `${customerInfo?.name?.firstName} ${customerInfo?.name?.lastName}`}
                </h1>
                <p className="mt-2 text-xl text-gray-500">
                  {customerInfo?.email}
                </p>

                <div className="mt-6 border-t border-gray-200 pt-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 flex items-center">
                        <UserCheck className="mr-2 h-5 w-5 text-gray-400" />
                        Customer ID
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {customerInfo?.uid || customerInfo?._id}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 flex items-center">
                        <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                        Account Created
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {new Date(
                          parseInt(
                            customerInfo?.metadata?.createdAt ||
                              customerInfo?.createdAt
                          )
                        ).toLocaleDateString()}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-gray-400" />
                        Last Login
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {new Date(
                          parseInt(customerInfo?.metadata?.lastLoginAt)
                        ).toLocaleString()}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 flex items-center">
                        <Phone className="mr-2 h-5 w-5 text-gray-400" />
                        Phone
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {customerData?.phone || "N/A"}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500 flex items-center">
                        <MapPin className="mr-2 h-5 w-5 text-gray-400" />
                        Address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {customerData?.address?.street},{" "}
                        {customerData?.address?.city},{" "}
                        {customerData?.address?.state}{" "}
                        {customerData?.address?.postalCode},{" "}
                        {customerData?.address?.country}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="flex items-center justify-center">
                <Mail className="mr-2 h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-500">
                  Email Verification Status:
                  <span
                    className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      customerInfo?.emailVerified
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {customerInfo?.emailVerified ? "Verified" : "Not Verified"}
                  </span>
                </span>
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
      )}
    </>
  );
};

export default Profile;
