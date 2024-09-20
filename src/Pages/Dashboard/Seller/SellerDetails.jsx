import React from 'react';
import { Link, useParams } from 'react-router-dom';
import SellerInformation from './SellerInformation';
import ShopInformation from './ShopInformation';
import SellingDetails from './SellingDetails';
import BusinessRevenue from './BusinessRevenue';
import CustomerFeedBack from './CustomerFeedBack';

const SellerDetails = () => {
   const {email} = useParams()
   console.log(email)
    return (
        <div>
        {/* Banner */}
        <div className="min-h-[60vh] bg-sky-200 ">
            <div className="ml-[10%] pt-[15%] ">
                {/* <img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" /> */}
                <div className="max-w-fit mx-auto flex flex-col justify-center items-center gap-3 w-full">
                    <h1 className="text-5xl font-bold">Seller Brand Name</h1>
                    <button className=" border-2 w-fit py-2 px-8 rounded-3xl text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700"><Link to={"/my-website "}>View Website</Link></button>
                </div>
            </div>
        </div>

        {/* Tab */}
        <div role="tablist" className="tabs tabs-lifted tabs-lg mt-10  ">
            {/* Seller Information Tab*/}
            <input type="radio" name="my_tabs_2" role="tab" className="tab w-full  [--tab-border-color:blue] text-nowrap" aria-label="Seller Information" defaultChecked/>
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
            <input type="radio" name="my_tabs_2" role="tab" className="tab  [--tab-border-color:blue] text-nowrap" aria-label="Products" />
            <div role="tabpanel" className="tab-content px-2">
                <SellingDetails></SellingDetails>
            </div>

            {/* Business Revenue Tab*/}
            <input type="radio" name="my_tabs_2" role="tab" className="tab  [--tab-border-color:blue] text-nowrap" aria-label="Business Revenue" />
            <div role="tabpanel" className="tab-content px-2">
                <BusinessRevenue></BusinessRevenue>
            </div>

            {/* Customers Feedback Tab*/}
            <input type="radio" name="my_tabs_2" role="tab" className="tab  [--tab-border-color:blue] text-nowrap" aria-label="Customers Feedback" />
            <div role="tabpanel" className="tab-content px-2">
                <CustomerFeedBack></CustomerFeedBack>
            </div>
        </div>
    </div>
    );
};

export default SellerDetails;