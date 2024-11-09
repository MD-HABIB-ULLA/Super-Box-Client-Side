import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { singleProductData } = useContext(WebDataDisContext);
  const { data } = singleProductData(id);
  console.log(data);

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
                <Link>
                  <button className="btn btn-primary">Buy Now</button>
                </Link>
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
