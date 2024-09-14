import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <div>
      <div className=" bg-blue-200 ">
        <div className="navbar max-w-full px-5 border ">
          <div className="navbar-start">
            <Link to={"/"} className=" text-2xl">
              Super Box
            </Link>
          </div>
          <div className="navbar-end">
            {user?.email ? (
              <div className=" flex flex-row justify-center items-center gap-5">
                <Link
                  to={"/my-website"}
                  className="text-xl font-serif text-blue-600 font-semibold hover:underline"
                >
                  DashBoard
                </Link>
                <div className="dropdown dropdown-bottom dropdown-end">
                  <label tabIndex={0} className="avatar w-16">
                    <div className=" hover:cursor-pointer w-16 rounded-full">
                      <img src={user?.photoURL} />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-fit"
                  >
                    <li>
                      {" "}
                      <p className=" text-center">{user?.displayName}</p>
                    </li>
                    <li>
                      <p className="">{user?.email}</p>
                    </li>
                    <li>
                      <Link to={"/dashboard/welcome-page"} className="">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button onClick={logOut}>logOut</button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                to={"/login"}
                className=" text-blue-700 text-xl font-semibold"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
