import React, { createContext, useContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../Provider/AuthProvider";
import useRole from "../hooks/useRole";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Create a context for the form
export const FormContext = createContext(null);

const CreateWebFormContext = ({ children }) => {

  const [sellerInfo, setSellerInfo] = useState(null); // State for seller information
  const [webInfo, setWebInfo] = useState(null); // State for website information
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  // const navigate = useNavigate();
  const webDataAndSellerData = {
    email: user?.email,
    name: user?.displayName,
    sellerInfo,
    webInfo,
  };
  
  useEffect(() => {
    if (webInfo?.shopName) {
      setLoading(true);
  
      axiosPublic
        .post("/appliedForSeller", webDataAndSellerData)
        .then((res) => {
          console.log(res)
          if (res.data.insertedId) { // Check if result exists
          
            toast.success("Application successful");
          } else {
            toast.error("Something went wrong, please try again.");
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error(`${err.response.data.message}`);
        })
        .finally(() => {
          setLoading(false); // Ensure loading is stopped regardless of success or error
        });
    }
  }, [webInfo?.shopName]);
  

  const info = {
    sellerInfo,
    setSellerInfo,
    webInfo,
    setWebInfo,
    loading,
  };

  return (
    // Provide the context to children components
    <FormContext.Provider value={info}>{children}</FormContext.Provider>
  );
};

export default CreateWebFormContext;
