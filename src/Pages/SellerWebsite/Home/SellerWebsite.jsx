import { useParams, useSearchParams } from "react-router-dom";
import Banner from "../../../Components/SellerWebPage/Banner";
import ContactInfo from "../../../Components/SellerWebPage/ContactInfo";
import FollowUs from "../../../Components/SellerWebPage/FollowUs";
import Navbar from "../../../Components/SellerWebPage/Navbar";
import { useContext } from "react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import Title from "../../../Components/Common/Title";

const SellerWebsite = () => {
  const { name } = useParams();

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  console.log(name, id);
  const { webInfo, products } = useContext(WebDataDisContext);

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <Banner
        image={webInfo?.banner.image}
        title={webInfo?.banner.title}
        description={webInfo?.banner.description}
      />

      {products && (
        <div className="px-10">
          <div className="py-10">
            <Title title1={"Choose your products"} title2={"Products"}></Title>
          </div>
          <div>
            <div className="mt-10">
              <div className="grid grid-cols-3 gap-3">
                {products?.slice(0, 3).map((product) => (
                  <div key={product._id} className="card bg-base-100 shadow-xl">
                    <figure>
                      <img src={product.image} alt={product.name} />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{product.name}</h2>
                      <p>{product.description}</p>
                      <div className="card-actions justify-between items-center">
                        <span className="text-lg font-bold">
                          ${product.price}
                        </span>
                        <button className="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
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
