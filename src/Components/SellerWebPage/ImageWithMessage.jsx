import React from "react";

const ImageWithMessage = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="relative rounded-lg overflow-hidden shadow-xl">
        <img
          src={data.imageUrl}
          alt="Featured image"
          className="w-full h-auto"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-6">
          <h2 className="text-3xl font-bold mb-4 text-center">{data.title}</h2>
          <p className="text-lg text-center leading-relaxed max-w-2xl">
            {data.message}
          </p>
        
        </div>
      </div>
    </div>
  );
};

export default ImageWithMessage;
