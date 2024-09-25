import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import CreateWebsiteForm from "../../../Components/Other/CreateWebsiteForm";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FormContext } from "../../../Context/createWebFormContext";

const CreateWebsite = () => {
  const { setSellerInfo, sellerInfo, sellerExist } = useContext(FormContext);
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    let tradeLicense = null;
    let nidPicture = null;

    // FormData for handling file uploads
    const formData = new FormData();

    // Check if tradeLicense exists, and add to formData
    if (data.tradeLicense && data.tradeLicense[0]) {
      formData.append("image", data.tradeLicense[0]);

      try {
        // Upload the trade license image
        const tradeLicenseImage = await axiosPublic.post(
          "https://api.imgbb.com/1/upload?key=e9b3cb55e11b48d4142caf366d77cea6",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        tradeLicense = tradeLicenseImage.data.data.display_url;
      } catch (error) {
        console.error("Trade License upload failed:", error);
      }
    }

    // Clear formData and add NID picture
    formData.delete("image");
    if (data.nidPicture && data.nidPicture[0]) {
      formData.append("image", data.nidPicture[0]);

      try {
        // Upload the NID picture
        const nidImage = await axiosPublic.post(
          "https://api.imgbb.com/1/upload?key=e9b3cb55e11b48d4142caf366d77cea6",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        nidPicture = nidImage.data.data.display_url;
      } catch (error) {
        console.error("NID Picture upload failed:", error);
      }
    }

    // Combine all seller data
    const sellerData = {
      sellerCountry: data.sellerCountry,
      sellerAddress: data.sellerAddress,
      whatsappNumber: data.bkashNumber,
      pickedUpAddress: [data.PA1, data.PA2, data.PA3],
      tradeLicense,
      nidPicture,
    };

    if (sellerData) {
      setSellerInfo(sellerData);
      setLoading(false);
      console.log("Seller data set successfully:", sellerData);
    }
  };

  // If the seller already exists
  if (sellerExist) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div className="flex flex-col gap-2">
          <p className="text-5xl font-bold"> Your request is pending </p>
          <p>Please wait until admin approval</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {!sellerInfo ? (
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
              {/* Country */}
              <div className="form-control flex-1 ">
                <label className="label">
                  <span className="label-text text-lg">Country</span>
                </label>

                <input
                  type="text"
                  placeholder="Type your country name"
                  {...register("sellerCountry", { required: true })}
                  className="input input-bordered"
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

            {/* NID picture */}
            <div className="flex flex-row gap-4">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text text-lg">NID Picture</span>
                </label>
                <input
                  {...register("nidPicture", { required: true })}
                  type="file"
                  className="file-input  input-bordered file-input-info"
                />
              </div>
              {/* Bkash Number */}
              <div className="form-control w-full flex flex-col justify-between ">
                <label className="label">
                  <span className="label-text text-sm">
                    Bkash Number that will be open with same NID
                  </span>
                </label>
                <input
                  type="tel"
                  placeholder="Enter a Bkash number"
                  {...register("bkashNumber", { required: true })}
                  className="input input-bordered  "
                />
              </div>
            </div>

            <div className="">
              {/* Trade License */}
              <label className="label">
                <span className="label-text text-lg capitalize">
                  Three pickup address
                </span>
              </label>
              <div className="flex flex-row gap-4">
                <div className="form-control flex-1 ">
                  <input
                    type="text"
                    placeholder="please enter your full address"
                    {...register("PA1", { required: true })}
                    className="input input-bordered "
                  />
                </div>

                <div className="form-control flex-1 ">
                  <input
                    type="text"
                    placeholder="please enter your full address"
                    {...register("PA2", { required: true })}
                    className="input input-bordered "
                  />
                </div>
                <div className="form-control flex-1 ">
                  <input
                    type="text"
                    placeholder="please enter your full address"
                    {...register("PA3", { required: true })}
                    className="input input-bordered "
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              {/* Trade License */}
              <div className="form-control flex-1 ">
                <label className="label">
                  <span className="label-text text-lg">
                    Trade License (Optional)
                  </span>
                </label>
                <input
                  {...register("tradeLicense")}
                  type="file"
                  className="file-input  input-bordered file-input-info"
                />
              </div>
              {/* Introduction video */}
              <div className="form-control flex-1 ">
                <label className="label">
                  <span className="label-text text-lg">
                    Introduction Video (Optional)
                  </span>
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
                {loading ? "loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <CreateWebsiteForm />
      )}
    </div>
  );
};

export default CreateWebsite;
