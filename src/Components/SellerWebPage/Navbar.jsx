import { Link, NavLink, useParams } from "react-router-dom";

const Navbar = ({ linksPosition, backgroundColor, logo, shopName }) => {
  console.log(backgroundColor);
  const { name } = useParams();
  console.log(name);
  const list = (
    <>
      <NavLink
        to={`/w/${name}`}
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

      {/* Dynamic NavLink for SellerWebsite route */}
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
    <nav
      style={{ backgroundColor: `${backgroundColor}` }}
      className={`h-16 `}
    >
      <div className="flex py-2 px-5 h-full">
        <div className=" h-full flex gap-2 items-center">
          <img src={logo} className="h-full" alt="" />
          <h1 className="text-2xl text-white font-bold  capitalize">{shopName}</h1>
        </div>
        <div className={`flex-1 flex  justify-${linksPosition}`}>
          <ul className="flex gap-2 h-full items-center "> {list}</ul>
        </div>
        <div
          className=" h-full flex items-center
         "
        >
          <Link className="h-full" to={`/w/${name}/login`}>
            {" "}
            <button className=" px-3 py-2 bg-black text-sm font-bold text-white rounded-full">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
