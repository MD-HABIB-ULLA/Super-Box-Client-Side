import { useContext, useState } from "react";
import { WebDataDisContext } from "../../../../Context/WebDataDisContext";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { Link, NavLink } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";

const Navbar = () => {
  const { register, handleSubmit, reset } = useForm();
  const { data, isPending, refetch } = useContext(WebDataDisContext);
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
    data.webInfo.body.backgroundColor
  );
  const [selectedNavColor, setSelectedNavColor] = useState(
    data.webInfo.navbar.backgroundColor
  );
  const [selectedNavFontColor, setSelectedNavFontColor] = useState(
    data.webInfo.navbar.color
  );
  const [logoPreview, setLogoPreview] = useState(data.webInfo.logo);

  const handleBackgroundColorChange = (e) => {
    setSelectedBackgroundColor(e.target.value);
  };
  const handleNavColorChange = (e) => {
    setSelectedNavColor(e.target.value);
  };

  const handleNavFontColorChange = (e) => {
    setSelectedNavFontColor(e.target.value);
  };

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
    setLoading(true);
    console.log(formData);

    let uploadedImageUrl = data.webInfo.logo; // Default to existing image URL

    if (formData.logo && formData.logo[0]) {
      const imageFile = formData.logo[0]; // Use formData.logo instead of formData.image
      console.log(imageFile);
      uploadedImageUrl = await handleImageUpload(imageFile); // Upload the new image
    }

    if (!uploadedImageUrl) {
      alert("Image upload failed. Please try again.");
      setLoading(false);
      return;
    }

    // Prepare banner object with the uploaded image URL
    const updatedData = {
      logo: uploadedImageUrl,
      navbar: {
        linksPosition: formData.linksPosition,
        backgroundColor: selectedNavColor,
        color: selectedNavFontColor,
      },
      body: {
        backgroundColor: selectedBackgroundColor,
      },
    };

    try {
      await axiosPublic.put(`/webData/${user.email}`,  updatedData );
      toast.success("navbar updated successfully!");
      document.getElementById("my_modal_navbar").close();
      refetch();
    } catch (error) {
      console.error("Error updating banner:", error);
      alert("Error updating banner.");
    }

    setLoading(false);
  };

  const list = (
    <>
      <NavLink
        end
        className={({ isActive }) =>
          `text-base font-bold px-6 py-2 w-full flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 duration-500 hover:text-gray-700 dark:hover:text-gray-200 uppercase ${
            isActive
              ? "inter text-[#646668] border-x-0 rounded-none border-t-0 bg-transparent"
              : "md:text-white text-white"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `text-base font-bold px-6 py-2  w-full flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 duration-500 hover:text-gray-700 dark:hover:text-gray-200 uppercase text-nowrap ${
            isActive
              ? "inter text-[#646668] border-x-0 rounded-none border-t-0 bg-transparent"
              : "md:text-white text-white"
          }`
        }
      >
        Products
      </NavLink>

      {/* Link for login under SellerWebsite */}
      <NavLink
        className={({ isActive }) =>
          `text-base font-bold px-6 py-2  w-full flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 duration-500 hover:text-gray-700 dark:hover:text-gray-200 uppercase ${
            isActive
              ? "inter text-[#646668] border-x-0 rounded-none border-t-0 bg-transparent"
              : "md:text-white text-white"
          }`
        }
      >
        blogs
      </NavLink>
    </>
  );
  return (
    <div className=" relative group  hover:border-blue-500 border-transparent border-[4px]">
      <div className="absolute top-0 group-hover:block hidden">
        <FaEdit
          onClick={() => document.getElementById("my_modal_navbar").showModal()}
          className="text-2xl box-content text-black cursor-pointer bg-blue-500 px-2 py-1"
        ></FaEdit>
      </div>
      <nav
        style={{ backgroundColor: `${data.webInfo.navbar.backgroundColor}` }}
        className={`h-16 `}
      >
        <div className="flex py-2 px-5 h-full">
          <div className=" h-full flex gap-2 items-center">
            <img src={data.webInfo.logo} className="h-full" alt="" />
            <h1 className="text-2xl text-white font-bold  capitalize">
              {data.webInfo.navbar.shopName}
            </h1>
          </div>
          <div
            className={`flex-1 flex  justify-${data.webInfo.navbar.linksPosition}`}
          >
            <ul className="flex gap-2 h-full items-center "> {list}</ul>
          </div>
          <div
            className=" h-full flex items-center
         "
          >
            <Link className=" text-white text-sm bg-black rounded-full px-3 py-2  font-semibold">
              Log in
            </Link>
          </div>
        </div>

        <dialog id="my_modal_navbar" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <h1 className="text-3xl">Body and navbar Setup:</h1>
            {/* navbar data  */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2">
                {/* Background Color */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-xl">Background Color</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      {...register("backgroundColor")}
                      type="color"
                      id="backgroundColorPicker"
                      value={selectedBackgroundColor}
                      onChange={handleBackgroundColorChange}
                      className="absolute opacity-0 w-0 h-0"
                    />
                    <div
                      className="w-10 h-10 rounded-full cursor-pointer"
                      style={{ backgroundColor: selectedBackgroundColor }}
                      onClick={() =>
                        document.getElementById("backgroundColorPicker").click()
                      }
                    ></div>
                    <span>{selectedBackgroundColor}</span>
                  </div>
                </div>

                {/* Shop Logo with Preview */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-lg">Shop Logo</span>
                  </label>
                  {logoPreview && (
                    <div className="mb-4">
                      <img
                        src={logoPreview}
                        alt="Logo Preview"
                        className="w-32 h-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                  <input
                    {...register("logo")}
                    type="file"
                    accept="image/*"
                    className="file-input input-bordered w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {/* Navbar Background Color */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-xl">
                      Navbar Background Color
                    </span>
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      {...register("navBackground")}
                      type="color"
                      id="navColorPicker"
                      value={selectedNavColor}
                      onChange={handleNavColorChange}
                      className="absolute opacity-0 w-0 h-0"
                    />
                    <div
                      className="w-10 h-10 rounded-full cursor-pointer"
                      style={{ backgroundColor: selectedNavColor }}
                      onClick={() =>
                        document.getElementById("navColorPicker").click()
                      }
                    ></div>
                    <span>{selectedNavColor}</span>
                  </div>
                </div>

                {/* Navbar Font Color */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-xl">
                      Navbar Font Color
                    </span>
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      {...register("navFontColor")}
                      type="color"
                      id="navFontColorPicker"
                      value={selectedNavFontColor}
                      onChange={handleNavFontColorChange}
                      className="absolute opacity-0 w-0 h-0"
                    />
                    <div
                      className="w-10 h-10 rounded-full cursor-pointer"
                      style={{ backgroundColor: selectedNavFontColor }}
                      onClick={() =>
                        document.getElementById("navFontColorPicker").click()
                      }
                    ></div>
                    <span>{selectedNavFontColor}</span>
                  </div>
                </div>

                {/* Navbar Layout */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-xl">
                      Navbar Link Position
                    </span>
                  </label>
                  <select
                    defaultValue={data.webInfo.navbar.linksPosition}
                    {...register("linksPosition")}
                    className="select select-bordered w-full"
                  >
                    <option disabled value="default">
                      Select a Layout
                    </option>
                    <option value="center">Center</option>
                    <option value="left">Left</option>
                  </select>
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
      </nav>
    </div>
  );
};

export default Navbar;
