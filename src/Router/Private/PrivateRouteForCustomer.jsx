import { Navigate, useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { useContext } from "react";
const PrivateRouteForCustomer = () => {
  const { customerInfo } = useContext(AuthContext);
  const location = useLocation();
  const {name} = useParams()
  if (customerInfo) {
    return children;
  } else {
    return <Navigate state={location.pathname} to={`/w/${name}/login`}></Navigate>;
  }
};

export default PrivateRouteForCustomer;
