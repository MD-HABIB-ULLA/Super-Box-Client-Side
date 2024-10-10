import { useContext, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { WebDataDisContext } from "../../Context/WebDataDisContext";
import { BiCart } from "react-icons/bi";

const Navbar = ({ linksPosition, backgroundColor, logo, shopName }) => {

  const { products, blogs, services,webCartItem } = useContext(WebDataDisContext);
  console.log(services);

  const { customerInfo} = useContext(AuthContext);
  const { name } = useParams();
 console.log(customerInfo)
  const list = (
    <>
      <NavLink
        to={`/w/${name}`}
        end
        className={({ isActive }) =>
          `text-base font-bold px-6 py-2 w-full flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 duration-500 hover:text-gray-700 dark:hover:text-gray-200 uppercase ${
            isActive
              ? "inter text-[#021f3c] border-x-0 rounded-none border-t-0 bg-transparent"
              : " text-gray-600"
          }`
        }
      >
        Home
      </NavLink>

      {products?.length !== 0 && (
        <NavLink
          to={`/w/${name}/products`}
          className={({ isActive }) =>
            `text-base font-bold px-6 py-2  w-full flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 duration-500 hover:text-gray-700 dark:hover:text-gray-200 uppercase text-nowrap ${
              isActive
                ? "inter text-[#021f3c] border-x-0 rounded-none border-t-0 bg-transparent"
                : " text-gray-600"
            }`
          }
        >
          Products
        </NavLink>
      )}

      {/* Link for login under SellerWebsite */}
      {blogs?.length !== 0 && (
        <NavLink
          to={`/w/${name}/blogs`}
          className={({ isActive }) =>
            `text-base font-bold px-6 py-2  w-full flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 duration-500 hover:text-gray-700 dark:hover:text-gray-200 uppercase ${
              isActive
                ? "inter text-[#021f3c] border-x-0 rounded-none border-t-0 bg-transparent"
                : " text-gray-600"
            }`
          }
        >
          blogs
        </NavLink>
      )}
      {services?.length !== 0 && (
        <NavLink
          to={`/w/${name}/services`}
          className={({ isActive }) =>
            `text-base font-bold px-6 py-2  w-full flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 duration-500 hover:text-gray-700 dark:hover:text-gray-200 uppercase ${
              isActive
                ? "inter text-[#021f3c] border-x-0 rounded-none border-t-0 bg-transparent"
                : " text-gray-600"
            }`
          }
        >
          services
        </NavLink>
      )}
    </>
  );

  return (
    <nav style={{ backgroundColor: `${backgroundColor}` }} className={`h-16 `}>
      <div className="flex py-2 px-5 h-full">
        <div className=" h-full flex gap-2 items-center">
          <img src={logo} className="h-full" alt="" />
          <h1 className="text-2xl  font-bold  capitalize text-sky-400/65">
            {shopName}
          </h1>
        </div>
        <div className={`flex-1 flex  justify-${linksPosition}`}>
          <ul className="flex gap-2 h-full items-center "> {list}</ul>
        </div>
        <div
          className=" h-full flex items-center gap-2 
         "
        >
          <div className="text-4xl relative">
            <Link to={`/w/${name}/cart`}>
              {" "}
              <BiCart />
              <div className="absolute bg-red-500 -top-2 text-sm px-2 text-white font-bold -right-3 py-1 rounded-full">
                <p>{webCartItem?.length}</p>
              </div>
            </Link>
          </div>
          {customerInfo ? (
            <div className=" flex flex-row justify-center items-center gap-5">
              <div className="dropdown dropdown-bottom dropdown-end">
                <label
                  htmlFor="customer"
                  tabIndex={0}
                  className="avatar w-16 drawer-button"
                >
                  <div className="hover:cursor-pointer w-16  p-2">
                    {customerInfo?.photoURL && (
                      <img
                        className="h-full rounded-full bg-gray-700 ring-black ring-1"
                        src={customerInfo?.photoURL}
                        alt="User Avatar"
                      />
                    )}
                  </div>
                  {/* <label
                
                className="btn btn-primary "
              >
                Open drawer
              </label> */}
                </label>
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
