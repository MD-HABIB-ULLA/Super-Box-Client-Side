import { useEffect, useState } from "react";
import { TbNumber0Small } from "react-icons/tb";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Calendar, Mail, Share2 } from 'lucide-react'
const BlogDetails = () => {
  const axiosPublic = useAxiosPublic();
  const [blogData, setBlogData] = useState(TbNumber0Small);
  const { id } = useParams();

  console.log(blogData);
  useEffect(() => {
    axiosPublic
      .get(`/blog/${id}`)
      .then((res) => setBlogData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {blogData.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{blogData.upload_date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a
                href={`mailto:${blogData.email}`}
                className="text-sm hover:text-blue-600 transition-colors"
              >
                {blogData.email}
              </a>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-8 shadow-lg">
          <img
            src={blogData.image}
            alt={blogData.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "/api/placeholder/800/400";
              e.target.alt = "Placeholder image";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed">{blogData.description}</p>
        </div>

        {/* Share Section */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-700">
                Share this post:
              </span>
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() =>
                  navigator.clipboard.writeText(window.location.href)
                }
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     transition-colors flex items-center gap-2"
              onClick={() => (window.location.href = `mailto:${blogData.email}`)}
            >
              <Mail className="w-4 h-4" />
              Contact Author
            </button>
          </div>
        </div>

    
      </article>
    </div>
  );
};

export default BlogDetails;
