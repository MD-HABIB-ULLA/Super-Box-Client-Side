const SellerWebsite = () => {
  const data = {
    BrandName: "WorkOut",
    BrandLogo: "https://i.ibb.co.com/kmkg9td/836.jpg",
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
      backgroundColor: "#8f8bed",
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
      <nav
        className={`flex justify-${data.navbar.linksPosition} p-4`}
        style={{ backgroundColor: data.navbar.backgroundColor }}
      >
        <img src={data.BrandLogo} alt="Brand Logo" className="h-10 mr-4" />
        <h1 className="text-white text-2xl">{data.BrandName}</h1>
      </nav>

      {/* Banner */}
      <div
        className="flex justify-center items-center text-center py-16"
        style={{
          backgroundImage: `url(${data.banner.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className={`text-${data.banner.textPosition}`}>
          <h2 className="text-white text-4xl mb-4">{data.banner.title}</h2>
          <p className="text-white text-lg">{data.banner.description}</p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="text-center py-8">
        <h3 className="text-xl mb-4">Contact Information</h3>
        <p>Location: {data.contactInfo.location}</p>
        <p>Mobile: {data.contactInfo.mobile}</p>
        <p>Hotline: {data.contactInfo.hotline}</p>
        <p>Email: {data.contactInfo.emailInfo}</p>
        <p>Support: {data.contactInfo.emailSupport}</p>
      </div>

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
