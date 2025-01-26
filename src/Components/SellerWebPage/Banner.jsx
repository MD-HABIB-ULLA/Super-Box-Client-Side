import { Link, useParams } from "react-router-dom";

export default function Banner({ image, title, description, textPosition = "center" }) {
  const { name } = useParams();

  return (
    <div
      className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content container */}
      <div
        className={`relative h-full flex items-center justify-center px-4 sm:px-8 lg:px-16 text-white ${
          textPosition === "left" ? "items-start" : textPosition === "right" ? "items-end" : "items-center"
        }`}
      >
        <div
          className={`max-w-3xl ${
            textPosition === "left" ? "text-left" : textPosition === "right" ? "text-right" : "text-center"
          }`}
        >
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 uppercase">
            {title}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl mb-8">
            {description}
          </p>

          {/* Call-to-action button */}
          <Link to={`/w/${name}/products`}>
            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
