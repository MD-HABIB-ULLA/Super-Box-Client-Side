import { Link } from "react-router-dom";
import facebookIcon from "/facebook.png";
import instagramIcon from "/instagram.png";
import linkedinIcon from "/linkedin.png";
import { useForm } from "react-hook-form";
import GoogleLoginBtn from "../../Components/Common/GoogleLoginBtn";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const handleGoogleLogin = () => {
    console.log("hello");
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen  w-full flex flex-row">
      <div className="flex-auto w-1/2 p-5 bg-gray-200">
        <img
          className="w-full h-full"
          src="https://i.ibb.co/BN1gwPM/loginn.png"
          alt=""
        />
      </div>
      <div className="py-5 px-20 flex-auto w-1/2 bg-blue-100  ">
        <h1 className=" text-3xl font-mono italic text-center font-extrabold mb-10 ">
          Super Box
        </h1>
        <p className="text-xl font-semibold">Login to your account</p>
        <p className="text-gray-600 font-light max-w-[70%]">
          Inter your name, valid email address and password to register your
          account
        </p>

        <form
          className="flex flex-col gap-5 py-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              {...register("password", { required: true })}
              required
              className="grow"
              placeholder="password"
            />
          </label>

          <div className="flex flex-row justify-between items-center">
            <div className="form-control flex flex-row gap-2">
              <input type="checkbox" className="checkbox checkbox-info" />
              <p className=" text-sm  font-medium">Remember me</p>
            </div>

            <div>
              <Link
                href="#"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Forget Password?
              </Link>
            </div>
          </div>

          <button type="submit" className="btn btn-info text-white text-xl">
            Login
          </button>
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
            Do not have an account?{" "}
            <span className="text-blue-700 hover:text-blue-900">
              <Link to={"/sign-up"}>Sign Up Now!</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
