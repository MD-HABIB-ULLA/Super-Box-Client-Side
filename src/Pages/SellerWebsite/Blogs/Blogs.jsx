import React, { useContext } from "react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import Title from "../../../Components/Common/Title";

const Blogs = () => {
  const { blogs } = useContext(WebDataDisContext);
  console.log(blogs);
  return (
    <div>
      <div className="mt-10 max-w-7xl px-10 m-auto min-h-screen">
        <div className="py-10">
          <Title title2={"BLOGS"}></Title>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs?.map((blog, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden mb-6 group relative "
            >
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                <p className="text-sm text-gray-500 mb-4">{blog.upload_date}</p>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover mb-4 rounded"
                />
                <p className="text-sm text-gray-600 mb-4">{blog.description}</p>
                <p className="text-xs text-gray-500">Posted by: {blog.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
