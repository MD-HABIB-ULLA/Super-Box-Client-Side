import React, { createContext, useContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../Provider/AuthProvider";
import useRole from "../hooks/useRole";

// Create a context for the form
export const FormContext = createContext(null);

const CreateWebFormContext = ({ children }) => {
  const { refetch } = useRole();
  const [sellerInfo, setSellerInfo] = useState(null); // State for seller information
  const [webInfo, setWebInfo] = useState(null); // State for website information
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const webDataAndSellerData = {
    email: user.email,
    name: user.displayName,
    sellerInfo,
    webInfo,
  };

  useEffect(() => {
    axiosPublic
      .post("/createWebsite", webDataAndSellerData)
      .then((res) => {
        if (res.data.result.acknowledged) {
          refetch();
        }
      })
      .catch((err) => console.log(err));
  }, [webInfo]);

  const info = {
    sellerInfo,
    setSellerInfo,
    webInfo,
    setWebInfo,
  };

  return (
    // Provide the context to children components
    <FormContext.Provider value={info}>{children}</FormContext.Provider>
  );
};

export default CreateWebFormContext;
