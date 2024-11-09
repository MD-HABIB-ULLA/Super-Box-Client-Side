import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Title from "../Common/Title";
import { FormContext } from "../../Context/CreateWebFormContext";

const CreateWebsiteForm = () => {
  const { setWebInfo, loading } = useContext(FormContext);
 
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedBackgroundColor, setSelectedBackgroundColor] =
    useState("#000000");
  const [selectedSectionTitleColor, setSelectedSectionTitleColor] =
    useState("#000000");
  const [selectedNavColor, setSelectedNavColor] = useState("#000000");
  const [selectedNavFontColor, setSelectedNavFontColor] = useState("#000000");

  const handleBackgroundColorChange = (e) => {
    setSelectedBackgroundColor(e.target.value);
  };

  const handleSectionTitleColorChange = (e) => {
    setSelectedSectionTitleColor(e.target.value);
  };

  const handleNavColorChange = (e) => {
    setSelectedNavColor(e.target.value);
  };

  const handleNavFontColorChange = (e) => {
    setSelectedNavFontColor(e.target.value);
  };

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
          shopName: data.shopName.trim(),
          logo: res.data.data.display_url,
          title: {
            color: selectedSectionTitleColor,
            textSize: data.textSize,
          },
          body: {
            backgroundColor: selectedBackgroundColor,
          },
          navbar: {
            linksPosition: data.linksPosition,
            backgroundColor: selectedNavColor,
            color:selectedNavFontColor,
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
      <form onSubmit={handleSubmit(onSubmit)} className="p-5 rounded-lg">
  {/* Shops Information */}
  <h1 className="text-3xl mt-10">Shops Information:</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b-2 border-dashed pb-10 mb-10">
    {/* Shop Name */}
    <div className="form-control w-full my-6">
      <label className="label">
        <span className="label-text text-lg">Shop Name</span>
      </label>
      <input
        type="text"
        placeholder="Enter a Brand Name"
        {...register("shopName", { required: true })}
        className="input input-bordered"
      />
    </div>
    {/* Shop Logo */}
    <div className="form-control w-full my-6">
      <label className="label">
        <span className="label-text text-lg">Shop Logo</span>
      </label>
      <input
        {...register("logo", { required: true })}
        type="file"
        className="file-input input-bordered"
      />
    </div>
  </div>

  {/* Page Body */}
  <h1 className="text-3xl">Page Body:</h1>
  <div className="border-b-2 grid grid-cols-1 md:grid-cols-3 gap-4 border-dashed pb-10 mb-10">
    {/* Background Color */}
    <div className="form-control w-full my-6">
      <label className="label">
        <span className="label-text text-xl">Background Color</span>
      </label>
      <div className="flex items-center gap-4">
        <input
          {...register("backgroundColor", { required: true })}
          type="color"
          id="backgroundColorPicker"
          value={selectedBackgroundColor}
          onChange={handleBackgroundColorChange}
          className="absolute opacity-0 w-0 h-0"
        />
        <div
          className="w-10 h-10 rounded-full cursor-pointer border"
          style={{ backgroundColor: selectedBackgroundColor }}
          onClick={() =>
            document.getElementById("backgroundColorPicker").click()
          }
        ></div>
        <span>{selectedBackgroundColor}</span>
      </div>
    </div>
    {/* Title Color */}
    <div className="form-control w-full my-6">
      <label className="label">
        <span className="label-text text-lg">Section Title Color</span>
      </label>
      <div className="flex items-center gap-4">
        <input
          {...register("sectionTitleColor", { required: true })}
          type="color"
          id="sectionTitleColorPicker"
          value={selectedSectionTitleColor}
          onChange={handleSectionTitleColorChange}
          className="absolute opacity-0 w-0 h-0"
        />
        <div
          className="w-10 h-10 rounded-full cursor-pointer border"
          style={{ backgroundColor: selectedSectionTitleColor }}
          onClick={() =>
            document.getElementById("sectionTitleColorPicker").click()
          }
        ></div>
        <span>{selectedSectionTitleColor}</span>
      </div>
    </div>
    {/* Section Title Size */}
    <div className="form-control w-full my-6">
      <label className="label">
        <span className="label-text text-lg">Section Title Size (px)</span>
      </label>
      <input
        {...register("textSize", { required: true })}
        type="number"
        placeholder="Enter text size in pixels"
        className="input input-bordered w-full"
        min="8"
        max="72"
      />
    </div>
  </div>

  {/* Navbar Section */}
  <h1 className="text-3xl">Navbar Setup:</h1>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b-2 border-dashed pb-10 mb-10">
    {/* Navbar Color */}
    <div className="form-control w-full my-6">
      <label className="label">
        <span className="label-text text-xl">Navbar Color</span>
      </label>
      <div className="flex items-center gap-4">
        <input
          {...register("navBackground", { required: true })}
          type="color"
          id="navColorPicker "
          value={selectedNavColor}
          onChange={handleNavColorChange}
          className="absolute opacity-0 w-0 h-0"
        />
        <div
          className="w-10 h-10 rounded-full cursor-pointer border"
          style={{ backgroundColor: selectedNavColor }}
          onClick={() =>
            document.getElementById("navColorPicker").click()
          }
        ></div>
        <span>{selectedNavColor}</span>
      </div>
    </div>
    {/* Navbar Font Color */}
    <div className="form-control w-full my-6">
      <label className="label">
        <span className="label-text text-xl">Navbar Font Color</span>
      </label>
      <div className="flex items-center gap-4">
        <input
          {...register("navFontColor", { required: true })}
          type="color"
          id="navFontColorPicker"
          value={selectedNavFontColor}
          onChange={handleNavFontColorChange}
          className="absolute opacity-0 w-0 h-0"
        />
        <div
          className="w-10 h-10 rounded-full cursor-pointer border"
          style={{ backgroundColor: selectedNavFontColor }}
          onClick={() =>
            document.getElementById("navFontColorPicker").click()
          }
        ></div>
        <span>{selectedNavFontColor}</span>
      </div>
    </div>
    {/* Navbar Layout */}
    <div className="form-control w-full my-6">
      <label className="label">
        <span className="label-text text-xl">Navbar Link Position</span>
      </label>
      <select
        defaultValue="default"
        {...register("linksPosition", { required: true })}
        className="select select-bordered"
      >
        <option disabled value="default">
          Select a Layout
        </option>
        <option value="center">Center</option>
        <option value="left">Left</option>
      </select>
    </div>
  </div>

  {/* Banner Section */}
  <h1 className="text-3xl">Banner Setup:</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-b-2 border-dashed pb-8 mb-8">
  {/* Banner Picture */}
  <div className="form-control w-full my-4">
    <label className="label">
      <span className="label-text text-lg">Banner Picture</span>
    </label>
    <input
      {...register("brandBanner", { required: true })}
      type="file"
      className="file-input input-bordered w-full"
    />
  </div>

  {/* Banner Title */}
  <div className="form-control w-full my-4">
    <label className="label">
      <span className="label-text text-lg">Banner Title</span>
    </label>
    <input
      type="text"
      placeholder="Enter your banner title"
      {...register("bannerTitle", { required: true })}
      className="input input-bordered w-full"
    />
  </div>

  {/* Banner Title Position */}
  <div className="form-control w-full my-4">
    <label className="label">
      <span className="label-text text-lg">Banner Title Position</span>
    </label>
    <select
      defaultValue="default"
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
  <div className="form-control w-full col-span-1 md:col-span-2 lg:col-span-3 my-4">
    <label className="label">
      <span className="label-text text-lg">Banner Description</span>
    </label>
    <textarea
      {...register("description", { required: true })}
      placeholder="Enter a Brand Name"
      className="textarea textarea-bordered w-full"
      rows="2"
    ></textarea>
  </div>
</div>


  {/* Shops Contact Information */}
  <h1 className="text-3xl">Shops Contact Information:</h1>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b-2 border-dashed pb-10 mb-10">
    {/* Location */}
    <div className="form-control w-full my-6">
      <label className="label">
        <span className="label-text text-lg">Location</span>
      </label>
      <input
        type="text"
        placeholder="Enter Location"
        {...register("location", { required: true })}
        className="input input-bordered w-full"
      />
    </div>
    {/* Mobile */}
    <div className="form-control w-full my-6">
      <label className="label">
        <span className="label-text text-lg">Mobile</span>
      </label>
      <input
        type="text"
        placeholder="Enter Mobile Number"
        {...register("mobile", { required: true })}
        className="input input-bordered w-full"
      />
    </div>
    {/* Hotline */}
    <div className="form-control w-full my-6">
      <label className="label">
        <span className="label-text text-lg">Hotline</span>
      </label>
      <input
        type="text"
        placeholder="Enter Hotline Number"
        {...register("hotline", { required: true })}
        className="input input-bordered w-full"
      />
    </div>
    {/* Email For Information */}
    <div className="form-control w-full my-6">
      <label className="label">
        <span className="label-text text-lg">Email For Information</span>
      </label>
      <input
        type="text"
        placeholder="Enter Email for Information"
        {...register("infoEmail", { required: true })}
        className="input input-bordered w-full"
      />
    </div>
    {/* Email For Support */}
    <div className="form-control w-full my-6">
      <label className="label">
        <span className="label-text text-lg">Email For Support</span>
      </label>
      <input
        type="text"
        placeholder="Enter Email for Support"
        {...register("supportEmail", { required: true })}
        className="input input-bordered w-full"
      />
    </div>
  </div>

  {/* Social Media Links */}
  <h1 className="text-3xl">Social Media Links:</h1>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b-2 border-dashed pb-10 mb-10">
    {/* Facebook */}
    <div className="form-control w-full my-6">
      <label className="label">
        <span className="label-text text-lg">Facebook</span>
      </label>
      <input
        type="url"
        placeholder="Enter Facebook URL"
        {...register("facebook")}
        className="input input-bordered"
      />
    </div>
    {/* Instagram */}
    <div className="form-control w-full my-6">
      <label className="label">
        <span className="label-text text-lg">Instagram</span>
      </label>
      <input
        type="url"
        placeholder="Enter Instagram URL"
        {...register("instagram")}
        className="input input-bordered"
      />
    </div>
    {/* LinkedIn */}
    <div className="form-control w-full my-6">
      <label className="label">
        <span className="label-text text-lg">LinkedIn</span>
      </label>
      <input
        type="url"
        placeholder="Enter LinkedIn URL"
        {...register("linkedin")}
        className="input input-bordered"
      />
    </div>
    {/* Twitter */}
    <div className="form-control w-full my-6">
      <label className="label">
        <span className="label-text text-lg">Twitter</span>
      </label>
      <input
        type="url"
        placeholder="Enter Twitter URL"
        {...register("twitter")}
        className="input input-bordered"
      />
    </div>
    {/* YouTube */}
    <div className="form-control w-full my-6">
      <label className="label">
        <span className="label-text text-lg">YouTube</span>
      </label>
      <input
        type="url"
        placeholder="Enter YouTube URL"
        {...register("youtube")}
        className="input input-bordered"
      />
    </div>
  </div>

  {/* Submit Button */}
  <div className="flex items-center justify-center">
    <button className="btn btn-outline w-full text-lg">
      {loading ? "Loading..." : "Create Website"}
    </button>
  </div>
</form>
    </div>
  );
};

export default CreateWebsiteForm;
