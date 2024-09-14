import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Title from "../Common/Title";

const CreateWebsiteForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    if (user) {
      console.log(data);
      const imageFiles = { image: data.brandLogo[0] };
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
          brand_name: data.brandName,
          brand_logo: [res.data.data.display_url],
          brand_banner: [res2.data.data.display_url],
          nav_color: data.navColor,
          nav_layout: data.navLayout,
          nav_font_color: data.navFontColor,
          nav_font_size: data.navFontSize,
          bg_color: data.bgColor,
          sec_title_color: data.secTitleColor,
          sec_title_font_size: data.secTitleFontSize,
          location: data.location,
          mobile: data.mobile,
          hotline: data.hotline,
          infoEmail: data.infoEmail,
          supportEmail: data.supportEmail,
          facebookUrl: data.facebookUrl,
          instagramUrl: data.instagramUrl,
          linkedinUrl: data.linkedinUrl,
          twitterUrl: data.twitterUrl,
          youtubeUrl: data.youtubeUrl,
        };

        console.log(newWebsite);
        reset();
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

        <div className="grid grid-cols-3 gap-4 border-b-2 border-dashed pb-10 mb-10">
          {/*Brand Name */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-lg">Brand Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter a Brand Name"
              {...register("brandName", { required: true })}
              className="input input-bordered "
            />
          </div>
          {/* Brand Logo */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-lg">Brand Logo</span>
            </label>

            <input
              {...register("brandLogo", { required: true })}
              type="file"
              className="file-input  input-bordered"
            />
          </div>
          {/* Banner picture */}
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
        </div>

        {/* Navbar Setup: */}
        <h1 className="text-3xl">Navbar Setup:</h1>
        <div className="grid grid-cols-3 gap-4 border-b-2 border-dashed pb-10 mb-10">
          {/* Navbar Color */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-xl">Navbar Color</span>
            </label>
            <select
              defaultValue="default"
              {...register("navColor", { required: true })}
              className="select select-bordered  "
            >
              <option disabled value="default">
                Select a guide
              </option>
              <option value="default">Select a guide</option>
              <option value="default">Select a guide</option>
              {/* {
                  guideList?.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)
              } */}
            </select>
          </div>
          {/* Navbar Layout */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-xl">Navbar Layout</span>
            </label>
            <select
              defaultValue="default"
              {...register("navLayout", { required: true })}
              className="select select-bordered  "
            >
              <option disabled value="default">
                Select a Layout
              </option>
              <option value="default">Select a guide</option>
              <option value="default">Select a guide</option>
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
            <select
              defaultValue="default"
              {...register("navFontColor", { required: true })}
              className="select select-bordered "
            >
              <option disabled value="default">
                Select Font Color
              </option>
              <option value="default">Select a guide</option>
              <option value="default">Select a guide</option>
              {/* {
                  guideList?.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)
              } */}
            </select>
          </div>
          {/* Navbar Font Size */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-xl">Navbar Font Size</span>
            </label>
            <select
              defaultValue="default"
              {...register("navFontSize", { required: true })}
              className="select select-bordered "
            >
              <option disabled value="default">
                Select Font Size
              </option>
              <option value="default">Select a guide</option>
              <option value="default">Select a guide</option>
              {/* {
                  guideList?.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)
              } */}
            </select>
          </div>
        </div>
        {/* Page Body */}
        <h1 className="text-3xl">Page Body:</h1>
        <div className="grid grid-cols-3 gap-4 border-b-2 border-dashed pb-10 mb-10">
          {/* Background Color */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-xl">Background Color</span>
            </label>
            <select
              defaultValue="default"
              {...register("bgColor", { required: true })}
              className="select select-bordered  "
            >
              <option disabled value="default">
                Select a color
              </option>
              <option value="default">Select a guide</option>
              <option value="default">Select a guide</option>
              {/* {
                  guideList?.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)
              } */}
            </select>
          </div>
          {/* Sections Title Color */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-xl">Sections Title Color</span>
            </label>
            <select
              defaultValue="default"
              {...register("secTitleColor", { required: true })}
              className="select select-bordered  "
            >
              <option disabled value="default">
                Select a color
              </option>
              <option value="default">Select a guide</option>
              <option value="default">Select a guide</option>
              {/* {
                  guideList?.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)
              } */}
            </select>
          </div>
          {/* Sections Title Font Size*/}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-xl">
                Sections Title Font Size
              </span>
            </label>
            <select
              defaultValue="default"
              {...register("secTitleFontSize", { required: true })}
              className="select select-bordered  "
            >
              <option disabled value="default">
                Select a Font Size
              </option>
              <option value="default">Select a guide</option>
              <option value="default">Select a guide</option>
              {/* {
                  guideList?.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)
              } */}
            </select>
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
              {...register("facebookUrl", { required: true })}
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
              {...register("instagramUrl", { required: true })}
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
              {...register("linkedinUrl", { required: true })}
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
              {...register("twitterUrl", { required: true })}
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
              {...register("youtubeUrl", { required: true })}
              className="input input-bordered   "
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <button className="btn btn-outline w-full text-lg ">
            Create Website
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateWebsiteForm;
