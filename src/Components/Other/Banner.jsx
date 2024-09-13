import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div>
      <div
        className="hero min-h-[70vh] bg-base-200"
        style={{
          backgroundImage:
            "url(https://www.agilitypr.com/wp-content/uploads/2020/02/technology-1-1.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-30"></div>
        <div className="hero-content flex-col lg:flex-row text-neutral-content">
          {/* <img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" /> */}
          <div className="max-w-[70%] mr-auto">
            <h1 className="text-5xl font-bold">Super Box</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className=" border-2 py-2 px-5 rounded-3xl text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700">
              <Link to={"/sign-up"}>Create Now!</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
