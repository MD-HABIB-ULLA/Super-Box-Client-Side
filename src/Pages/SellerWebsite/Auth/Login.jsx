import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import GoogleLoginBtn from "../../../Components/Common/GoogleLoginBtn";
import facebookIcon from "/facebook.png";
import instagramIcon from "/instagram.png";
import linkedinIcon from "/linkedin.png";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
const LoginCus = () => {
  const axiosPublic = useAxiosPublic()
  const { register, handleSubmit } = useForm();
  const { name } = useParams();
  const { logOut, loginWithEmailAndPassword } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const onSubmit = (data, e) => {
    console.log(name);
    
    // Ensure name is valid
    if (name.trim()) {
      localStorage.setItem("isCustomer", JSON.stringify(true)); // Set "isCustomer" if name is present
    }

  
    loginWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        const customerData = {
          email: res.user.email,
          authData: res.user,
          shopName: name,
          phone: "",
          address: {
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
          },
          cart: [],
        };
  
        axiosPublic.post("/customer", customerData)
          .then((res) => {
            toast.success("Login successful");
            navigate(`/w/${name}`);
            console.log(res);
            // Avoid window reload unless absolutely necessary
          })
          .catch((error) => {
            console.error("Error posting customer data:", error);
            toast.error("Failed to register customer data.");
          });
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          toast.error("Invalid email or password. Please try again.");
        } else {
          toast.error("Login failed. Please check your credentials and try again.");
        }
      });
  };
  

  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="flex h-full w-full   bg-gradient-to-r from-gray-100 from-10% via-sky-100 via-40% to-blue-100 to-90% py-4 m-auto items-center justify-center bg-gray-900 ">
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-10 py-5 shadow-lg backdrop-blur-md ">
          <div className="text-white ">
            <div className="mb-2 flex flex-col items-center">
              <h1 className="mb-2  text-4xl font-bold">Login</h1>
              <span className="text-gray-300">Welcome Back</span>
            </div>
            {/* Start of the new form */}
            <form
              className="flex flex-col gap-3 py-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label className="w-full outline-none active:outline-none active:border-none bg-transparent flex items-center gap-2">
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Email"
                  required
                  className="rounded-3xl  bg-opacity-50 px-6 py-2 bg-transparent text-center w-full  shadow-lg backdrop-blur-md"
                />
              </label>

              <label className="  flex items-center gap-2">
                <input
                  type="password"
                  {...register("password", { required: true })}
                  required
                  className="rounded-3xl bg-transparent bg-opacity-50 px-6 py-2 text-center  shadow-lg backdrop-blur-md"
                  placeholder="Password"
                />
              </label>

              <button
                type="submit"
                className="rounded-3xl  bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300  text-xl"
              >
                Login
              </button>
              <GoogleLoginBtn></GoogleLoginBtn>
              <div className=" text-white">
                <div className="text-center">
                  <Link
                    to={`/w/${name}/signup`}
                    className="text-sm font-medium underline"
                  >
                    Don't have an account ?
                  </Link>
                </div>
              </div>
            </form>
            {/* End of the new form */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCus;
