// WebDataDisContext.js
import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

// Create the context
export const WebDataDisContext = createContext(null);

// Create the provider component
const WebDataDisProvider = ({ children }) => {
  const { name } = useParams();
  const [webData, setWebData] = useState(null);
  const axiosPublic = useAxiosPublic();

  // Fetching data using useQuery
  // Fetching website data using useQuery
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
    enabled: !!name, // Only run the query if the name exists
  });

  // Fetching products data using useQuery
  const {
    data: products,
    isLoading: isProductsLoading,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: [name, "products"],
    queryFn: async () => {
      if (name) {
        const res = await axiosPublic.get(`/products/${name}`);
        return res.data;
      }
      return null;
    },
    enabled: !!name, // Only run the query if the name exists
  });

  // Using useEffect to set webData when data changes
  useEffect(() => {
    if (!isWebsiteLoading && websiteData) {
      setWebData(websiteData); // Update the webData state with the fetched data
    }
  }, [isWebsiteLoading, websiteData]); // Only re-run effect when isLoading or data changes

  const { _id, email, sellerInfo, webInfo } = webData || {};

  return (
    <WebDataDisContext.Provider value={{ webInfo, isWebsiteLoading, products}}>
      {children}
    </WebDataDisContext.Provider>
  );
};

export default WebDataDisProvider;
