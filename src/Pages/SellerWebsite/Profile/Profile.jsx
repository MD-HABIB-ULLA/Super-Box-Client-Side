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

const Profile = () => {
  const { customerInfo } = useContext(AuthContext);
  const {setCustomerEmail} = useContext(WebDataDisContext)
  useEffect(() => {
    setCustomerEmail(customerInfo.email);
  }, [customerInfo.email]);

  const customerData = {
    _id: "607f1f77bcf86cd799439012",
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    email: "john.doe@example.com",
    // hashed password
    phone: "+1-202-555-0170",
    address: {
      street: "123 Elm Street",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "USA",
    },

    createdAt: "2023-05-10T08:30:00.000Z",
    updatedAt: "2023-09-29T18:00:00.000Z",
    isActive: true,
    role: "Customer",
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl group mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="md:flex relative ">
            <div className="absolute right-2 top-2 group-hover:block hidden cursor-pointer">
              <Edit></Edit>
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
                      {customerInfo?.phone || "N/A"}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-gray-400" />
                      Address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {customerInfo?.address?.street},{" "}
                      {customerInfo?.address?.city},{" "}
                      {customerInfo?.address?.state}{" "}
                      {customerInfo?.address?.postalCode},{" "}
                      {customerInfo?.address?.country}
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
      </div>
    </>
  );
};

export default Profile;
