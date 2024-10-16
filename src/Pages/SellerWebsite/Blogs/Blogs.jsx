import React, { useContext } from "react"
import { WebDataDisContext } from "../../../Context/WebDataDisContext"

const Title = ({ children }) => (
  <h1 className="text-4xl font-extrabold text-center text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
    {children}
  </h1>
)

export default function Blogs() {
  const { blogs } = useContext(WebDataDisContext)

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Title>Our Blogs</Title>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Discover our latest thoughts, ideas, and insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1"
            >
              <div className="relative pb-48 overflow-hidden">
                <img
                  className="absolute inset-0 h-full w-full object-cover transform hover:scale-105 transition-transform duration-300  bg-top"
                  src={blog.image}
                  alt={blog.title}
                />
              </div>
              <div className="p-6">
                <div className="text-lg font-semibold text-indigo-500 mb-2">
                  {new Date(blog.upload_date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-indigo-600 transition-colors duration-300">
                  {blog.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                  {blog.description}
                </p>
                <div className="flex items-center">
                  <div className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-600">Posted by: </span>
                    {blog.email}
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <button className="text-indigo-500 hover:text-indigo-600 font-semibold transition-colors duration-300">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}