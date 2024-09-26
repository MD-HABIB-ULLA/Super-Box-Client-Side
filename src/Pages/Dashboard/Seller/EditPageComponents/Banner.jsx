import { useForm } from "react-hook-form";
import { WebDataDisContext } from "../../../../Context/WebDataDisContext";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

const Banner = () => {
  const { register, handleSubmit, reset } = useForm();
  const { data, isPending ,refetch} = useContext(WebDataDisContext);
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false)

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
  const onSubmit = async (formData) => {
    console.log(formData)
    setLoading(true);

    // Handle image upload if a new image is selected
    let uploadedImageUrl = data.webInfo.banner.image; // Default to existing image
    if (formData.image[0]) {
      const imageFile = formData.image[0];
      console.log(imageFile)
      uploadedImageUrl = await handleImageUpload(imageFile);
    }

    if (!uploadedImageUrl) {
      alert("Image upload failed. Please try again.");
      setLoading(false);
      return;
    }

    // Prepare banner object
    const bannerData = {
      image: uploadedImageUrl,
      title: formData.title,
      description: formData.description,
      textPosition: formData.textPosition,
    };
    console.log(bannerData);
    // Call your API to submit the banner data
    try {
      await axiosPublic.put(`/webData/${user.email}`, { banner: bannerData });
      toast.success("Banner updated successfully!")
      document.getElementById("my_modal_banner").close()
      refetch()
    } catch (error) {
      console.error("Error updating banner:", error);
      alert("Error updating banner.");
    }

    setLoading(false);
  };

  return (
    <div className="mt-10 relative group rounded-lg hover:border-blue-500 border-transparent border-[4px]  ">
      <div className="absolute top-0 group-hover:block hidden">
        <FaEdit
          onClick={() => document.getElementById("my_modal_banner").showModal()}
          className="text-2xl box-content text-black cursor-pointer bg-blue-500 px-2 py-1"
        ></FaEdit>
      </div>
      <div
        className="hero min-h-screen rounded-lg"
        style={{
          backgroundImage: `url(${data.webInfo.banner.image})`,
        }}
      >
        <div className="hero-overlay bg-black bg-opacity-60 rounded-lg"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-lg">
            <h1 className="mb-5 text-5xl font-bold">
              {data.webInfo.banner.title}
            </h1>
            <p className="mb-5">{data.webInfo.banner.description}</p>
            <Link>
              <button className="btn bg-sky-400 text-white font-bold rounded-full  border-none">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
      <dialog id="my_modal_banner" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h1 className="text-3xl">Banner Setup:</h1>
          {/* Banner picture */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2  gap-4">
              {/* Banner Picture Preview and Upload */}
              <div className="form-control w-full my-6 col-span-1 row-span-3">
                <label className="label">
                  <span className="label-text text-lg">Banner Picture</span>
                </label>

                <img
                  src={data.webInfo.banner.image}
                  alt="Banner preview"
                  className="w-full h-48 object-cover rounded-md mb-2"
                />

                {/* File Input */}
                <input
                  {...register("image")}
                  type="file"
                  accept="image/*"
                  //   defaultValue={data.webInfo.banner.image}
                  className="file-input input-bordered w-full"
                />
              </div>

              <div>
                {/* Banner Title */}
                <div className="form-control w-full my-6">
                  <label className="label">
                    <span className="label-text text-lg">Banner Title</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={data.webInfo.banner.title || ""}
                    placeholder="Enter your banner title"
                    {...register("title", { required: true })}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Banner Title Position */}
                <div className="form-control w-full  ">
                  <label className="label">
                    <span className="label-text text-lg">
                      Banner Title Position
                    </span>
                  </label>
                  <select
                    defaultValue={data.webInfo.banner.textPosition || "default"}
                    {...register("textPosition", { required: true })}
                    className="select select-bordered w-full"
                  >
                    <option disabled value="default">
                      Select a Layout
                    </option>
                    <option value="center">Center</option>
                    <option value="left">Left</option>
                  </select>
                </div>

                {/* Banner Description */}
                <div className="form-control w-full  ">
                  <label className="label">
                    <span className="label-text text-lg">
                      Banner Description
                    </span>
                  </label>
                  <textarea
                    defaultValue={data.webInfo.banner.description || ""}
                    {...register("description", { required: true })}
                    placeholder="Enter banner description"
                    className="textarea textarea-bordered"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="text-center py-5">
              <button
                type="submit"
                className="btn bg-blue-500 text-white font-bold"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Banner;
