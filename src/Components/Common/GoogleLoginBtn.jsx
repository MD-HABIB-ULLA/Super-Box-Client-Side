import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const GoogleLoginBtn = () => {
  const { googleLogin, logOut } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    logOut();
    googleLogin()
      .then((res) => {
        console.log(res);
        if (res.user.displayName) {
          const userInfo = {
            name: res.user.displayName,
            email: res.user.email,
          };
          axiosPublic
            .post("/users", userInfo)
            .then(() => {
              toast.success("Signin successful ");
              navigate(location?.state ? location.state : "/");
            })
            .catch((err) => console.log(err)) ;
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
