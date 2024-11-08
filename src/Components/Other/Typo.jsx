import React from "react";

const Typo = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
    <h1 className="mt-8 max-w-sm bg-gradient-to-br from-indigo-200  via-indigo-500 to-indigo-700 bg-clip-text text-center text-4xl font-extrabold text-transparent sm:max-w-4xl sm:text-6xl">
      Build a Smarter Business, Faster!
    </h1>
    
    <span className="mt-8 max-w-4xl text-center text-xl leading-relaxed text-gray-800">
      Optimize your business operations with our powerful, lightweight, and feature-rich solution for product and service management.
    </span>
    
    <p className="mt-6 rounded border px-3 py-1 shadow">
      🎁 <span className="text-indigo-500 font-semibold">$50 off</span> for the first 1,000 customers!
    </p>
    
    <div className="mt-12 w-full max-w-md grid grid-cols-1 gap-4 sm:grid-cols-2">
      <a 
        
        className="flex flex-row items-center justify-center gap-x-2 rounded-lg text-white px-6 py-3 bg-indigo-500 hover:bg-indigo-600 transition duration-300"
      >
        <svg className="h-[30px] text-white" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" strokeWidth="3" fill="none">
          <path d="M14,39.87,24.59,50.51s33-14,31.23-42.29C55.82,8.22,29.64,4.28,14,39.87Z"></path>
          <path d="M44.69,9.09a12.3,12.3,0,0,0,3.48,6.73,12.31,12.31,0,0,0,7,3.52"></path>
          <circle cx="39.46" cy="24.56" r="6.2"></circle>
          <path d="M14.89,37.82l-5.3.68a.27.27,0,0,1-.28-.37l3.93-9a2.65,2.65,0,0,1,1.88-1.53l6.59-1.38"></path>
          <path d="M26.55,49.4l-.69,5.3a.27.27,0,0,0,.37.28l9-3.92a2.69,2.69,0,0,0,1.53-1.89l1.38-6.59"></path>
          <path d="M22.21,48.13c-2.37,7.41-14.1,7.78-14.1,7.78S8,44.51,15.76,41.67"></path>
        </svg>
        Explore Features
      </a>
      <a 
        href="#demo"
        className="flex flex-row items-center justify-center gap-x-2 rounded-lg border border-indigo-500 px-6 py-3 text-indigo-500 hover:bg-indigo-50 transition duration-300"
      >
        Learn More →
      </a>
    </div>
  </div>
  );
};

export default Typo;
