import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";

// Create the context
export const WebDataDisContext = createContext(null);

const WebDataDisProvider = ({ children }) => {
  const [customerEmail, setCustomerEmail] = useState("");
  const [name, setName] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [webCartItem, setWebCartItem] = useState([]);
  const [webData, setWebData] = useState(null);
  const [blogs, setBlogs] = useState(null);


  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
 
  const { data: customerData } = useQuery({
    queryKey: [user?.email, "customer info"],
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosPublic.get(`/customerInfo/${user.email}`);
        return res.data;
      }
      return null;
    },
    enabled: !!user?.email,
  
  });
  const { data: purchaseProducts } = useQuery({
    queryKey: [user?.email, "purchaseProducts"],
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosPublic.get(`/purchaseProducts/${user.email}`);
        return res.data;
      }
      return null;
    },
    enabled: !!user?.email,
  
  });



  const { data: websiteData, isLoading: isWebsiteLoading } = useQuery({
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

  const { data: products, isLoading: isProductsLoading } = useQuery({
    queryKey: [name, "products"],
    queryFn: async () => {
      if (name) {
        const res = await axiosPublic.get(`/w/products/${name}`);
        return res.data;
      }
      return null;
    },
    enabled: !!name,
  });

  const { data, isPending, refetch } = useQuery({
    queryKey: [user?.email, "websiteData"],
    enabled: !!user?.email,
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosPublic.get(`/webData/${user?.email}`);
        return res.data || {};
      }
      return {};
    },
  });

  const { data: services } = useQuery({
    queryKey: [name, "services"],
    enabled: !!name,
    queryFn: async () => {
      if (name) {
        const res = await axiosPublic.get(`/service/${name}`);
        return res.data;
      }
    },
  });

  useEffect(() => {
    if (!isWebsiteLoading && websiteData) {
      setWebData(websiteData);
    }
  }, [isWebsiteLoading, websiteData]);

  const { email, webInfo } = webData || {};

  useEffect(() => {
    if (email) {
      axiosPublic
        .get(`/blogs/${email}`)
        .then((res) => setBlogs(res.data))
        .catch((err) => console.log(err));
    }
  }, [email]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCart) {
      setCartItems(storedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const getCartItems = async (email, shopName) => {
    try {
      const response = await axiosPublic.get(`/cart/${email}/${shopName}`);
      return response.data.products;
    } catch (error) {
      console.error(
        "Error fetching cart items:",
        error.response?.data?.message || error.message
      );
      return [];
    }
  };

  useEffect(() => {
    const fetchInitialCartItems = async () => {
      const email = user?.email;
      const shopName = name;
      if (email && shopName) {
        const initialCartItems = await getCartItems(email, shopName);
        setWebCartItem(initialCartItems);
      }
    };
    fetchInitialCartItems();
  }, [user?.email, name]);

  const addWebCartItem = async (id) => {
    const email = user.email;
    const shopName = name;

    try {
      const response = await axiosPublic.post(`/cart/${id}/${email}`);
      toast.success(response.data.message);

      const updatedCartItems = await getCartItems(email, shopName);
      setWebCartItem(updatedCartItems);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding item to cart");
    }
  };

  const deleteWebCartItem = async (id) => {
    const email = user.email;
    const shopName = name;

    try {
      const response = await axiosPublic.delete(`/cart/${id}/${email}`);
      toast.success(response.data.message);

      const updatedCartItems = await getCartItems(email, shopName);
      setWebCartItem(updatedCartItems);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error removing item from cart"
      );
    }
  };


  const singleProductData = (id) => {
    const { data, isLoading, refetch, error } = useQuery({
      queryKey: [id, "product data with id"],
      queryFn: async () => {
        if (id) {
          const res = await axiosPublic.get(`/product/${id}`);
          return res.data;
        }
        return null;
      },
      enabled: !!id, // Only run the query if id exists
    });
  
    return { data, isLoading, refetch, error };
  };

  return (
    <WebDataDisContext.Provider
      value={{
        email,
        blogs,
        addWebCartItem,
        deleteWebCartItem,
        refetch,
        isWebsiteLoading,
        products,
        data,
        isPending,
        setCartItems,
        cartItems,
        services,
        addToCart,
        setName,
        name,
        webInfo,
        setCustomerEmail,
        webCartItem,
        customerData,
        purchaseProducts,
        singleProductData
      }}
    >
      {children}
    </WebDataDisContext.Provider>
  );
};

export default WebDataDisProvider;
