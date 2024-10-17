import { useContext, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { WebDataDisContext } from "../../Context/WebDataDisContext";
import { BiCart, BiMenu } from "react-icons/bi";

export default function Navbar({
  linksPosition = "end",
  backgroundColor = "white",
  logo = "/placeholder.svg",
  shopName = "Shop",
}) {
  const { products, blogs, services, webCartItem } =
    useContext(WebDataDisContext);
  const { user } = useContext(AuthContext);
  const { name } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const NavItem = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-base font-bold px-6 py-2 w-full flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 duration-500 hover:text-gray-700 dark:hover:text-gray-200 uppercase ${
          isActive
            ? "inter text-[#021f3c] border-x-0 rounded-none border-t-0 bg-transparent"
            : "text-gray-600"
        }`
      }
    >
      {children}
    </NavLink>
  );

  const navItems = [
    { to: `/w/${name}`, label: "Home" },
    ...(products?.length
      ? [{ to: `/w/${name}/products`, label: "Products" }]
      : []),
    ...(blogs?.length ? [{ to: `/w/${name}/blogs`, label: "Blogs" }] : []),
    ...(services?.length
      ? [{ to: `/w/${name}/services`, label: "Services" }]
      : []),
  ];

  return (
    <nav style={{ backgroundColor }} className="navbar h-16">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <BiMenu className="h-5 w-5" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems.map((item) => (
              <li key={item.to}>
                <NavItem to={item.to}>{item.label}</NavItem>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-2 items-center">
          <img src={logo} className="h-12" alt="" />
          <h1 className="text-2xl font-bold capitalize text-sky-400/65">
            {shopName}
          </h1>
        </div>
      </div>
      <div className={`navbar-center hidden lg:flex justify-${linksPosition}`}>
        <ul className="menu menu-horizontal px-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavItem to={item.to}>{item.label}</NavItem>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="flex items-center gap-2">
          <div className="text-4xl relative">
            <Link to={`/w/${name}/cart`}>
              <BiCart />
              <div className="badge badge-secondary badge-sm absolute -top-2 -right-3">
                {webCartItem?.length}
              </div>
            </Link>
          </div>
          {user ? (
            <div className="dropdown dropdown-end">
              <label
                htmlFor="customer"
                tabIndex={0}
                className="avatar w-16 drawer-button"
              >
                <div className="w-10 rounded-full">
                  {user?.photoURL && (
                    <img src={user.photoURL} alt="User Avatar" />
                  )}
                </div>
              </label>
           
            </div>
          ) : (
            <Link to={`/w/${name}/login`} className="btn btn-primary btn-sm">
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
