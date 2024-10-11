import { useContext, useEffect, useState } from "react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Shipping = () => {
  const { customerData, singleProductData, webCartItem, name } =
    useContext(WebDataDisContext);
  const [productData, setProductData] = useState(
    webCartItem.length !== 0 ? webCartItem : null
  );
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const typeParam = searchParams.get("type");

  const productIdParam = searchParams.get("productId");

  useEffect(() => {
    if (typeParam === "single" && productIdParam) {
      const fetchProductData = async () => {
        try {
          const res = await axiosPublic.get(`/product/${productIdParam}`);
          setProductData([res.data]);
        } catch (error) {
          console.log("Error fetching product data:", error);
        }
      };

      fetchProductData(); // Call the function
    }
  }, [typeParam, productIdParam, axiosPublic]);

  // Function to calculate the total price including shipping
  const calculateTotal = () => {
    if (!productData) return 0;
    const productTotal = productData.reduce(
      (acc, product) => acc + product.price,
      0
    );
    const shippingTotal = productData.length * 4.99; // Shipping charge $4.99 for each product
    return productTotal + shippingTotal;
  };

  const totalPrice = calculateTotal(); // Calculate the total price

  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-5">
        <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6">
          {/* Left Side */}
          <div className="col-span-8 bg-white p-6 shadow-lg rounded-md">
            {/* Shipping and Billing */}
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Shipping & Billing</h3>
                <button className="text-blue-500 hover:underline">EDIT</button>
              </div>
              <div className="mt-4">
                <span className="font-bold">
                  {customerData?.authData.displayName}
                </span>
                <p>{customerData?.phone}</p>
                <span className="inline-block bg-lime-400/45 text-gray-700 px-2 py-1 rounded-full text-xs font-semibold mr-2">
                  Location
                </span>
                <p>
                  {customerData?.address.state} /{customerData?.address.street},{" "}
                  {customerData?.address.city},{customerData?.address.country}
                </p>
              </div>
            </div>

            {/* Product Details */}
            {productData?.map((item) => (
              <div key={item.id}>
                <div className="flex items-center mt-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="ml-4">
                    <p className="font-semibold">{item?.name}</p>
                    <p className="text-gray-500">{item.description}</p>
                    <p className="font-bold text-orange-600 mt-2">
                      $ {item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side */}
          <div className="col-span-4 bg-white p-6 shadow-lg rounded-md">
            <div>
              {/* Order Summary */}
              <div className="pt-4">
                <h4 className="font-semibold text-lg mb-2">Order Summary</h4>
                <div className="flex justify-between mb-2">
                  <span>Items Total ({productData?.length || 0} Items)</span>
                  <span>
                    ${" "}
                    {productData
                      ?.reduce((acc, item) => acc + item.price, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping Fee (4.99 per item)</span>
                  <span>$ {(productData?.length * 4.99).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-orange-600 text-lg">
                  <span>Total</span>
                  <span>$ {totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Proceed to Pay */}
              <button
                onClick={() =>
                  navigate(
                    `/w/${name}/checkout?totalAmount=${totalPrice.toFixed(2)}`
                  )
                }
                className="w-full bg-orange-500 text-white font-bold py-3 mt-6 rounded hover:bg-orange-600"
              >
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
