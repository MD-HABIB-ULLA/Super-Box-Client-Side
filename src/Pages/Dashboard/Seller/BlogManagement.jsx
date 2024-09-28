import { useContext } from "react";
import Title from "../../../Components/Common/Title";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { MdAddCircle } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

const BlogManagement = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const {
    data: blogs,
    isLoading: blogsLoading,
    refetch,
  } = useQuery({
    queryKey: [user.email, "blogs"],
    queryFn: async () => {
      if (user.email) {
        const res = await axiosPublic.get(`/blogs/${user.email}`);
        return res.data;
      }
      return null;
    },
    enabled: !!user.email,
  });
  console.log(blogs);
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    // Replace with your imgbb API key
    const imgbbAPIKey = "e9b3cb55e11b48d4142caf366d77cea6";

    try {
      const response = await axiosPublic.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        formData
      );
      return response.data.data.url; // Return the uploaded image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const onSubmit = async (data) => {
    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    let image = null;

    // Check if a new image has been uploaded
    if (data.image && data.image[0]) {
      const imageFile = data.image[0];
      console.log(imageFile);

      image = await handleImageUpload(imageFile);

      if (!image) {
        alert("Image upload failed. Please try again.");
        return;
      }
    }

    // Combine form data with user email and today's date
    const blogData = {
      description: data.description,
      image,
      email: user.email, // Automatically set the user's email
      upload_date: today, // Automatically set today's date
    };
    console.log(blogData);
    // Post form data to your backend
    axiosPublic
      .post("/addBlog", blogData)
      .then((res) => {
        document.getElementById("my_modal_add_blog").close();
        reset();
        refetch();
        toast.success("Blog added successfully!");
      })
      .catch((error) => {
        toast.error("Failed to add blog");
      });
  };

  const handleDelete = (id) => {
    console.log(id);
    axiosPublic.delete(`deleteBlog/${id}`).then((res) => {
      console.log(res);
      refetch();
    });
  };

  return (
    <div>
      <div className="py-10  ">
        <Title title1={"Blogs"} title2={"Blogs Management"}></Title>
      </div>
      <div>
        <div className="flex justify-end border-dashed border-b border-black py-2">
          <button
            onClick={() => {
              document.getElementById("my_modal_add_blog").showModal();
            }}
            className="flex flex-row items-center gap-1 justify-end text-2xl mt-5 mr-5 "
          >
            <MdAddCircle className="text-green-500 text-3xl" />
            Add Blogs
          </button>
        </div>
        <div>
          <div>
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold mb-8 text-center">
                Latest Blog Posts
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs?.map((blog, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-lg overflow-hidden mb-6 group relative "
                  >
                    <FaTrash
                      onClick={() => handleDelete(blog._id)}
                      className="bg-red-500 absolute right-0 cursor-pointer  box-content text-white p-2 rounded-full group-hover:block hidden"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                      <p className="text-sm text-gray-500 mb-4">
                        {blog.upload_date}
                      </p>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-40 object-cover mb-4 rounded"
                      />
                      <p className="text-sm text-gray-600 mb-4">
                        {blog.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        Posted by: {blog.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <dialog id="my_modal_add_blog" className="modal ">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>

              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Image URL */}
                <div className="mb-4">
                  <label className="block text-gray-700">Image </label>
                  <input
                    {...register("image")}
                    type="file"
                    className="file-input  input-bordered file-input-info w-full"
                  />
                  {errors.image && (
                    <span className="text-red-500">{errors.image.message}</span>
                  )}
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="block text-gray-700">Description</label>
                  <textarea
                    {...register("description", {
                      required: "Description is required",
                    })}
                    className="textarea textarea-bordered w-full"
                    placeholder="Enter blog description"
                  ></textarea>
                  {errors.description && (
                    <span className="text-red-500">
                      {errors.description.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-full">
                  Submit Blog
                </button>
              </form>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default BlogManagement;
