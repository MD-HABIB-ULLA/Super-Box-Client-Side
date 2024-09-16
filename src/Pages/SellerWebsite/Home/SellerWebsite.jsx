import { useParams, useSearchParams } from "react-router-dom";
import Banner from "../../../Components/SellerWebPage/Banner";
import ContactInfo from "../../../Components/SellerWebPage/ContactInfo";
import FollowUs from "../../../Components/SellerWebPage/FollowUs";
import Navbar from "../../../Components/SellerWebPage/Navbar";
import { useContext } from "react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";

const SellerWebsite = () => {
  const { name } = useParams();

  // Get the query parameters (in this case, 'id')
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  console.log(name, id);
  const { webInfo } = useContext(WebDataDisContext);

  
  return (
    <div
      
      className="min-h-screen"
    >
      {/* Navbar */}
   

      {/* Banner */}
      <Banner
        image={webInfo?.banner.image}
        title={webInfo?.banner.title}
        description={webInfo?.banner.description}
      />

      {/* Contact Information */}
      <ContactInfo
        location={webInfo?.contactInfo.location}
        mobile={webInfo?.contactInfo.mobile}
        hotline={webInfo?.contactInfo.hotline}
        emailInfo={webInfo?.contactInfo.emailInfo}
        emailSupport={webInfo?.contactInfo.emailSupport}
      />

      {/* follow us */}
      <FollowUs
        instagram={webInfo?.socialLinks.instagram}
        facebook={webInfo?.socialLinks.facebook}
        linkedin={webInfo?.socialLinks.linkedin}
        twitter={webInfo?.socialLinks.twitter}
        youtube={webInfo?.socialLinks.youtube}
      />
      {/* Footer */}
     
    </div>
  );
};

export default SellerWebsite;
