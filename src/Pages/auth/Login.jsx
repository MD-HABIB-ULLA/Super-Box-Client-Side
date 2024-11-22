import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import GoogleLoginBtn from "../../Components/Common/GoogleLoginBtn";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { logOut, loginWithEmailAndPassword } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    // First log out the user in case there are any active sessions
    logOut();
    loginWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        const user = result.user;

        // Check if the user's email is verified
        // if (user.emailVerified) {
        if (user) {
          toast.success("Login successful");
          navigate("/dashboard"); // Redirect to the dashboard if email is verified
        } else {
          toast.error("Please verify your email before logging in.");
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.code === "auth/invalid-credential") {
          toast.error("Invalid email or password. Please try again.");
        } else {
          toast.error("Login failed. Please try again.");
        }
      });
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
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-500 transition duration-200"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6">
            <GoogleLoginBtn />
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-gray-600">
          Not a member?{" "}
          <Link
            to="/sign-up"
            className="font-medium text-blue-600 hover:text-blue-500 transition duration-200"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
