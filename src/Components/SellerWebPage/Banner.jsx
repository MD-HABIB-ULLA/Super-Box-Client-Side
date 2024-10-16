import { Link, useParams } from "react-router-dom"

export default function Banner({ image, title, description, textPosition = "center" }) {
  const { name } = useParams()

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      <div className={`relative h-full flex items-center ${
        textPosition === "left" ? "justify-start" : 
        textPosition === "right" ? "justify-end" : "justify-center"
      }`}>
        <div className={`max-w-3xl mx-4 md:mx-8 lg:mx-16 text-white ${
          textPosition === "left" ? "text-left" : 
          textPosition === "right" ? "text-right" : "text-center"
        }`}>
          <h1 className="mb-6 uppercase text-3xl md:text-5xl lg:text-5xl font-bold leading-tight">
            {title}
          </h1>
          <p className="mb-8 text-lg md:text-xl ">
            {description}
          </p>
          <Link to={`/w/${name}/products`}>
            <button className="px-8 py-3 bg-indigo-700 hover:bg-sky-500 text-white font-bold rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}