import { Link, Outlet, useParams } from "react-router-dom";
import Navbar from "../../../Components/SellerWebPage/Navbar";
import { useContext, useEffect } from "react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import { Clock, LogOut, Package, ShoppingCart, User } from "lucide-react";
import { HiChatBubbleLeftRight } from "react-icons/hi2";

const Layout = () => {
  const { name } = useParams();
  const { setName, webInfo } = useContext(WebDataDisContext);
  useEffect(() => {
    setName(name);
  }, [name]);
  return (
    <>
      {webInfo ? (
        <div style={{ backgroundColor: webInfo?.body.backgroundColor }}>
          <Navbar
            linksPosition={webInfo?.navbar.linksPosition}
            backgroundColor={webInfo?.navbar.backgroundColor}
            logo={webInfo?.logo}
            shopName={webInfo?.shopName}
          />

          <div className="drawer drawer-end">
            <input id="customer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <div>
                <Outlet />
              </div>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="customer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>

              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                <li>
                  <Link
                    to={`/w/${name}/profile`}
                    className="flex items-center py-2 px-4 hover:bg-gray-700 hover:text-white rounded transition duration-150 ease-in-out"
                  >
                    <User className="mr-3" size={20} />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/w/${name}/cart`}
                    className="flex items-center py-2 px-4 hover:bg-gray-700 hover:text-white rounded transition duration-150 ease-in-out"
                  >
                    <ShoppingCart className="mr-3" size={20} />
                    Cart Items
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/w/${name}/pending`}
                    className="flex items-center py-2 px-4 hover:bg-gray-700 hover:text-white rounded transition duration-150 ease-in-out"
                  >
                    <Clock className="mr-3" size={20} />
                    Pending Products
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/w/${name}/purchased`}
                    className="flex items-center py-2 px-4 hover:bg-gray-700 hover:text-white rounded transition duration-150 ease-in-out"
                  >
                    <Package className="mr-3" size={20} />
                    Purchased Products
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/w/${name}/messaging`}
                    className="flex items-center py-2 px-4 hover:bg-gray-700 hover:text-white rounded transition duration-150 ease-in-out"
                  >
                    <HiChatBubbleLeftRight className="mr-3" size={20} />
                    Messaging
                  </Link>
                </li>
                <div className="mt-auto">
                  <li>
                    <Link
                      to={`/w/${name}/support`}
                      className="flex items-center mb-3 py-2 px-4 hover:bg-gray-700 hover:text-white rounded transition duration-150 ease-in-out"
                    >
                      <HiChatBubbleLeftRight className="mr-3 " size={20} />
                      Support & Report
                    </Link>
                  </li>
                  <button className="w-full flex items-center justify-center py-2 px-4 bg-red-600 hover:bg-red-700 rounded transition duration-150 ease-in-out">
                    <LogOut className="mr-3" size={20} />
                    Log Out
                  </button>
                </div>
              </ul>
            </div>
          </div>

          <footer className="bg-gray-800 text-white p-4 text-center">
            <p>
              &copy; {new Date().getFullYear()} {webInfo?.shopName}. All rights
              reserved.
            </p>
          </footer>
        </div>
      ) : (
        "no data"
      )}
    </>
  );
};

export default Layout;
