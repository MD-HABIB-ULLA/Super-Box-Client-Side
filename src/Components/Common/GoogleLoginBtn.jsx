import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const GoogleLoginBtn = () => {
  const { name } = useParams();

  const { googleLogin, logOut } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const handleGoogleLogin = () => {
    localStorage.setItem("isCustomer", JSON.stringify(true));
    const storedIsCustomer = localStorage.getItem("isCustomer");
    const isCustomer = JSON.parse(storedIsCustomer);
    logOut();
    googleLogin()
      .then((res) => {
        console.log(res);
        if (res.user.displayName) {
          const userInfo = {
            name: res.user.displayName,
            email: res.user.email,
            role: "user",
          };
          axiosPublic
            .post("/users", userInfo)
            .then(() => {
              toast.success("Signin successful ");
              isCustomer ? navigate(`/w/${name}`) : navigate(`/dashboard`);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => {
        console.log(err);
        toast.success(err.massage);
        // console.log(err);
      });
  };
  return (
    <div>
      <div onClick={handleGoogleLogin} className="cursor-pointer">
        <img
          className=" w-8"
          src="https://i.ibb.co/74JTkrp/google-13170545.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default GoogleLoginBtn;
