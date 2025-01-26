import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import { AuthContext } from "../../../Provider/AuthProvider";

const ProductDetails = () => {
  const { id } = useParams();
  const { singleProductData, name, customerData, addWebCartItem } =
    useContext(WebDataDisContext);
  const { user } = useContext(AuthContext);
  const { data } = singleProductData(id);
  console.log(data);

  const navigate = useNavigate();

  const handlePayment = (id) => {
    if (!user) {
      navigate(`/w/${name}/login`);
    }

    if (customerData.phone !== "") {
      addWebCartItem(id);
      navigate(`/w/${name}/shipping?type=single&productId=${id}`);
    } else {
      document.getElementById("customerInfo").showModal();
    }
  };

  return (
    <>
      {data && (
        <div className="min-h-screen flex items-center justify-center px-10">
          <div
            key={data?._id}
            className="grid md:grid-cols-2 grid-cols-1 bg-base-100 shadow-xl rounded-3xl p-2 border"
          >
            <figure className="rounded-3xl overflow-hidden">
              <img src={data?.image} alt={data?.name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{data?.name}</h2>
              <p>{data?.description}</p>
              <div className="card-actions justify-between items-center">
                <span className="text-lg font-bold">BDT: {data?.price}Tk</span>

                <button
                  onClick={() => {
                    handlePayment(data?._id);
                  }}
                  className="btn btn-primary"
                >
                  Buy Now
                </button>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
