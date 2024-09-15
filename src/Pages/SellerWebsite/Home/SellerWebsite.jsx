import Banner from "../../../Components/SellerWebPage/Banner";
import ContactInfo from "../../../Components/SellerWebPage/ContactInfo";
import FollowUs from "../../../Components/SellerWebPage/FollowUs";
import Navbar from "../../../Components/SellerWebPage/Navbar";

const SellerWebsite = () => {
  const data = {
    shopName: "WorkOut",
    logo: "https://i.ibb.co.com/kmkg9td/836.jpg",
    title: {
      color: "#fff",
      headingSize: "20px",
      subHeading: "10px",
    },
    body: {
      backgroundColor: "#feeae9",
    },
    navbar: {
      linksPosition: "center",
      backgroundColor: "#1fb5d8",
    },
    banner: {
      image: "https://i.ibb.co.com/yPp2rGW/pexels-iriser-1366957.jpg",
      title: "Lorem ipsum dolor sit amet consectetur",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam, doloremque?",
      textPosition: "center",
    },
    contactInfo: {
      location: "Dhanmondi",
      mobile: "0123456789",
      hotline: "0123455678",
      emailInfo: "info@superbox.com",
      emailSupport: "support@superbox.com",
    },
    socialLinks: {
      instagram: "",
      facebook: "",
      linkedin: "",
      twitter: "",
      youtube: "",
    },
  };
  return (
    <div
      style={{ backgroundColor: data.body.backgroundColor }}
      className="min-h-screen"
    >
      {/* Navbar */}
      <Navbar
        linksPosition={data.navbar.linksPosition}
        backgroundColor={data.navbar.backgroundColor}
        logo={data.logo}
        shopName={data.shopName}
      />

      {/* Banner */}
      <Banner
        image={data.banner.image}
        title={data.banner.title}
        description={data.banner.description}
      />

      {/* Contact Information */}
      <ContactInfo
        location={data.contactInfo.location}
        mobile={data.contactInfo.mobile}
        hotline={data.contactInfo.hotline}
        emailInfo={data.contactInfo.emailInfo}
        emailSupport={data.contactInfo.emailSupport}
      />

      {/* follow us */}
      <FollowUs
        instagram={data.socialLinks.instagram}
        facebook={data.socialLinks.facebook}
        linkedin={data.socialLinks.linkedin}
        twitter={data.socialLinks.twitter}
        youtube={data.socialLinks.youtube}
      />
      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} {data.BrandName}. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default SellerWebsite;
