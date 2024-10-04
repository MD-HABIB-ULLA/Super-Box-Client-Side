import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Provide = () => {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [serviceDetails, setServiceDetails] = useState(null);
  const axiosPublic = useAxiosPublic();

  const path = window.location.pathname;
  const segments = path.split("/");
  const id = segments[segments.length - 1]; // Get the last segment as ID
  const queryParams = new URLSearchParams(window.location.search);
  const type = queryParams.get("type"); // Extract 'type' from URL

  useEffect(() => {
    setLoading(true); // Set loading to true when starting the fetch

    if (type === "product") {
      axiosPublic
        .get(`/product/${id}`)
        .then((res) => setProductDetails(res.data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false)); // Set loading to false after fetching
    }
    if (type === "service") {
      axiosPublic
        .get(`/serviceDetails/${id}`)
        .then((res) => setServiceDetails(res.data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false)); // Set loading to false after fetching
    }
  }, [type, id]); // Add 'id' as a dependency to re-fetch data when it changes

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while data is being fetched
  }

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
      {type === "product" && productDetails && (
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
      )}

      {type === "service" && serviceDetails && (
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
      )}

      <dialog id="provide" className="modal">
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

          {/* Payment Method Section */}
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
      </dialog>
      <dialog id="receipt" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Payment Receipt</h3>
          <p className="py-4">
            <strong>Transaction ID:</strong> {id}
            <br />
            <strong>Payment Method:</strong>{" "}
            {/* You can add logic to show the selected payment method */}
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
      </dialog>
    </div>
  );
};

export default Provide;
