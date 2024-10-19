import {
  FaRocket,
  FaCashRegister,
  FaBoxes,
  FaWrench,
  FaGlobe,
  FaStore,
} from "react-icons/fa"; // Importing icons from react-icons

const features = () => {
  const features = [
    {
      icon: <FaRocket className="w-6 h-6" />,
      title: "Build Lightweight Webpage",
      desc: "Optimize your webpage for speed and performance, ensuring faster load times and a smooth user experience.",
    },
    {
      icon: <FaCashRegister className="w-6 h-6" />,
      title: "POS System",
      desc: "Seamless integration of point-of-sale features to manage in-store sales effortlessly.",
    },
    {
      icon: <FaBoxes className="w-6 h-6" />,
      title: "Product Management",
      desc: "Easily manage your products, including adding, removing, and updating listings in real-time.",
    },
    {
      icon: <FaWrench className="w-6 h-6" />,
      title: "Service Management",
      desc: "Offer and manage services through your platform with dedicated features to streamline bookings and support.",
    },
    {
      icon: <FaGlobe className="w-6 h-6" />,
      title: "Separate Web URL",
      desc: "Get your own custom web URL to build a personalized online presence for your business.",
    },
    {
      icon: <FaStore className="w-6 h-6" />,
      title: "Make Your Store Online",
      desc: "Bring your physical store online with all the tools needed to sell products and services virtually.",
    },
  ];

  return (
    <section className="py-14 ">
      {" "}
      {/* Updated to match the theme */}
      <div className="max-w-screen-xl mx-auto px-4  md:px-8">
        <div className="relative max-w-2xl mx-auto sm:text-center">
          <div className="relative z-10">
            <h3 className="text-indigo-500 font-bold text-3xl  sm:text-4xl">
              Latest features
            </h3>
            <p className="mt-3">
              Boost your business with essential tools and features designed for
              seamless online and in-store management.
            </p>
          </div>
          <div
            className="absolute inset-0 max-w-xs mx-auto h-44 blur-[118px]"
            style={{
              background:
                "linear-gradient(152.92deg, rgba(75, 0, 130, 0.2) 6.54%, rgba(75, 0, 130, 0.26) 84.2%, rgba(75, 0, 130, 0.1) 77.55%)",
            }}
          ></div>
        </div>
        <div className="relative mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, idx) => (
              <li
                key={idx}
                className="bg-white space-y-3 p-4 border rounded-lg"
              >
                <div className="text-indigo-600 pb-3">{item.icon}</div>
                <h4 className="text-lg text-gray-800 font-semibold">
                  {item.title}
                </h4>
                <p className="text-gray-600">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default features;
