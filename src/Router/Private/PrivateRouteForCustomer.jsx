import { Navigate, useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { useContext } from "react";
const PrivateRouteForCustomer = ({children}) => {
  const { user } = useContext(AuthContext);

  const location = useLocation();
  const {name} = useParams()
  if (user) {
    return children;
  } else {
    return <Navigate state={location.pathname} to={`/w/${name}/login`}></Navigate>;
  }
};

export default PrivateRouteForCustomer;
