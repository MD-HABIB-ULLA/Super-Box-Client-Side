import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginBtn = () => {
  const { name } = useParams();
  console.log(name);
  const { googleLogin, logOut } = useContext(AuthContext);
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const handleGoogleLogin = () => {
    if (name) {
      localStorage.setItem("isCustomer", JSON.stringify(true)); // Set "isCustomer" if name is present
    }

    googleLogin() // Initiate Google login first
      .then((res) => {
        console.log(res);

        if (res.user.displayName) {
          const userInfo = {
            name: res.user.displayName,
            email: res.user.email,
            role: "user",
          };
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
          // Store user info in the backend
          axiosPublic
            .post("/users", userInfo)
            .then(() => {
              // Fetch "isCustomer" from localStorage AFTER login is successful
              const storedIsCustomer = localStorage.getItem("isCustomer");
              const isCustomer = JSON.parse(storedIsCustomer);
              console.log(isCustomer, name, " this is from google ");
              console.log();
              // Conditional navigation based on customer status
              if (isCustomer) {
                axiosPublic.post("/customer", customerData).then(() => {
                  navigate(`/w/${name}`);
                  window.location.reload();
                  toast.success("Signin successful");
                });
              } else {
                toast.success("Signin successful");
                navigate(`/dashboard`);
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => {
        console.log(err);

        // Corrected: toast to show error message
        toast.error(err.message || "Login failed");
      });
  };

  return (
    <div>
      <div onClick={handleGoogleLogin} className="cursor-pointer ">
        <div className="flex items-center justify-center gap-3 rounded-3xl  bg-opacity-50 px-6 py-2 bg-transparent text-center w-full  shadow-lg backdrop-blur-md text-sm">
          <FcGoogle className="text-3xl" /> Continue with Google
        </div>
      </div>
    </div>
  );
};

export default GoogleLoginBtn;
