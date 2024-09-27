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

const FollowUs = () => {
  const { register, handleSubmit, reset } = useForm();
  const { data, isPending, refetch } = useContext(WebDataDisContext);
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className=" relative group  hover:border-blue-500 border-transparent border-[4px]">
        <div className="absolute top-0 group-hover:block hidden">
          <FaEdit
            onClick={() =>
              document.getElementById("my_modal_navbar").showModal()
            }
            className="text-2xl box-content text-black cursor-pointer bg-blue-500 px-2 py-1"
          ></FaEdit>
        </div>
        <div className="mb-10 mt-20">
          <Title title1={"you can also"} title2={"follow us"}></Title>
          <div className=" flex flex-row items-center justify-center gap-10 mt-10">
            <Link to={data.webInfo.socialLinks.facebook}>
              {" "}
              <img
                className=" w-12"
                src={facebookIcon}
                alt=""
              />
            </Link>
            <Link to={data.webInfo.socialLinks.facebook}>
              {" "}
              <img
                className=" w-12"
                src={instagramIcon}
                alt=""
              />
            </Link>
            <Link to={data.webInfo.socialLinks.linkedin}>
              {" "}
              <img
                className=" w-12"
                src={linkedinIcon}
                alt=""
              />
            </Link>
            <Link to={data.webInfo.socialLinks.twitter}>
              {" "}
              <img
                className=" w-12"
                src={twitterIcon}
                alt=""
              />
            </Link>
            <Link to={data.webInfo.socialLinks.youtube}>
              {" "}
              <img
                className=" w-12"
                src={youTubeIcon}
                alt=""
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowUs;
