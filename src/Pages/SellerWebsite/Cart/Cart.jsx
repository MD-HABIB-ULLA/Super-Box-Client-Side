import React, { useContext, useState, useEffect } from "react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";

import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { webCartItem, deleteWebCartItem, name, customerData } =
    useContext(WebDataDisContext);

  const [quantities, setQuantities] = useState({});

  const shippingCostPerItem = 4.99;

  useEffect(() => {
    const initialQuantities = {};
    webCartItem.forEach((item) => {
      initialQuantities[item._id] = 1;
    });
    setQuantities(initialQuantities);
  }, [webCartItem]);

  const handleQuantityChange = (id, action) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      if (action === "increment") {
        newQuantities[id]++;
      } else if (action === "decrement" && newQuantities[id] > 1) {
        newQuantities[id]--;
      }
      return newQuantities;
    });
  };

  const calculateSubtotal = () => {
    return webCartItem.reduce((total, item) => {
      return total + item.price * quantities[item._id];
    }, 0);
  };

  // Calculate the total price (subtotal + shipping)
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const totalShippingCost = webCartItem.length * shippingCostPerItem;
    return subtotal + totalShippingCost;
  };

  const handlePayment = (total) => {
    if (customerData.phone !== "") {
      webCartItem.length !== 0 && navigate(`/w/${name}/shipping?type=cart`);
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
      console.log(response.data.message);
    } catch (error) {
      console.error("Error submitting customer info:", error);
    }
  };

  return (
    <div>
      <div className="bg-gray-100 pt-20 min-h-screen">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {webCartItem.length !== 0 ? (
              webCartItem.map((item) => (
                <div
                  key={item._id}
                  className="justify-between mb-6 rounded-lg  p-6 shadow-md sm:flex sm:justify-start"
                >
                  <img
                    src={item.image}
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700">36EU - 4US</p>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <span
                          onClick={() =>
                            handleQuantityChange(item._id, "decrement")
                          }
                          className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          {" "}
                          -{" "}
                        </span>
                        <input
                          className="h-8 w-8 border bg-white text-center text-xs outline-none"
                          type="number"
                          value={quantities[item._id]}
                          readOnly
                        />
                        <span
                          onClick={() =>
                            handleQuantityChange(item._id, "increment")
                          }
                          className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          +
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">
                          ${(item.price * quantities[item._id]).toFixed(2)}
                        </p>
                        <div
                          className="cursor-pointer"
                          onClick={() => deleteWebCartItem(item._id)}
                        >
                          <X />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-5xl font-bold text-blue-400">
                There is no item in the cart
              </div>
            )}
          </div>

          {/* Summary section */}
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">${calculateSubtotal().toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">
                ${webCartItem.length * shippingCostPerItem.toFixed(2)}
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">
                  ${calculateTotal().toFixed(2)} USD
                </p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button
              onClick={() => {
                handlePayment(calculateTotal().toFixed(2));
              }}
              className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
