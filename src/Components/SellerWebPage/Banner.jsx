import { Link, useParams } from "react-router-dom";

const Banner = ({ image, title, description }) => {
    const { name } = useParams();
  console.log(image);
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="hero-overlay bg-black bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-lg">
            <h1 className="mb-5 text-5xl font-bold">{title}</h1>
            <p className="mb-5">{description}</p>
            <Link to={`/w/${name}/products`}>
              <button className="btn bg-sky-400 text-white font-bold rounded-full  border-none">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
