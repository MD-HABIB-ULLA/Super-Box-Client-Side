import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

export default function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { name } = useParams();
  const { user } = useContext(AuthContext);
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const feedback = {
      ...data,
      email: user.email,
      from: name ? "customer" : "seller",
      website: name ? name : "",
    };
    axiosPublic.post("/feedback", feedback).then(() => {
      setIsSubmitting(false);
      toast.success("Thank you for your feedback!");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-200 to-rose-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Feedback Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="topic"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Topic
            </label>
            <input
              id="topic"
              type="text"
              {...register("topic", { required: "Topic is required" })}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.topic ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter the topic"
            />
            {errors.topic && (
              <p className="mt-1 text-xs text-red-500">
                {errors.topic.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="feedback"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Feedback
            </label>
            <textarea
              id="feedback"
              {...register("feedback", { required: "Feedback is required" })}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.feedback ? "border-red-500" : "border-gray-300"
              }`}
              rows="4"
              placeholder="Enter your feedback here"
            ></textarea>
            {errors.feedback && (
              <p className="mt-1 text-xs text-red-500">
                {errors.feedback.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}
