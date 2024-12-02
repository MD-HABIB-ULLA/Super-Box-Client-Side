import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import CreateWebsiteForm from "../../../Components/Other/CreateWebsiteForm";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FormContext } from "../../../Context/CreateWebFormContext";
import {
  ArrowRight,
  Box,
  Camera,
  CheckCircle,
  CreditCard,
  FileText,
  MapPin,
  Phone,
  ShoppingBag,
  Store,
  Truck,
  Video,
} from "lucide-react";

const CreateWebsite = () => {
  const [isNext, setIsNext] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const { setSellerInfo, sellerInfo, sellerExist } = useContext(FormContext);
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [isAvailableStore, setIsAvailableStore] = useState(false);

  const ListItem = ({ icon, text }) => (
    <li className="flex h-full items-center space-x-4 bg-indigo-50 p-3 rounded-xl border border-indigo-100 hover:bg-indigo-100 transition-colors duration-300 ease-in-out">
      <div className="bg-indigo-600 text-white p-2 rounded-full">
        {React.cloneElement(icon, { className: "h-5 w-5" })}
      </div>
      <span className="text-gray-800 font-medium">{text}</span>
    </li>
  );

  const InputWrapper = ({
    label,
    name,
    type = "text",
    icon: Icon,
    register,
    errors,
    placeholder,
    optional = false,
  }) => (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">
        {label}
        {optional && (
          <span className="text-gray-500 text-sm ml-2">(Optional)</span>
        )}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          {...register(name, {
            required: !optional ? "This field is required" : false,
          })}
          className={`
            w-full pl-10 pr-3 py-2 border 
          
            rounded-lg 
            focus:outline-none 
            focus:ring-2 
            focus:ring-indigo-200
            transition 
            duration-300
          `}
        />
      </div>
    </div>
  );

  const FileInputWrapper = ({
    label,
    name,
    icon: Icon,
    register,
    errors,
    optional = false,
  }) => (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">
        {label}
        {optional && (
          <span className="text-gray-500 text-sm ml-2">(Optional)</span>
        )}
      </label>
      <div className="relative">
        <input
          type="file"
          {...register(name, {
            required: !optional ? "This file is required" : false,
          })}
          className={`
            w-full file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100
          
            rounded-lg 
            focus:outline-none 
            focus:ring-2 
            focus:ring-indigo-200
            transition 
            duration-300
          `}
        />
      </div>
    </div>
  );

  const nextSteps = [
    {
      icon: <Box className="w-6 h-6 text-indigo-600" />,
      title: "Complete Product Listing",
      description: "Add your products to start selling on Super Box marketplace."
    },
    {
      icon: <Truck className="w-6 h-6 text-indigo-600" />,
      title: "Set Up Shipping",
      description: "Configure your shipping methods and delivery zones."
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-indigo-600" />,
      title: "Store Setup",
      description: "Customize your store profile and branding."
    },
    {
      icon: <CreditCard className="w-6 h-6 text-indigo-600" />,
      title: "Payment Configuration",
      description: "Link your payment methods to receive earnings."
    }
  ];

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
      bkashNumber: data.bkashNumber,
      shopLocation: data.storeLocation,
      pickedUpAddress: [data.PA1, data.PA2, data.PA3],
      isAvailableStore,
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
      <div className="min-h-screen flex h items-center justify-center text-center">
        <div className="flex flex-col gap-2">
          <p className="text-5xl font-bold"> Your request is pending </p>
          <p>Please wait until admin approval</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
     {!isNext? (<div className=" flex items-center justify-center  p-4">
        <div className="rounded-2xl w-full max-w-md p-8 bg-white shadow-2xl border border-indigo-100">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-indigo-100 p-4 rounded-full inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="h-12 w-12 text-indigo-600"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-extrabold text-indigo-800 mb-4">
              Super Box
            </h1>
            <p className="text-xl text-indigo-600 mb-8">
              Create Your Website Journey Begins Here
            </p>
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Account Creation Prep
          </h2>

          <p className="text-gray-600 text-center mb-6 px-4">
            Gather these essential documents to streamline your account setup
          </p>

          <ul className=" mb-8 grid grid-cols-2 grid-rows-2 gap-3">
            <ListItem icon={<Camera />} text="  NID Picture" />
            <ListItem icon={<CreditCard />} text="bKash Number" />
            <ListItem icon={<FileText />} text="Trade License (Optional)" />
            <ListItem icon={<MapPin />} text="Country Name and Address" />
          </ul>

          <button
            onClick={() => setIsNext(true)}
            className="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-xl 
          hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
          transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            Continue to Next Step
          </button>
        </div>
      </div>)
       : !sellerInfo?(
        <div>
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-indigo-100 p-4 rounded-full inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="h-12 w-12 text-indigo-600"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-extrabold text-indigo-800 mb-4">
              Super Box
            </h1>
            <p className="text-xl text-indigo-600 mb-8">
              Create Your Website Journey Begins Here
            </p>
          </div>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
              <h1 className="text-3xl font-bold text-center text-indigo-800 mb-6">
                Seller Registration
              </h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <InputWrapper
                    label="Country"
                    name="sellerCountry"
                    icon={MapPin}
                    register={register}
                    placeholder="Enter your country"
                  />
                  <InputWrapper
                    label="Address"
                    name="sellerAddress"
                    icon={MapPin}
                    register={register}
                    placeholder="Full address"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FileInputWrapper
                    label="NID Picture"
                    name="nidPicture"
                    icon={Camera}
                    register={register}
                  />
                  <InputWrapper
                    label="Bkash Number"
                    name="bkashNumber"
                    type="tel"
                    icon={Phone}
                    register={register}
                    placeholder="Enter Bkash number"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Pickup Address
                  </label>
                  <InputWrapper
                    name="PA1"
                    register={register}
                    placeholder="Enter pickup address"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FileInputWrapper
                    label="Trade License"
                    name="tradeLicense"
                    icon={FileText}
                    register={register}
                    optional
                  />
                  <FileInputWrapper
                    label="Introduction Video"
                    name="introVdo"
                    icon={Video}
                    register={register}
                    optional
                  />
                </div>

                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    checked={isAvailableStore}
                    onChange={() => setIsAvailableStore(!isAvailableStore)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mr-2"
                  />
                  <label className="text-gray-700">
                    Do you have a physical store?
                  </label>
                </div>

                {isAvailableStore && (
                  <InputWrapper
                    label="Shop Location"
                    name="storeLocation"
                    icon={Store}
                    register={register}
                    placeholder="Enter your shop location"
                  />
                )}

                <div className="text-center">
                  <button
                    type="submit"
                    className={`
                w-full py-3 px-6 
                bg-indigo-600 text-white 
                font-bold rounded-lg 
                hover:bg-indigo-700 
                focus:outline-none 
                focus:ring-2 
                focus:ring-indigo-500 
                focus:ring-offset-2
                transition duration-300
               }
              `}
                  >
                    Submit Registration
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : !isCreate ? (
        <>
          {" "}
          <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 border border-gray-100 text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 rounded-full p-4">
                  <CheckCircle className="w-16 h-16 text-green-600" />
                </div>
              </div>

              <h1 className="text-4xl font-bold text-indigo-800 mb-4">
                Registration Successful!
              </h1>

              <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                Congratulations! Your seller account has been created. Follow
                the next steps to get your store up and running on Super Box.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {nextSteps.map((step, index) => (
                  <div
                    key={index}
                    className="bg-indigo-50 rounded-lg p-4 flex items-start space-x-4 hover:bg-indigo-100 transition duration-300"
                  >
                    <div>{step.icon}</div>
                    <div className="text-left">
                      <h3 className="font-bold text-indigo-800">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center space-x-4">
                <button onClick={()=>setIsCreate(true)} className="flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 space-x-2">
                  <span>Create website Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>


              </div>

              <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-500 p-4 text-left">
                <p className="text-yellow-800 text-sm">
                  <strong>Important:</strong> Your account is pending
                  verification. Our team will review your documents within 24-48
                  hours. You'll receive an email confirmation once verified.
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <CreateWebsiteForm />
      )}
    </div>
  );
};

export default CreateWebsite;
