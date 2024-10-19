import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast from "react-hot-toast";

const MassageForm = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitMessage("");

    const imageFile = data.image[0];

    try {
      // Step 1: Upload the image to ImgBB
      const imgResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=e9b3cb55e11b48d4142caf366d77cea6`,
        {
          image: imageFile, // Pass the image file here
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Step 2: Get the image URL from the ImgBB response
      const imageUrl = imgResponse.data.data.url;

      // Step 3: Submit the form data with the image URL (not using FormData)
      const formData = {
        message: data.message,
        title: data.title,
        imageUrl: imageUrl,
        email: user.email,
      };

      const response = await axiosPublic.post("/massage", formData);
      console.log(response)

      toast.success("Form submitted successfully!");
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitMessage("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center ">Massage Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {errors.image && (
            <p className="mt-1 text-xs text-red-500">{errors.image.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            id="title"
            {...register("title", { required: "Title is required" })}
            rows="4"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter your title here"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            {...register("message", { required: "Message is required" })}
            rows="4"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter your message here"
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-xs text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      {submitMessage && (
        <p
          className={`mt-4 text-center ${
            submitMessage.includes("Error") ? "text-red-500" : "text-green-500"
          }`}
        >
          {submitMessage}
        </p>
      )}
    </div>
  );
};

export default MassageForm;
