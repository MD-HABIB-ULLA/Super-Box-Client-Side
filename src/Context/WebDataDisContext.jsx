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
  const { data, isLoading, refetch } = useQuery({
    queryKey: [name, 'Website data with name'],
    queryFn: async () => {
      if (name) {
        const res = await axiosPublic.get(`/w/${name}`); 
        return res.data; 
      }
      return null; 
    },
    enabled: !!name, 
  });

  // Using useEffect to set webData when data changes
  useEffect(() => {
    if (!isLoading && data) {
      setWebData(data); // Update the webData state with the fetched data
    }
  }, [isLoading, data]); // Only re-run effect when isLoading or data changes

  const { _id, email,  sellerInfo, webInfo } = webData || {};
  console.log(name, webInfo);
  return (
    <WebDataDisContext.Provider value={{ webInfo , isLoading}}>
      {children}
    </WebDataDisContext.Provider>
  );
};

export default WebDataDisProvider;
