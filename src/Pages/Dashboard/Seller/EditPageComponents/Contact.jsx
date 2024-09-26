import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { WebDataDisContext } from "../../../../Context/WebDataDisContext";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { PiPhoneCallDuotone } from "react-icons/pi";
import { FcHome } from "react-icons/fc";
import Title from "../../../../Components/Common/Title";
import { BiMailSend } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();
  const { data, isPending, refetch } = useContext(WebDataDisContext);
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (formData) => {
    setLoading(true);
  };
  return (
    <div className=" relative group  hover:border-blue-500 border-transparent border-[4px]  ">
      <div className="absolute top-0 group-hover:block hidden">
        <FaEdit
          onClick={() =>
            document.getElementById("my_modal_contact").showModal()
          }
          className="text-2xl box-content text-black cursor-pointer bg-blue-500 px-2 py-1"
        ></FaEdit>
      </div>
      <div className="mt-20">
        <Title title1="any queries?" title2={"contact with us"}></Title>
        <p className="text-center max-w-[35%] mx-auto text-xs text-gray-600 font-light">
          We always want to hear from you! Let us know how we can best help you
          and we'll do our very best.
        </p>

        <div className="container mx-auto flex flex-row px-10 py-10 divide-x-4  divide-gray-950">
          <div className=" flex-1 card-body items-center text-center">
            <FcHome className=" text-5xl" />
            <h2 className="card-title">Location</h2>
            <p className=" text-sm text-gray-500 w-52 font-semibold">
              {data.webInfo.contactInfo.location}
            </p>
          </div>

          <div className=" flex-1">
            <div className=" flex-1 card-body items-center text-center">
              <PiPhoneCallDuotone className=" text-5xl" />
              <h2 className="card-title">Call Us</h2>
              <p className=" text-sm text-gray-500 font-semibold">
                Mobile: {data.webInfo.contactInfo.mobile}
              </p>
              <p className=" text-sm text-gray-500 font-semibold">
                Hotline: {data.webInfo.contactInfo.hotline}
              </p>
            </div>
          </div>
          <div className=" flex-1">
            <div className=" flex-1 card-body items-center text-center">
              <BiMailSend className=" text-5xl" />
              <h2 className="card-title">Mail Us</h2>
              <p className=" text-sm text-gray-500 font-semibold">
                Info : {data.webInfo.contactInfo.emailInfo}
              </p>
              <p className=" text-sm text-gray-500 font-semibold">
                Support : {data.webInfo.contactInfo.emailSupport}
              </p>
            </div>
          </div>
        </div>
      </div>
      <dialog id="my_modal_contact" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h1 className="text-3xl capitalize">Contact information Setup:</h1>
          {/* Banner picture */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-3 gap-4  ">
              {/*Location */}
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text text-lg">Location</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Tripe Tile"
                  {...register("location")}
                  defaultValue={data.webInfo.contactInfo.location}
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
                  {...register("mobile")}
                  defaultValue={data.webInfo.contactInfo.mobile}
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
                  {...register("hotline")}
                  defaultValue={data.webInfo.contactInfo.hotline}
                  className="input input-bordered w-full "
                />
              </div>
              {/*Email For Information */}
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text text-lg">
                    Email For Information
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Tripe Tile"
                  {...register("infoEmail")}
                  defaultValue={data.webInfo.contactInfo.infoEmail}
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
                  {...register("supportEmail")}
                  defaultValue={data.webInfo.contactInfo.supportEmail}
                  className="input input-bordered w-full "
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
  );
};

export default Contact;
