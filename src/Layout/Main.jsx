import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Components/Common/Footer";
import Navbar from "../Components/Common/Navbar";

const Main = () => {
  const url = useLocation();
  console.log();
  return (
    <div>
      <Navbar />
      <div className=" min-h-screen">
        <Outlet />
      </div>
      {!url.pathname.startsWith("/dashboard") && <Footer />}
    </div>
  );
};

export default Main;
