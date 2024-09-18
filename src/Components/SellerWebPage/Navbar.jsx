import { useContext, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = ({ linksPosition, backgroundColor, logo, shopName }) => {
  const { customerInfo, logOut } = useContext(AuthContext);
  const { name } = useParams();
  const list = (
    <>
      <NavLink
        to={`/w/${name}`}
        end
        className={({ isActive }) =>
          `text-base font-bold px-6 py-2 w-full flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 duration-500 hover:text-gray-700 dark:hover:text-gray-200 uppercase ${
            isActive
              ? "inter text-[#010e1b] border-x-0 rounded-none border-t-0 bg-transparent"
              : "md:text-white text-white"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to={`/w/${name}/products`}
        className={({ isActive }) =>
          `text-base font-bold px-6 py-2  w-full flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 duration-500 hover:text-gray-700 dark:hover:text-gray-200 uppercase text-nowrap ${
            isActive
              ? "inter text-[#010e1b] border-x-0 rounded-none border-t-0 bg-transparent"
              : "md:text-white text-white"
          }`
        }
      >
        Products
      </NavLink>

      {/* Link for login under SellerWebsite */}
      <NavLink
        to={`/w/${name}/blogs`}
        className={({ isActive }) =>
          `text-base font-bold px-6 py-2  w-full flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 duration-500 hover:text-gray-700 dark:hover:text-gray-200 uppercase ${
            isActive
              ? "inter text-[#010e1b] border-x-0 rounded-none border-t-0 bg-transparent"
              : "md:text-white text-white"
          }`
        }
      >
        blogs
      </NavLink>
    </>
  );

  return (
    <nav style={{ backgroundColor: `${backgroundColor}` }} className={`h-16 `}>
      <div className="flex py-2 px-5 h-full">
        <div className=" h-full flex gap-2 items-center">
          <img src={logo} className="h-full" alt="" />
          <h1 className="text-2xl text-white font-bold  capitalize">
            {shopName}
          </h1>
        </div>
        <div className={`flex-1 flex  justify-${linksPosition}`}>
          <ul className="flex gap-2 h-full items-center "> {list}</ul>
        </div>
        <div
          className=" h-full flex items-center
         "
        >
          {customerInfo?.email ? (
            <div className=" flex flex-row justify-center items-center gap-5">
              <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="avatar w-16">
                  <div className="hover:cursor-pointer w-16  p-2">
                    <img
                      className="h-full rounded-full bg-gray-700 ring-black ring-1"
                      src={customerInfo?.photoURL}
                      alt="User Avatar"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-fit"
                >
                  <li>
                    <p className="text-center">{customerInfo?.displayName}</p>
                  </li>
                  <li>
                    <p>{customerInfo?.email}</p>
                  </li>
                  <li>
                    <Link to={"/dashboard/welcome-page"}>Dashboard</Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        window.location.reload();
                        localStorage.removeItem("isCustomer");
                      }}
                    >
                      logOut
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link
              to={`/w/${name}/login`}
              className=" text-white text-sm bg-black rounded-full px-3 py-2  font-semibold"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;