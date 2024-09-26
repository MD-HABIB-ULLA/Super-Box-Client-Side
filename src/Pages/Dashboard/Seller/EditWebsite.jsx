import { useContext, useEffect, useState } from "react";
import Title from "../../../Components/Common/Title";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import Banner from "./EditPageComponents/Banner";
import Navbar from "./EditPageComponents/Navbar";

const EditWebsite = () => {
  const { data, isPending } = useContext(WebDataDisContext);
  
  return (
    <div className="my-10">
      <Title
        title1={"BY YOUR PREFERENCE"}
        title2={"Edit your website "}
      ></Title>
      {isPending ? (
        <>
          <div className="h-screen flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </>
      ) : (
        <>
          <div className="px-4 rounded-lg overflow-hidden mt-10">
            {/* banner */}
            <Navbar/>
            <Banner/>
          </div>
        </>
      )}
    </div>
  );
};

export default EditWebsite;
