import { Outlet, useParams } from "react-router-dom";
import Navbar from "../../../Components/SellerWebPage/Navbar";
import { useContext } from "react";
import { WebDataDisContext } from "../../../Context/WebDataDisContext";

const Layout = () => {
  const { webInfo } = useContext(WebDataDisContext);
  const { name } = useParams();
  console.log(name);
  console.log(webInfo);

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
          <Outlet />
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
