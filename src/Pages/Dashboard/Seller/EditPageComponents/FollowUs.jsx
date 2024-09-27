import { useForm } from "react-hook-form";
import { WebDataDisContext } from "../../../../Context/WebDataDisContext";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { useContext, useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import facebookIcon from "/facebook.png";
import instagramIcon from "/instagram.png";
import linkedinIcon from "/linkedin.png";
import twitterIcon from "/twitter.png";
import youTubeIcon from "/youtube.png";

import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import Title from "../../../../Components/Common/Title";
import toast from "react-hot-toast";

const FollowUs = () => {
  const { register, handleSubmit, reset } = useForm();
  const { data, isPending, refetch } = useContext(WebDataDisContext);
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  console.log(data)
  const onSubmit = async (formData) => {
    console.log(formData);
    try {
      await axiosPublic.put(`/webData/${user.email}`, {
        socialLinks: formData,
      });
      toast.success("navbar updated successfully!");
      document.getElementById("my_modal_followUs").close();
      refetch();
    } catch (error) {
      console.error("Error updating banner:", error);
      alert("Error updating banner.");
    }
  };
  return (
    <>
      <div className=" relative group  hover:border-blue-500 border-transparent border-[4px]">
        <div className="absolute top-0 group-hover:block hidden">
          <FaEdit
            onClick={() =>
              document.getElementById("my_modal_followUs").showModal()
            }
            className="text-2xl box-content text-black cursor-pointer bg-blue-500 px-2 py-1"
          ></FaEdit>
        </div>
        <div className="mb-10 mt-20">
          <Title title1={"you can also"} title2={"follow us"}></Title>
          <div className=" flex flex-row items-center justify-center gap-10 mt-10">
            <Link to={data.webInfo.socialLinks.facebook}>
              {" "}
              <img className=" w-12" src={facebookIcon} alt="" />
            </Link>
            <Link to={data.webInfo.socialLinks.facebook}>
              {" "}
              <img className=" w-12" src={instagramIcon} alt="" />
            </Link>
            <Link to={data.webInfo.socialLinks.linkedin}>
              {" "}
              <img className=" w-12" src={linkedinIcon} alt="" />
            </Link>
            <Link to={data.webInfo.socialLinks.twitter}>
              {" "}
              <img className=" w-12" src={twitterIcon} alt="" />
            </Link>
            <Link to={data.webInfo.socialLinks.youtube}>
              {" "}
              <img className=" w-12" src={youTubeIcon} alt="" />
            </Link>
          </div>
        </div>
        <dialog id="my_modal_followUs" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <h1 className="text-3xl capitalize">Contact information Setup:</h1>
            {/* Banner picture */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-3 gap-4 ">
                {/*Facebook */}
                <div className="form-control w-full my-6">
                  <label className="label">
                    <span className="label-text text-lg">Facebook</span>
                  </label>
                  <input
                    type="url"
                    defaultValue={data.webInfo.socialLinks.facebook}
                    placeholder="Enter Tripe Tile"
                    {...register("facebook")}
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
                    defaultValue={data.webInfo.socialLinks.instagram}
                    {...register("instagram")}
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
                    defaultValue={data.webInfo.socialLinks.linkedin}
                    {...register("linkedin")}
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
                    {...register("twitter")}
                    defaultValue={data.webInfo.socialLinks.twitter}
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
                    defaultValue={data.webInfo.socialLinks.youtube}
                    {...register("youtube")}
                    className="input input-bordered   "
                  />
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
    </>
  );
};

export default FollowUs;
