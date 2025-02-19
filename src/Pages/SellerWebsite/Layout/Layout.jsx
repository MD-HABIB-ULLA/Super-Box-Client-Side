import { Link, Outlet, useParams } from "react-router-dom";
import Navbar from "../../../Components/SellerWebPage/Navbar";
import { useContext, useEffect, useState } from "react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";
import { Clock, LogOut, Package, ShoppingCart, User } from "lucide-react";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { AuthContext } from "../../../Provider/AuthProvider";
import { MdFeedback } from "react-icons/md";
import { PiClockCountdownDuotone } from "react-icons/pi";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Layout = () => {
  const [services, setServices] = useState([]);
  const [pendingProducts, setPendingProducts] = useState(null);
  console.log(services, pendingProducts);
  const axiosPublic = useAxiosPublic();
  const { name } = useParams();

  const { setName, webInfo } = useContext(WebDataDisContext);
  const { logOut, user } = useContext(AuthContext);

  const fetchServices = async () => {
    if (user) {
      try {
        const res = await axiosPublic.get(
          `/bookService?key=userEmail&value=${user.email}`
        );
        setServices(res.data);
      } catch (err) {
        setServices(null);
      }
    }
  };

  const fetchPendingProducts = async () => {
    if (!email || !user?.email) return;

    setLoading(true);

    try {
      const res = await axiosPublic.get(
        `/w/pendingProduct/${email}/${user.email}`
      );
      setPendingProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchPendingProducts();
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

              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 relative">
                <label
                  htmlFor="customer"
                  aria-label="close sidebar"
                  className="bg-green-200 block lg:hidden  text-black font-bold text-xl px-2 right-10  absolute rounded-full cursor-pointer"
                >
                  X
                </label>
                <li className=" lg:mt-0 mt-10">
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
                {services && (
                  <li>
                    <Link
                      to={`/w/${name}/bookedServices`}
                      className="flex items-center py-2 px-4 hover:bg-gray-700 hover:text-white rounded transition duration-150 ease-in-out"
                    >
                      <PiClockCountdownDuotone className="mr-3" />
                      Pending services
                    </Link>
                  </li>
                )}
                {pendingProducts&& (
                  <li>
                    <Link
                      to={`/w/${name}/pending`}
                      className="flex items-center py-2 px-4 hover:bg-gray-700 hover:text-white rounded transition duration-150 ease-in-out"
                    >
                      <Clock className="mr-3" size={20} />
                      Pending Products
                    </Link>
                  </li>
                )}

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
                <li>
                  <Link
                    to={`/w/${name}/feedback`}
                    className="flex items-center py-2 px-4 hover:bg-gray-700 hover:text-white rounded transition duration-150 ease-in-out"
                  >
                    <MdFeedback className="mr-3" size={20} />
                    Feedback
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
                  <button
                    onClick={() => {
                      logOut();
                      window.location.reload();
                    }}
                    className="w-full flex items-center justify-center py-2 px-4 bg-red-600 hover:bg-red-700 rounded transition duration-150 ease-in-out"
                  >
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
        <div className="h-screen w-full flex items-center justify-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      )}
    </>
  );
};

export default Layout;
