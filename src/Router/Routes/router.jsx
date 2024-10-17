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
import BlogManagement from "../../Pages/Dashboard/Seller/BlogManagement";
import PointOfSell from "../../Pages/Dashboard/Seller/PointOfSell";
import ChatUs from "../../Pages/Dashboard/Seller/ChatUs";
import BusinessRevenue from "../../Pages/Dashboard/Seller/BusinessRevenue";
import BmResources from "../../Pages/Dashboard/Seller/BmResources";
import Blogs from "../../Pages/SellerWebsite/Blogs/Blogs";
import ServiceManagement from "../../Pages/Dashboard/Seller/ServiceManagement";
import Services from "../../Pages/SellerWebsite/services/Services";
import ShippingDashboard from "../../Pages/Dashboard/Seller/ShippingDashboard ";
import UserProfileDashboard from "../../Pages/Dashboard/Seller/UserProfileDashboard";
import ConflictReportManagement from "../../Pages/Dashboard/Seller/ConflictReportManagement";
import BusinessAuthorizations from "../../Pages/Dashboard/Seller/BusinessAuthorizations";
import Settings from "../../Pages/Dashboard/Seller/Settings";
import Support from "../../Pages/Dashboard/Seller/Support";
import Process from "../../Pages/Dashboard/Seller/Process";
import Provide from "../../Pages/Dashboard/Seller/Provide";
import PendingOrder from "../../Pages/Dashboard/Seller/PendingOrder";
import Profile from "../../Pages/SellerWebsite/Profile/Profile";
import Cart from "../../Pages/SellerWebsite/Cart/Cart";
import PendingProducts from "../../Pages/SellerWebsite/PendingProducts/PendingProducts";
import Purchased from "../../Pages/SellerWebsite/Purchased/Purchased";
import Shipping from "../../Pages/SellerWebsite/Shipping/Shipping";
import Checkout from "../../Pages/SellerWebsite/CheckOut/CheckOut";
import SignUpCus from "../../Pages/SellerWebsite/Auth/SignUp";
import FeedbackForm from "../../Pages/Feedback/Feedback";

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
            <WebDataDisProvider>
              <DHome />
            </WebDataDisProvider>
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
          {
            path: "/dashboard/pos",
            element: <PointOfSell />,
          },
          {
            path: "/dashboard/pos/provide",
            element: <Provide />,
          },
          {
            path: "/dashboard/messaging",
            element: <ChatUs />,
          },
          {
            path: "/dashboard/logisticsReport",
            element: <ShippingDashboard />,
          },
          {
            path: "/dashboard/pendingOrder",
            element: <PendingOrder />,
          },
          {
            path: "/dashboard/accountManagement",
            element: <UserProfileDashboard />,
          },
          {
            path: "/dashboard/conflictManagement",
            element: <ConflictReportManagement />,
          },
          {
            path: "/dashboard/businessAuthorization",
            element: <BusinessAuthorizations />,
          },
          {
            path: "/dashboard/settings",
            element: <Settings />,
          },

          {
            path: "/dashboard/bm-resources",
            element: <Process />,
          },
          {
            path: "/dashboard/feedback",
            element: <FeedbackForm/>
          },

          {
            path: "/dashboard/marketingBranding",
            element: <Process />,
          },

          {
            path: "/dashboard/coursesTutorials",
            element: <Process />,
          },

          {
            path: "/dashboard/supplyPackaging",
            element: <Process />,
          },

          {
            path: "/dashboard/businessConsulting",
            element: <Process />,
          },

          {
            path: "/dashboard/loansFinance",
            element: <Process />,
          },

          {
            path: "/dashboard/support",
            element: <Support />,
          },

          {
            path: "/dashboard/walletManagement",
            element: <BusinessRevenue />,
          },
          {
            path: "/dashboard/bm-resources",
            element: <BmResources />,
          },
          {
            path: "/dashboard/serviceManagement",
            element: <ServiceManagement />,
          },
          {
            path: "/dashboard/preview&edit",
            element: (
              <WebDataDisProvider>
                <EditWebsite />
              </WebDataDisProvider>
            ),
          },
          {
            path: "/dashboard/blogs",
            element: (
              <WebDataDisProvider>
                <BlogManagement />
              </WebDataDisProvider>
            ),
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
    element: <Layout />,
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
        path: "shipping", // List of products
        element: <Shipping />,
      },
      {
        path: "services", // List of products
        element: <Services />,
      },
      {
        path: "blogs", // List of products
        element: <Blogs />,
      },
      {
        path: "messaging", // List of products
        element: <ChatUs />,
      },
      {
        path: "feedback",
        element: <FeedbackForm/>
      },
      {
        path: "support", // List of products
        element: <Support />,
      },
      {
        path: "profile", // List of products
        element: <Profile />,
      },
      {
        path: "cart", // List of products
        element: <Cart />,
      },
      {
        path: "checkout", // List of products
        element: <Checkout />,
      },
      {
        path: "pending", // List of products
        element: <PendingProducts />,
      },
      {
        path: "purchased", // List of products
        element: <Purchased />,
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
      {
        path: "signup",
        element: <SignUpCus />,
      },
    ],
  },
]);
export default router;
