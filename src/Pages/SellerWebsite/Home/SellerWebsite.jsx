import Banner from "../../../Components/SellerWebPage/Banner";
import ContactInfo from "../../../Components/SellerWebPage/ContactInfo";
import FollowUs from "../../../Components/SellerWebPage/FollowUs";
import { useContext } from "react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import Title from "../../../Components/Common/Title";
import Services from "../../../Components/SellerWebPage/Services";
import { Link, useParams } from "react-router-dom";

const SellerWebsite = () => {
  const { webInfo, products, blogs, services, setName } =
    useContext(WebDataDisContext);
    const {name} = useParams()

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <Banner
        image={webInfo?.banner.image}
        title={webInfo?.banner.title}
        description={webInfo?.banner.description}
        textPosition={webInfo?.banner.textPosition}
      />

      {products?.length !== 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                Choose Your Products
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover our curated selection of high-quality products
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products?.slice(0, 3).map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
                >
                  <div className="relative pb-2/3">
                    <figure className="h-[200px]">
                      <img
                        className="h-full w-full object-cover"
                        src={product.image}
                        alt={product.name}
                      />
                    </figure>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-indigo-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <Link
                        to={`/product/${product._id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                to={`/w/${name}/products`}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>
      )}
      {blogs?.length !== 0 && (
        <div className="mt-10 max-w-7xl px-10 m-auto">
          <div className="py-10">
            <Title title2={"BLOGS"}></Title>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs?.slice(0, 3).map((blog, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden mb-6 group relative "
              >
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    {blog.upload_date}
                  </p>
                  <div className="h-56">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className=" h-full  mb-4 rounded"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {blog.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    Posted by: {blog.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {services?.length !== 0 && <Services services={services} />}

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
    </div>
  );
};

export default SellerWebsite;
