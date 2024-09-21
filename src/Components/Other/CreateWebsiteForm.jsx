import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Title from "../Common/Title";
import { FormContext } from "../../Context/CreateWebFormContext";

const CreateWebsiteForm = () => {
  const { setWebInfo, loading } = useContext(FormContext);
  console.log(loading);
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (user) {
      console.log(data);
      const imageFiles = { image: data.logo[0] };
      //img upload to imgbb and get an url
      const res = await axiosPublic.post(
        "https://api.imgbb.com/1/upload?key=e9b3cb55e11b48d4142caf366d77cea6",
        imageFiles,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageFiles2 = {
        image: data.brandBanner[0],
      };
      //img upload to imgbb and get an url
      const res2 = await axiosPublic.post(
        "https://api.imgbb.com/1/upload?key=e9b3cb55e11b48d4142caf366d77cea6",
        imageFiles2,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);
      if (res.data?.success && res2.data?.success) {
        const newWebsite = {
          shopName: data.shopName,
          logo: res.data.data.display_url,
          title: {
            color: data.color,
            textSize: data.textSize,
          },
          body: {
            backgroundColor: data.backgroundColor,
          },
          navbar: {
            linksPosition: data.linksPosition,
            backgroundColor: data.navBackground,
            color: data.navTextColor,
          },
          banner: {
            image: res2.data.data.display_url,
            title: data.bannerTitle,
            description: data.description,
            textPosition: data.textPosition,
          },
          contactInfo: {
            location: data.location,
            mobile: data.mobile,
            hotline: data.hotline,
            emailInfo: data.infoEmail,
            emailSupport: data.supportEmail,
          },
          socialLinks: {
            instagram: data.instagram,
            facebook: data.facebook,
            linkedin: data.linkedin,
            twitter: data.twitter,
            youtube: data.youtube,
          },
        };

        setWebInfo(newWebsite);
      }
    } else {
      navigate("/login", { state: location.pathname });
    }
  };
  return (
    <div className="my-10">
      <Title title1={"BY YOUR PREFERENCE"} title2={"CREATE SHOP"}></Title>
      <form onSubmit={handleSubmit(onSubmit)} className=" p-5 rounded-lg ">
        {/* Shops Information */}
        <h1 className="text-3xl mt-10">Shops Information:</h1>
        <div className="grid grid-cols-2 gap-4 border-b-2 border-dashed pb-10 mb-10">
          {/*shop Name */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-lg">Shop Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter a Brand Name"
              {...register("shopName", { required: true })}
              className="input input-bordered "
            />
          </div>
          {/* shop Logo */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-lg">Shop Logo</span>
            </label>

            <input
              {...register("logo", { required: true })}
              type="file"
              className="file-input  input-bordered"
            />
          </div>
        </div>

        {/* Page Body */}
        <h1 className="text-3xl">Page Body:</h1>
        <div className=" border-b-2 grid grid-cols-3 gap-4 border-dashed pb-10 mb-10">
          {/* Background Color */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-xl">Background Color</span>
            </label>
            <input
              {...register("backgroundColor", { required: true })}
              type="color"
              className="file-input  input-bordered w-full"
            />
          </div>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-lg">
                Section title size (px)
              </span>
            </label>
            <input
              {...register("textSize", { required: true })} // Capture the text size
              type="number" // Numeric input for text size
              placeholder="Enter text size in pixels"
              className="input input-bordered w-full"
              min="8" // Minimum text size (optional)
              max="72" // Maximum text size (optional)
            />
          </div>
          {/* title color */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-lg">Section title color</span>
            </label>
            <input
              {...register("color", { required: true })}
              type="color"
              className="file-input  input-bordered w-full"
            />
          </div>
        </div>

        {/* navbar section */}
        <h1 className="text-3xl">Navbar Setup:</h1>
        <div className="grid grid-cols-3 gap-4 border-b-2 border-dashed pb-10 mb-10">
          {/* Navbar Color */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-xl">Navbar Color</span>
            </label>
            <input
              {...register("navBackground", { required: true })}
              type="color"
              className="file-input  input-bordered w-full"
            />
          </div>
          {/* Navbar Layout */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-xl">Navbar link position</span>
            </label>
            <select
              defaultValue="default"
              {...register("linksPosition", { required: true })}
              className="select select-bordered  "
            >
              <option disabled value="default">
                Select a Layout
              </option>
              <option value="default">center</option>
              <option value="default">end</option>
              {/* {
                  guideList?.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)
              } */}
            </select>
          </div>
          {/* Navbar font Color */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-xl">Navbar Font Color</span>
            </label>
            <input
              {...register("navTextColor", { required: true })}
              type="color"
              className="file-input  input-bordered w-full"
            />
          </div>
        </div>

        {/* banner section */}
        <h1 className="text-3xl">Banner Setup:</h1>
        {/* Banner picture */}
        <div className="grid grid-cols-3 gap-4 border-b-2 border-dashed pb-10 mb-10">
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-lg">Banner picture</span>
            </label>

            <input
              {...register("brandBanner", { required: true })}
              type="file"
              className="file-input  input-bordered"
            />
          </div>
          {/* banner title */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-lg">Banner title</span>
            </label>
            <input
              type="text"
              placeholder="Enter your banner title"
              {...register("bannerTitle", { required: true })}
              className="input input-bordered w-full "
            />
          </div>
          {/* banner title position  */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-xl">Navbar link position</span>
            </label>
            <select
              defaultValue="default"
              {...register("textPosition", { required: true })}
              className="select select-bordered  "
            >
              <option disabled value="default">
                Select a Layout
              </option>
              <option value="default">center</option>
              <option value="default">left</option>
            </select>
          </div>
          {/* banner description  */}
          <div className="form-control w-full  col-span-3">
            <label className="label">
              <span className="label-text text-lg">Title </span>
            </label>
            <textarea
              {...register("description", { required: true })} // Keeping the same React Hook Form setup
              placeholder="Enter a Brand Name"
              className="textarea textarea-bordered" // Tailwind class for textarea styling
              rows="4" // Optional: specify rows for height
            ></textarea>
          </div>
        </div>

        {/* Shops Contact Information */}
        <h1 className="text-3xl">Shops Contact Information:</h1>
        <div className="grid grid-cols-3 gap-4 border-b-2 border-dashed pb-10 mb-10">
          {/*Location */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-lg">Location</span>
            </label>
            <input
              type="text"
              placeholder="Enter Tripe Tile"
              {...register("location", { required: true })}
              className="input input-bordered w-full "
            />
          </div>
          {/*Mobile */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-lg">Mobile</span>
            </label>
            <input
              type="text"
              placeholder="Enter Tripe Tile"
              {...register("mobile", { required: true })}
              className="input input-bordered w-full "
            />
          </div>
          {/*Hotline */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-lg">Hotline</span>
            </label>
            <input
              type="text"
              placeholder="Enter Tripe Tile"
              {...register("hotline", { required: true })}
              className="input input-bordered w-full "
            />
          </div>
          {/*Email For Information */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-lg">Email For Information</span>
            </label>
            <input
              type="text"
              placeholder="Enter Tripe Tile"
              {...register("infoEmail", { required: true })}
              className="input input-bordered w-full "
            />
          </div>
          {/*Email For Support */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-lg">Email For Support</span>
            </label>
            <input
              type="text"
              placeholder="Enter Tripe Tile"
              {...register("supportEmail", { required: true })}
              className="input input-bordered w-full "
            />
          </div>
        </div>
        {/* Social media Links */}
        <h1 className="text-3xl">Social media Links:</h1>
        <div className="grid grid-cols-3 gap-4 border-b-2 border-dashed pb-10 mb-10">
          {/*Facebook */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-lg">Facebook</span>
            </label>
            <input
              type="url"
              placeholder="Enter Tripe Tile"
              {...register("facebook", { required: true })}
              className="input input-bordered  "
            />
          </div>
          {/*Instagram */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-lg">Instagram</span>
            </label>
            <input
              type="url"
              placeholder="Enter Tripe Tile"
              {...register("instagram", { required: true })}
              className="input input-bordered  "
            />
          </div>
          {/*Linkedin */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-lg">Linkedin</span>
            </label>
            <input
              type="url"
              placeholder="Enter Tripe Tile"
              {...register("linkedin", { required: true })}
              className="input input-bordered "
            />
          </div>
          {/*Twitter */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-lg">Twitter</span>
            </label>
            <input
              type="url"
              placeholder="Enter Tripe Tile"
              {...register("twitter", { required: true })}
              className="input input-bordered  "
            />
          </div>
          {/*YouTube */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-lg">YouTube</span>
            </label>
            <input
              type="url"
              placeholder="Enter Tripe Tile"
              {...register("youtube", { required: true })}
              className="input input-bordered   "
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <button className="btn btn-outline w-full text-lg ">
            {loading ? "loading..." : "Create Website"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateWebsiteForm;
