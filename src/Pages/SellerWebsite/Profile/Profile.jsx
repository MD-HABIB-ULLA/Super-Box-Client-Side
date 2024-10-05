import React, { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const Profile = () => {
  const { customerInfo } = useContext(AuthContext);
  console.log(customerInfo);
  return (
    <div className="min-h-screen pt-10">
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="flex items-center justify-center">
            <img
              className="w-24 h-24 rounded-full"
              src={customerInfo?.photoURL}
              alt="Profile"
            />
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {customerInfo?.displayName}
            </h2>
            <p className="text-gray-600">{customerInfo?.email}</p>
            <p className="text-gray-500 mt-2">customer ID: {customerInfo?.uid}</p>
            <p className="text-gray-500 mt-1">
              Account Created:{" "}
              {new Date(parseInt(customerInfo?.metadata.createdAt)).toLocaleDateString()}
            </p>
            <p className="text-gray-500 mt-1">
              Last Login:{" "}
              {new Date(parseInt(customerInfo?.metadata.lastLoginAt)).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="bg-gray-200 text-center py-3">
          <span className="text-sm text-gray-600">
            Verified Email: {customerInfo?.emailVerified ? "Yes" : "No"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
