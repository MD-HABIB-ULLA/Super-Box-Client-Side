import { useContext } from "react";
import Title from "../../../Components/Common/Title";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import Banner from "./EditPageComponents/Banner";
import Navbar from "./EditPageComponents/Navbar";
import Contact from "./EditPageComponents/Contact";
import FollowUs from "./EditPageComponents/FollowUs";

const EditWebsite = () => {
  const { data, isPending } = useContext(WebDataDisContext);

  return (
    <div>
      {/* Desktop View */}
      <div className="my-10 hidden lg:block">
        <Title title1="Customize Your Website" title2="Edit Your Website Preferences" />
        
        {isPending ? (
          <div className="h-screen flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          data && (
            <div className="px-4">
              <div
                style={{ backgroundColor: data.webInfo?.body.backgroundColor }}
                className="rounded-lg overflow-hidden mt-10 border-[1px] border-black"
              >
                <Navbar />
                <Banner />
                <Contact />
                <FollowUs />
              </div>
            </div>
          )
        )}
      </div>

      {/* Mobile View */}
      <div className="h-screen w-full flex items-center justify-center lg:hidden">
        <Title
          title1="Editing Unavailable on Mobile"
          title2="Please use a larger screen to edit your website."
        />
      </div>
    </div>
  );
};

export default EditWebsite;
