import { Link, useLocation, useNavigate } from "react-router-dom";
import facebookIcon from "/facebook.png";
import instagramIcon from "/instagram.png";
import linkedinIcon from "/linkedin.png";
import { useForm } from "react-hook-form";
import GoogleLoginBtn from "../../Components/Common/GoogleLoginBtn";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const SignUp = () => {
  const { updateUserProfile, signUpWithEmailAndPassword } =
    useContext(AuthContext);
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
                  const userInfo = {
                    name: data.name,
                    email: data.email,
                  };
                  axiosPublic
                    .post("/users", userInfo)
                    .then((res) => {
                      if (res.data.insertedId) {
                        navigate("/dashboard");
                        toast.success("Sing Up successful");
                      } else {
                        navigate("/dashboard");
                        toast.success("Sing Up successful");
                      }
                    })
                    .catch((err) => console.log(err));
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
    <div>
      <div className="min-h-screen  w-full flex flex-row">
        <div className="flex-auto w-[40%]  bg-blue-100">
          <img
            className=" w-full "
            src="https://i.ibb.co/BN1gwPM/loginn.png"
            alt=""
          />
        </div>
        <div className="py-5 px-20 flex-auto w-[60%] bg-blue-100  ">
          <h1 className=" text-3xl font-mono italic text-center font-extrabold mb-10 ">
            Super Box
          </h1>
          <p className="text-2xl font-semibold">Let’s get started!</p>
          <p className="text-gray-600 font-light max-w-[70%]">
            Inter your name, valid email address and password to register your
            account
          </p>

          <form
            className="flex flex-col gap-5 py-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-row gap-4">
              {/* Name */}
              <div className="form-control flex-1 ">
                <label className="label">
                  <span className="label-text text-lg">Your Name</span>
                </label>
                <input
                  type="text"
                  placeholder="enter your name"
                  {...register("name", { required: true })}
                  className="input input-bordered "
                />
              </div>
              {/* Email */}
              <div className="form-control flex-1 ">
                <label className="label">
                  <span className="label-text text-lg">Your Email</span>
                </label>
                <input
                  type="text"
                  placeholder="enter your email"
                  {...register("email", { required: true })}
                  className="input input-bordered "
                />
              </div>
            </div>
            <div className="flex flex-row gap-4 ">
              {/* your image */}
              <div className="form-control flex-1 ">
                <label className="label">
                  <span className="label-text text-lg ">
                    Choose a passport size picture
                  </span>
                </label>

                <input
                  {...register("image", { required: true })}
                  type="file"
                  className="file-input  input-bordered file-input-info"
                />
              </div>
              {/*Whatsapp number */}
            </div>

            <label className="input input-bordered flex items-center gap-2">
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Enter your password"
                className="grow"
              />
            </label>
            <p className="text-sm -mt-4 text-gray-400 font-semibold">
              Minimum 8 characters long and containing at least one numeric,
              uppercase, lowercase, and special character.
            </p>

            <div className="form-control flex flex-row gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-info"
                required
              />
              <p className=" text-sm  font-medium">
                I accept the{" "}
                <span>
                  <Link
                    href="#"
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Terms & Conditions
                  </Link>
                </span>
              </p>
            </div>

            {/* Submit Button */}
            <button className="btn btn-info text-white text-xl">Sign Up</button>
          </form>

          <div>
            <p className=" text-sm font-semibold">Or login with</p>
            <div className="flex flex-row gap-2 py-2 ">
              <GoogleLoginBtn />
              <img className=" w-8" src={facebookIcon} alt="" />
              <img className=" w-8" src={instagramIcon} alt="" />
              <img className=" w-8" src={linkedinIcon} alt="" />
            </div>

            <p className=" mt-4 font-semibold">
              Already have an account?{" "}
              <span className="text-blue-700 hover:text-blue-900">
                <Link to={"/login"}>Login Now!</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
