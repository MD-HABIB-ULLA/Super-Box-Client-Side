import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/auth/Login";
import SignUp from "../../Pages/auth/SignUp";
import DHome from "../../Pages/Dashboard/DHome";
import CreateWebsite from "../../Pages/Dashboard/Seller/CreateWebsite";
import PrivateRoute from "../Private/PrivateRoute";
import Layout from "../../Pages/SellerWebsite/Layout/Layout";
import SellerWebsite from "../../Pages/SellerWebsite/Home/SellerWebsite";
import useRole from "../../hooks/useRole";
import EditWebsite from "../../Pages/Dashboard/Seller/EditWebsite";
import Products from "../../Pages/SellerWebsite/Products/Products";
import WebDataDisProvider from "../../Context/WebDataDisContext";
import LoginCus from "../../Pages/SellerWebsite/Auth/Login";
import ProductManagement from "../../Pages/Dashboard/Seller/ProductManagement";
import ProductDetails from "../../Pages/SellerWebsite/ProductDetails/ProductDetails";
import SellerPanel from "../../Pages/Dashboard/Admin/SellerPanel/SellerPanel";
import CustomerPanel from "../../Pages/Dashboard/Admin/CustomerPanel/CustomerPanel";
import AllProducts from "../../Pages/Dashboard/Admin/AllProducts/AllProducts";
import Transaction from "../../Pages/Dashboard/Transaction";
import PrivateRouteForCustomer from "../Private/PrivateRouteForCustomer";
import SellerDetails from "../../Pages/Dashboard/Seller/SellerDetails";
import SellerRequest from "../../Pages/Dashboard/Admin/SellerRequest/SellerRequest";
import SellerDHome from "../../Pages/Dashboard/Seller/SellerDHome";
const RoleBasedComponent = () => {
  const { isAdmin, isSeller } = useRole();

  if (isAdmin) {
    return <div>Hello, Admin</div>;
  }

  if (isSeller) {
    return (
      <WebDataDisProvider>

        <SellerDHome />
      </WebDataDisProvider>
    );
  }

  return <CreateWebsite />;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DHome />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: <RoleBasedComponent />,
          },
          {
            path: "/dashboard/productManagement",
            element: <ProductManagement />,
          },
          {
            path: "/dashboard/seller-panel",
            element: <SellerPanel />,
          },
          {
            path: "/dashboard/customer-panel",
            element: <CustomerPanel />,
          },
          {
            path: "/dashboard/all-products",
            element: <AllProducts />,
          },
          {
            path: "/dashboard/transaction",
            element: <Transaction />,
          },
          {
            path: "/dashboard/seller-details/:email",
            element: <SellerDetails />,
          },
          {
            path: "/dashboard/seller-request",
            element: <SellerRequest />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/w/:name",
    element: (
      <WebDataDisProvider>
        <Layout />
      </WebDataDisProvider>
    ),
    children: [
      {
        path: "",
        element: <SellerWebsite />,
      },
      {
        path: "products", // List of products
        element: <Products />,
      },
      {
        path: "products/:id",
        element: (
          <PrivateRouteForCustomer>
            {" "}
            <ProductDetails />
          </PrivateRouteForCustomer>
        ),
      },
      {
        path: "login",
        element: <LoginCus />,
      },
    ],
  },
]);
export default router;
