import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { Currency } from "lucide-react";
import { TbCurrencyTaka } from "react-icons/tb";

const Checkout = () => {
  const { confirmProduct, webData, name, sellerInfo,setWebCartItem ,getCartItems} =
    useContext(WebDataDisContext);

  console.log(sellerInfo);
  const {shopName} = useParams
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const sellerEmail = webData?.email;
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");
  const [mobileBankingOption, setMobileBankingOption] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [transactionId, setTransactionId] = useState("");

  const handleInputChange = (e) => {
    setTransactionId(e.target.value); // Update the state with the input value
  };
  console.log(transactionId);
  useEffect(() => {
    if (!confirmProduct) {
      navigate(-1);
    }
  }, [confirmProduct, navigate, name]); // Add dependencies

  const [totalPrice, setTotalPrice] = useState(0); // Assume initial total without any extra fees

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const amount = searchParams.get("totalAmount");
    if (amount) {
      setTotalPrice(parseFloat(amount));
    }
  }, [location.search]);
  // Function to handle card input changes
  const handleCardInputChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  // Function to calculate the total price based on payment method
  const calculateTotal = () => {
    let extraCharge = 0;
    if (paymentMethod === "cashOnDelivery") {
      extraCharge = 10; // Cash on Delivery charge is $10
    }
    return totalPrice + extraCharge;
  };

  const handlePayment = async () => {
    // Ensure confirmProduct is an array, even if it's a single object
    const productData = Array.isArray(confirmProduct)
      ? confirmProduct
      : [confirmProduct];

    // Map over the productData to append additional payment information
    const updatedProductData = productData.map((product) => ({
      ...product,
      paymentStatus:
        paymentMethod === "cashOnDelivery" || "collectFromStore"
          ? "pending"
          : "success",
      buyerEmail: email,
      productId: product._id,
      isReceived: false,
      paymentMethod: paymentMethod,
      sellerEmail: sellerEmail,
      transactionId: transactionId ? transactionId : "",
    }));

    // Iterate over each product and send a separate API call for each
    try {
      for (const product of updatedProductData) {
        const { _id, ...restOfProduct } = product;
        const response = await axiosPublic.post(
          "/payment",
          { ...restOfProduct } // Sending individual product object
        );
        const initialCartItems = await getCartItems(email, shopName);
        setWebCartItem(initialCartItems);
        toast.success(`Payment for product ${product.name} succeeded`);
        navigate(`/w/${name}`);
      }
      // Handle successful payments here (e.g., navigate to a success page)
    } catch (error) {
      console.error("Payment failed for one or more products", error);
      // Handle payment failure (e.g., show error message)
    }
  };
  const handleSSLPayment = async () => {
    const data = {
      Amount: calculateTotal().toFixed(2),
      Currency: "BDT",
      buyerEmail: user.email,
      paymentMethod: paymentMethod,
      productId: confirmProduct.map((product) => product._id),
    };
    console.log(data);
    const res = await axiosPublic.post("/paymentSSL", data);

    console.log(res.data.sslCommerzResponse.GatewayPageURL);
    const redirectURL = res.data.sslCommerzResponse.GatewayPageURL;
    console.log(redirectURL);
    if (redirectURL !== "") {
      window.location.replace(redirectURL);
    }
  };

  const handlePrint = () => {
    window.print();
    handlePayment();
  };

  const openDialog = () => {
    document.getElementById("recite").showModal();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-6">
        {/* Left Side - Payment Methods */}
        <div className="md:col-span-8 bg-white p-6 shadow-lg rounded-md">
          <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
          <div className="flex space-x-4 mb-6">
            <button
              className={`py-2 px-4 rounded ${
                paymentMethod === "cashOnDelivery"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setPaymentMethod("cashOnDelivery")}
            >
              Cash on Delivery
            </button>
            <button
              className={`py-2 px-4 rounded ${
                paymentMethod === "mobileBanking"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setPaymentMethod("mobileBanking")}
            >
              Mobile Banking
            </button>
            {sellerInfo?.shopLocation && (
              <button
                className={`py-2 px-4 rounded ${
                  paymentMethod === "collectFromStore"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setPaymentMethod("collectFromStore")}
              >
                Collect From Store
              </button>
            )}
            <button
              className={`py-2 px-4 rounded ${
                paymentMethod === "cardPayment"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setPaymentMethod("cardPayment")}
            >
              Card Payment
            </button>
            <button
              className={`py-2 px-4 rounded ${
                paymentMethod === "payToSuperBox"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setPaymentMethod("payToSuperBox")}
            >
              Pay To Super Box
            </button>
          </div>

          {/* Payment Method Content */}
          {paymentMethod === "cashOnDelivery" && (
            <div className="bg-gray-50 p-4 rounded-md">
              <p className=" flex items-center gap-1">
                Cash on Delivery is selected. A
                BDT: 10 Tk charge will be added to your total.
              </p>
            </div>
          )}
          {paymentMethod === "payToSuperBox" && <div></div>}

          {paymentMethod === "mobileBanking" && (
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-lg font-semibold mb-2">
                Select Mobile Banking Option
              </h4>
              <div className="space-x-4">
                {sellerInfo?.bkashNumber && (
                  <button
                    className={`py-2 px-4 rounded ${
                      mobileBankingOption === "bikash"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => setMobileBankingOption("bikash")}
                  >
                    Bkash
                  </button>
                )}
                {sellerInfo?.nogodNumber && (
                  <button
                    className={`py-2 px-4 rounded ${
                      mobileBankingOption === "nogod"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => setMobileBankingOption("nogod")}
                  >
                    Nogod
                  </button>
                )}
                {sellerInfo?.upayNumber && (
                  <button
                    className={`py-2 px-4 rounded ${
                      mobileBankingOption === "upay"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => setMobileBankingOption("upay")}
                  >
                    Upay
                  </button>
                )}
              </div>

              <div className="">
                {mobileBankingOption === "bikash" && (
                  <div>
                    <p className="text-green-500 flex items-center gap-1">
                      Send{" "}
                      <span className="font-bold flex items-center gap-1">
                        {" "}
                        <TbCurrencyTaka />
                        {calculateTotal().toFixed(2)}{" "}
                      </span>
                      on this no,{" "}
                      <span className=" font-bold">
                        {" "}
                        {sellerInfo?.bkashNumber}
                      </span>
                    </p>
                    <label className="form-control w-full ">
                      <div className="label">
                        <span className="label-text">
                          Enter your transaction Id{" "}
                        </span>
                      </div>
                      <input
                        type="text"
                        required
                        value={transactionId}
                        onChange={handleInputChange}
                        placeholder="Type transaction Id"
                        className="input input-bordered w-full "
                      />
                    </label>
                  </div>
                )}
                {mobileBankingOption === "nogod" && (
                  <div> please enter your number </div>
                )}
                {mobileBankingOption === "upay" && (
                  <div> please enter your number </div>
                )}
              </div>
            </div>
          )}

          {paymentMethod === "collectFromStore" && (
            <>
              <div> shope Location : {sellerInfo?.shopLocation}</div>
            </>
          )}
          {paymentMethod === "cardPayment" && (
            <div className="relative">
              <div className="h-full w-full absolute bg-gray-500/15 rounded-lg text-error text-4xl  flex items-center justify-center">
                <p> This system on Working process..... </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md ">
                <h4 className="text-lg font-semibold mb-2">
                  Enter Card Details
                </h4>
                <div>
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardInputChange}
                    placeholder="Card Number"
                    className="w-full p-2 border rounded mb-2"
                  />
                  <input
                    type="text"
                    name="expiry"
                    value={cardDetails.expiry}
                    onChange={handleCardInputChange}
                    placeholder="Expiry Date (MM/YY)"
                    className="w-full p-2 border rounded mb-2"
                  />
                  <input
                    type="text"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleCardInputChange}
                    placeholder="CVV"
                    className="w-full p-2 border rounded mb-2"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Order Summary */}
        <div className="md:col-span-4 bg-white p-6 shadow-lg rounded-md">
          <h4 className="font-semibold text-lg mb-2">Order Summary</h4>
          <div className="flex justify-between mb-2">
            <span>Items Total</span>
            <span className="flex items-center gap-2">
              {" "}
            BDT: {totalPrice.toFixed(2)}Tk
            </span>
          </div>
          {paymentMethod === "cashOnDelivery" && (
            <div className="flex justify-between mb-2">
              <span>Cash on Delivery Fee</span>
              <span className="flex items-center gap-2">
                {" "}
               BDT: 10.00 Tk
              </span>
            </div>
          )}

          <div className="flex justify-between font-bold text-orange-600 text-lg">
            <span>Total</span>
            <span className="flex items-center gap-2">
              BDT: {calculateTotal().toFixed(2)}Tk
            </span>
          </div>

          {/* Proceed to Pay */}
          <button
            onClick={() => {
              if (paymentMethod === "payToSuperBox") {
                handleSSLPayment(); // Call the function when condition is true
              } else if (paymentMethod === "cashOnDelivery") {
                handlePayment();
              } else if (paymentMethod === "mobileBanking") {
                handlePayment();
              } else if (paymentMethod === "collectFromStore") {
                openDialog(confirmProduct);
              } else {
                toast.error("This feature under working process");
              }
            }}
            className="w-full bg-orange-500 text-white font-bold py-3 mt-6 rounded hover:bg-orange-600"
          >
            Proceed to Pay
          </button>
        </div>
      </div>
      <dialog id="recite" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Order Receipt</h3>
          {confirmProduct &&
            confirmProduct?.map((data) => (
              <div key={data._id}>
                <p>Product Name: {data.name}</p>
                <p>Price: {data.price}</p>
                <p>Quantity: {data.quantity}</p>
              </div>
            ))}
          <div className="modal-action">
            <button
              onClick={() => document.getElementById("recite").close()}
              className="btn"
            >
              Close
            </button>
            <button onClick={handlePrint} className="btn">
              Print and Confirm
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Checkout;
