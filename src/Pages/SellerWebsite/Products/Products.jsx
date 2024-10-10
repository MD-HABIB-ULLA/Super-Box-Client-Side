import { useContext } from "react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import Title from "../../../Components/Common/Title";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";

const Products = () => {
  const { products, addWebCartItem, name } = useContext(WebDataDisContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleAddToCart = (id) => {
    if (!user) {
      navigate(`/w/${name}/login`);
    }
    addWebCartItem(id);
  };

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
                <figure className="h-[300px]">
                  <img
                    className="h-full"
                    src={product.image}
                    alt={product.name}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{product.name}</h2>
                  <p>{product.description}</p>
                  <div className="card-actions justify-between items-center">
                    <span className="text-lg font-bold">${product.price}</span>
                    <div>
                      <button
                        onClick={() => handleAddToCart(product._id)}
                        className="btn- btn"
                      >
                        Add to cart{" "}
                      </button>
                      <Link to={`${product._id}`}>
                        <button className="btn btn-primary">Buy Now</button>
                      </Link>
                    </div>
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
