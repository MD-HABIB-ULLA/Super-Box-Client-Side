import { useForm } from "react-hook-form";
import GoogleLoginBtn from "../../../Components/Common/GoogleLoginBtn";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast from "react-hot-toast";

const SignUpCus = () => {
  const { updateUserProfile, signUpWithEmailAndPassword } =
    useContext(AuthContext);
  const { name } = useParams();
  const { register, handleSubmit } = useForm();
  const location = useLocation();
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
        console.log(res.data.success);
        if (res.data.success) {
          signUpWithEmailAndPassword(email, password)
            .then((res) => {
              if (res.user) {
                updateUserProfile(data.name, image).then(() => {
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

                  axiosPublic.post("/customer", customerData).then(() => {
                    toast.success("sign up sucsessful");
                    navigate(`/w/${name}`);
                    window.location.reload();
                  });
                });
                toast.success("Successfully sign in ");
                navigate(location?.state ? location.state : "/");
              }
            })
            .catch((error) => {
              if (
                error.code ===
                  "auth/account-exists-with-different-credential" ||
                error.code === "auth/email-already-in-use"
              ) {
                toast.error("This email alreay exist");
                setLoading(false);
              }
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(data);
  };

  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="flex h-full w-full bg-gradient-to-r from-gray-100 from-10% via-sky-100 via-40% to-blue-100 to-90% py-4 m-auto items-center justify-center bg-gray-900 ">
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-10 py-5 shadow-lg backdrop-blur-md ">
          <div className="text-white ">
            <div className="mb-2 flex flex-col items-center">
              <h1 className="mb-2 text-4xl font-bold">Sign Up</h1>
              <span className="text-gray-300">Create your account</span>
            </div>

            {/* Start of the new form */}
            <form
              className="flex flex-col gap-3 py-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Name input */}
              <label className="w-full outline-none active:outline-none active:border-none bg-transparent flex items-center gap-2">
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Full Name"
                  required
                  className="rounded-3xl bg-opacity-50 px-6 py-2 bg-transparent text-center w-full shadow-lg backdrop-blur-md"
                />
              </label>

              {/* Email input */}
              <label className="w-full outline-none active:outline-none active:border-none bg-transparent flex items-center gap-2">
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Email"
                  required
                  className="rounded-3xl bg-opacity-50 px-6 py-2 bg-transparent text-center w-full shadow-lg backdrop-blur-md"
                />
              </label>

              {/* Password input */}
              <label className="w-full outline-none active:outline-none active:border-none bg-transparent flex items-center gap-2">
                <input
                  type="password"
                  {...register("password", { required: true })}
                  required
                  className="rounded-3xl bg-transparent bg-opacity-50 px-6 py-2 w-full text-center shadow-lg backdrop-blur-md"
                  placeholder="Password"
                />
              </label>

              {/* Image input */}
              <label className="w-full outline-none active:outline-none active:border-none bg-transparent flex items-center gap-2">
                <input
                  {...register("image")}
                  type="file"
                  className="file-input shadow-lg backdrop-blur-md bg-transparent rounded-full w-full max-w-xs"
                />
              </label>

              {/* Submit button */}
              <button
                type="submit"
                className="rounded-3xl bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 text-xl"
              >
                Sign Up
              </button>

              <GoogleLoginBtn />

              {/* Sign up link */}
              <div className="text-white">
                <div className="text-center">
                  <Link
                    to={`/w/${name}/login`}
                    className="text-sm font-medium underline"
                  >
                    Already have an account? Log in
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

export default SignUpCus;
