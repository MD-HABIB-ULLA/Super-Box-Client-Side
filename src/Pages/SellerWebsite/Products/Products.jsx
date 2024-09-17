import { useContext } from "react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import Title from "../../../Components/Common/Title";

const Products = () => {
  const { products } = useContext(WebDataDisContext);

  return (
    <div className="px-10">
      <div className="py-10">
        <Title title1={"Choose your products"} title2={"Products"}></Title>
      </div>
      <div>
        <div className="mt-10">
          <div className="grid grid-cols-3 gap-3">
            {products?.map((product) => (
              <div key={product._id} className="card bg-base-100 shadow-xl">
                <figure>
                  <img src={product.image} alt={product.name} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{product.name}</h2>
                  <p>{product.description}</p>
                  <div className="card-actions justify-between items-center">
                    <span className="text-lg font-bold">${product.price}</span>
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
