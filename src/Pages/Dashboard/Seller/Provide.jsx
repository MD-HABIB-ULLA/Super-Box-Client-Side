import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import { Link } from "react-router-dom";
import { FaLeftLong } from "react-icons/fa6";

const Provide = () => {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [serviceDetails, setServiceDetails] = useState(null);
  const axiosPublic = useAxiosPublic();

  const { cartItems, addToCart } = useContext(WebDataDisContext);
  console.log(cartItems);

  const handlePaymentConfirmation = () => {
    setPaymentConfirmed(true); // Trigger payment confirmation
    document.getElementById("provide").close(); // Close payment modal
    document.getElementById("receipt").showModal(); // Show receipt modal
  };
  const handlePrintReceipt = () => {
    window.print(); // Trigger browser print function
  };

  return (
    <div>
      <div className="">
        <Link to={-1}>
          <button className="btn text-blue-600"><FaLeftLong/> Go back</button>
        </Link>
      </div>
      {cartItems?.map((item) => (
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
              <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
              <p className="mt-1 text-xs text-gray-700">{item.description}</p>
            </div>
            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div className="flex items-center space-x-4">
                <p className="text-sm">{item.price} $</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="border-t border-dashed ">
        <div>
          Total :{" "}
          {cartItems.reduce((accumulator, item) => {
            return accumulator + item.price;
          }, 0)}
        </div>
      </div>
      <button
        onClick={handlePaymentConfirmation}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Sell
      </button>
      {/* {type === "product" && productDetails && (
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap md:flex-nowrap">
            <img
              src={productDetails?.image}
              alt={productDetails?.name}
              className="w-full md:w-1/2 mb-4 md:mb-0 rounded-lg"
            />
            <div className="w-full md:w-1/2 px-4">
              <h1 className="text-2xl font-bold mb-4">
                {productDetails?.name}
              </h1>
              <p className="text-gray-700 mb-4">
                {productDetails?.description}
              </p>
              <div className="flex items-center mb-4">
                <span className="text-gray-700 font-bold mr-2">Price:</span>
                <span className="text-blue-500 text-xl font-bold">
                  ${productDetails?.price}
                </span>
              </div>
              <button
                onClick={handlePaymentConfirmation}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sell
              </button>
            </div>
          </div>
        </div>
      )} */}

      {/* {type === "service" && serviceDetails && (
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap md:flex-nowrap">
            <img
              src={serviceDetails.image}
              alt={serviceDetails.serviceTitle}
              className="w-full md:w-1/2 mb-4 md:mb-0 rounded-lg"
            />
            <div className="w-full md:w-1/2 px-4">
              <h1 className="text-2xl font-bold mb-4">
                {serviceDetails.serviceTitle}
              </h1>
              <p className="text-gray-700 mb-4">
                {serviceDetails.serviceDescription}
              </p>
              <div className="flex items-center mb-4">
                <span className="text-gray-700 font-bold mr-2">
                  Required Time:
                </span>
                <span className="text-blue-500 text-xl font-bold">
                  {serviceDetails.requiredTime} hours
                </span>
              </div>
              <div className="flex items-center mb-4">
                <span className="text-gray-700 font-bold mr-2">
                  Available Slots:
                </span>
                <span className="text-green-500 text-xl font-bold">
                  {serviceDetails.availableSlots}
                </span>
              </div>
              <div className="text-gray-700 text-sm mb-4">
                Starting from:{" "}
                <span className="text-blue-500 text-xl font-bold">
                  ${serviceDetails.serviceCost}
                </span>
              </div>

              <button
                onClick={handlePaymentConfirmation}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Provide
              </button>
            </div>
          </div>
        </div>
      )} */}

      {/* <dialog id="provide" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {type === "product"
              ? productDetails?.name
              : serviceDetails?.serviceTitle}
          </h3>

          <p className="py-4">
            {type === "product" ? (
              <>
                <strong>Description:</strong> {productDetails?.description}
                <br />
                <strong>Price:</strong> ${productDetails?.price}
              </>
            ) : (
              <>
                <strong>Description:</strong>{" "}
                {serviceDetails?.serviceDescription}
                <br />
                <strong>Service Time:</strong> {serviceDetails?.requiredTime}{" "}
                hours
                <br />
                <strong>Available Slots:</strong>{" "}
                {serviceDetails?.availableSlots}
                <br />
                <strong>Starting Cost:</strong> ${serviceDetails?.serviceCost}
              </>
            )}
          </p>

          <div className="mt-4">
            <h4 className="font-bold text-md mb-2">Choose Payment Method:</h4>
            <div>
              <label className="flex items-center mb-2">
                <input
                  type="radio"
                  name="payment"
                  value="mobile"
                  className="mr-2"
                />
                Mobile Banking
              </label>
              <label className="flex items-center mb-2">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  className="mr-2"
                />
                Credit/Debit Card
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  className="mr-2"
                />
                Cash
              </label>
            </div>
          </div>

          <button className="btn mt-4">Confirm Payment</button>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button className="btn">Close</button>
        </form>
      </dialog> */}
      {/* <dialog id="receipt" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Payment Receipt</h3>
          <p className="py-4">
            <strong>Transaction ID:</strong> {id}
            <br />
            <strong>Payment Method:</strong>{" "}
           
            <br />
            {type === "product" ? (
              <>
                <strong>Product Name:</strong> {productDetails?.name}
                <br />
                <strong>Price:</strong> ${productDetails?.price}
              </>
            ) : (
              <>
                <strong>Service Name:</strong> {serviceDetails?.serviceTitle}
                <br />
                <strong>Service Cost:</strong> ${serviceDetails?.serviceCost}
              </>
            )}
          </p>

          <button onClick={handlePrintReceipt} className="btn mt-4">
            Print Receipt
          </button>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button className="">Close</button>
        </form>
      </dialog> */}
    </div>
  );
};

export default Provide;
