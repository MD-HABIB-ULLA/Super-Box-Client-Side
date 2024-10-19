import React, { useContext } from "react"
import { WebDataDisContext } from "../../../Context/WebDataDisContext"
import BlogCard from "../../../Components/SellerWebPage/BlogCard"

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
           <BlogCard key={index} blog={blog}/>
          ))}
        </div>
      </div>
    </div>
  )
}