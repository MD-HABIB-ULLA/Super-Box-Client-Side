// WebDataDisContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthProvider";

// Create the context
export const WebDataDisContext = createContext(null);

// Create the provider component
const WebDataDisProvider = ({ children }) => {
  const {user} = useContext(AuthContext)
  console.log(user.email)
  const { name } = useParams();
  const [webData, setWebData] = useState(null);
  const axiosPublic = useAxiosPublic();
console.log(name)
  const {
    data: websiteData,
    isLoading: isWebsiteLoading,
    refetch: refetchWebsite,
  } = useQuery({
    queryKey: [name, "Website data with name"],
    queryFn: async () => {
      if (name) {
        const res = await axiosPublic.get(`/w/${name}`);
        return res.data;
      }
      return null;
    },
    enabled: !!name, 
  });

  const {
    data: products,
    isLoading: isProductsLoading,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: [name, "products"],
    queryFn: async () => {
      if (name) {
        const res = await axiosPublic.get(`/w/products/${name}`);
        return res.data;
      }
      return null;
    },
    enabled: !!name, // Only run the query if the name exists
  });

  const { data, isPending, refetch } = useQuery({
    queryKey: [user?.email, "websiteData"],
    enabled: !!user?.email, // This ensures the query runs only when user.email is defined
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosPublic.get(`/webData/${user?.email}`);
        // Make sure you return the correct data
        return res.data ? res.data : {}; // Return res.data or an empty object if it's undefined
      }
      return {}; // Return an empty object if user.email doesn't exist
    },
  });

  // Using useEffect to set webData when data changes
  useEffect(() => {
    if (!isWebsiteLoading && websiteData) {
      setWebData(websiteData); // Update the webData state with the fetched data
    }
  }, [isWebsiteLoading, websiteData]); // Only re-run effect when isLoading or data changes

  const { _id, email, sellerInfo, webInfo } = webData || {};
console.log(webInfo)
  return (
    <WebDataDisContext.Provider value={{ webInfo,refetch, isWebsiteLoading, products,data,isPending}}>
      {children}
    </WebDataDisContext.Provider>
  );
};

export default WebDataDisProvider;
