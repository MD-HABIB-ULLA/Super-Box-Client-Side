import React from "react";
import { Link, useParams } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { name } = useParams();
  console.log(name);
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
      <div className="relative pb-48 overflow-hidden">
        <img
          className="absolute inset-0 h-full w-full object-cover transform hover:scale-105 transition-transform duration-300  bg-top"
          src={blog.image}
          alt={blog.title}
        />
      </div>
      <div className="p-6">
        <div className="text-lg font-semibold text-indigo-500 mb-2">
          {new Date(blog.upload_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
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
        <Link to={`/w/${name}/blog/${blog._id}`} className="text-indigo-500 hover:text-indigo-600 font-semibold transition-colors duration-300">
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
