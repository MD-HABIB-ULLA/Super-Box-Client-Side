import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import GoogleLoginBtn from "../../Components/Common/GoogleLoginBtn";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const SignUp = () => {
  const { updateUserProfile, signUpWithEmailAndPassword } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const onSubmit = (data) => {
    const password = data.password;
    const email = data.email;
    const imageFile = { image: data.image[0] };

    axios
      .post(
        `https://api.imgbb.com/1/upload?key=e9b3cb55e11b48d4142caf366d77cea6`,
        imageFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        const image = res.data.data.display_url;
        if (res.data.success) {
          signUpWithEmailAndPassword(email, password)
            .then((res) => {
              if (res.user) {
                updateUserProfile(data.name, image).then(() => {
                  const userInfo = { name: data.name, email: data.email };
                  axiosPublic.post("/users", userInfo).then((res) => {
                    navigate("/dashboard");
                    toast.success("Sign Up successful");
                  });
                });
                toast.success("Successfully signed in");
                navigate("/");
              }
            })
            .catch((error) => {
              if (error.code === "auth/email-already-in-use") {
                toast.error("This email already exists");
              }
            });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-300 to-indigo-200 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex-shrink-0">
            <img
              className="h-8 w-auto"
              src="https://i.ibb.co/N9h9pts/2024-10-19-17-36-43-Black-White-Minimalist-Business-Logo-Logo.png"
              alt="Logo"
            />
          </Link>
        </div>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Create Your Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
            <input
              type="file"
              {...register("image", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" required />
            <label className="ml-2 text-sm text-gray-700">I accept the <a href="#" className="text-indigo-600">Terms & Conditions</a></label>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="mt-6">
            <GoogleLoginBtn />
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-500">Login Now!</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
