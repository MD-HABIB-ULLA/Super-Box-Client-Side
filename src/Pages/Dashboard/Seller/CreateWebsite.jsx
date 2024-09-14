import { useState } from "react";
import { useForm } from "react-hook-form";
import CreateWebsiteForm from "../../../Components/Other/CreateWebsiteForm";

const CreateWebsite = () => {
  const [sellerData, setSellerData] = useState(null);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    setSellerData(data);
  };
  return (
    <div>
      {!sellerData ? (
        <div>
          <div className=" py-10">
            <h1 className="text-4xl text-center font-bold">
              Welcome to Super Box
            </h1>
            <p className="text-2xl  text-center">
              Fill this form first to Create Your website{" "}
            </p>
          </div>
          <form className="px-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row gap-4">
              {/* Country */}{" "}
              <div className="form-control flex-1 ">
                <label className="label">
                  <span className="label-text text-lg">Country</span>
                </label>
                <input
                  type="text"
                  placeholder="Type your country name"
                  {...register("sellerCountry", { required: true })}
                  className="input input-bordered "
                />
              </div>
              {/* Address */}
              <div className="form-control flex-1 ">
                <label className="label">
                  <span className="label-text text-lg">Address</span>
                </label>
                <input
                  type="text"
                  placeholder="please enter your full address"
                  {...register("sellerAddress", { required: true })}
                  className="input input-bordered "
                />
              </div>
            </div>

            {/*NID Number */}
            <div className="flex flex-row gap-4">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text text-lg">NID Number</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your NID number"
                  {...register("nidNumber", { required: true })}
                  className="input input-bordered  "
                />
              </div>{" "}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text text-lg">Whatsapp Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="Enter a whatsapp number"
                  {...register("whatsappNumber", { required: true })}
                  className="input input-bordered  "
                />
              </div>
            </div>

            <div className="flex flex-row gap-4">
              {/*trade license*/}
              <div className="form-control flex-1 ">
                <label className="label">
                  <span className="label-text text-lg">Trade License</span>
                </label>

                <input
                  {...register("tradeLicense")}
                  type="file"
                  className="file-input  input-bordered file-input-info"
                />
              </div>
              {/*introduction video*/}
              <div className="form-control flex-1 ">
                <label className="label">
                  <span className="label-text text-lg">Introduction video</span>
                </label>

                <input
                  {...register("introVdo")}
                  type="file"
                  className="file-input  input-bordered file-input-info"
                />
              </div>
            </div>
            <div className="text-center mt-3">
              <button className="btn bg-sky-500 text-white font-bold ">
                {" "}
                Submit{" "}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <CreateWebsiteForm/>
      )}
    </div>
  );
};

export default CreateWebsite;
