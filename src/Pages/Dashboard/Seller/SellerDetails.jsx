import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SellerInformation from "./SellerInformation";
import ShopInformation from "./ShopInformation";
import SellingDetails from "./SellingDetails";
import BusinessRevenue from "./BusinessRevenue";
import CustomerFeedBack from "./CustomerFeedBack";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const SellerDetails = () => {
  const { email } = useParams(); // Get email param from the URL
  const [sellerData, setSellerData] = useState(null); // State for seller data
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for handling errors
  const axiosPublic = useAxiosPublic(); // Axios instance

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axiosPublic.get(`/webData/${email}`); // Fetch data from the API
        setSellerData(response.data); // Set the seller data state
      } catch (error) {
        console.error("Error fetching seller data:", error); // Log error
        setError("Failed to load seller data."); // Set error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (email) {
      fetchSellerData(); // Fetch data if email is available
    }
  }, [email, axiosPublic]);

  // Conditional rendering based on loading, error, and data availability
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!sellerData) return <div>No seller data found.</div>;

  // Destructure sellerData safely after ensuring it's available
  const { name, webInfo } = sellerData || {};

  return (
    <>
      <div>
        {/* Banner */}
        <div className="  ">
          <div
            className="py-[15%] relative  bg-center bg-cover bg-no-repeat  "
            style={{ backgroundImage: `url(${webInfo.banner.image})` }}
          >
            <div className="max-w-fit mx-auto flex flex-col justify-center items-center gap-3 w-full z-10">
              <h1 className="text-5xl text-white font-bold">
                {webInfo.shopName}
              </h1>
              <button className=" border-2 w-fit py-2 px-8 rounded-3xl text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700">
                <Link
                  to={`${window.location.origin}/w/${webInfo.shopName}`}
                >
                  View Website
                </Link>
              </button>
            </div>
          </div>
        </div>

        {/* Tab */}
        <div role="tablist" className="tabs tabs-lifted tabs-lg mt-10  ">
          {/* Seller Information Tab*/}
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab w-full  [--tab-border-color:blue] text-nowrap"
            aria-label="Seller Information"
            defaultChecked
          />
          <div role="tabpanel" className="tab-content px-2">
            <SellerInformation></SellerInformation>
          </div>

          {/* Shop Information Tab*/}
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab  [--tab-border-color:blue] text-nowrap"
            aria-label="Shop Information "
          />
          <div role="tabpanel" className="tab-content px-4">
            <ShopInformation></ShopInformation>
          </div>

          {/* Selling Details Tab*/}
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab  [--tab-border-color:blue] text-nowrap"
            aria-label="Products"
          />
          <div role="tabpanel" className="tab-content px-2">
            <SellingDetails></SellingDetails>
          </div>

          {/* Business Revenue Tab*/}
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab  [--tab-border-color:blue] text-nowrap"
            aria-label="Business Revenue"
          />
          <div role="tabpanel" className="tab-content px-2">
            <BusinessRevenue></BusinessRevenue>
          </div>

          {/* Customers Feedback Tab*/}
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab  [--tab-border-color:blue] text-nowrap"
            aria-label="Customers Feedback"
          />
          <div role="tabpanel" className="tab-content px-2">
            <CustomerFeedBack></CustomerFeedBack>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerDetails;
