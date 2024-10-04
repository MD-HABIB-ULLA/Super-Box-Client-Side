import { AiOutlineProduct } from "react-icons/ai";
import {
  FaCrown,
  FaEdit,
  FaHome,
  FaReceipt,
  FaRegQuestionCircle,
  FaTruck,
} from "react-icons/fa";
import { GrAtm, GrResources } from "react-icons/gr";
import { HiChatBubbleLeftRight, HiUserGroup } from "react-icons/hi2";
import {
  MdAccountBalanceWallet,
  MdAddBusiness,
  MdAttachMoney,
  MdBusinessCenter,
  MdHomeRepairService,
  MdLocalOffer,
  MdManageAccounts,
  MdOutlineInventory2,
  MdOutlineSupportAgent,
  MdPointOfSale,
  MdReportProblem,
  MdSchool,
  MdSettings,
  MdVerified,
} from "react-icons/md";
import { TbLogs } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../../hooks/useRole";
import { CiTimer } from "react-icons/ci";

const DHome = () => {
  const { isAdmin, isSeller } = useRole();
  const sellerNavLinks = (
    <>
      {/* Part 1: Main E-commerce Functionalities */}
      <div>
        <h1 className="text-base font-bold mb-2">
          Main E-commerce Functionalities
        </h1>
        <div className="pl-4 border-l-2 border-black ">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `p-2 text-lg rounded-sm ${isActive ? " bg-gray-600/30" : ""}`
              }
              end // Makes sure this matches exactly for /dashboard
            >
              <FaHome className="text-3xl text-[#ED7725]" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/preview&edit"
              className={({ isActive }) =>
                `p-2 text-lg rounded-sm ${isActive ? " bg-gray-600/30" : ""}`
              }
            >
              <FaEdit className="text-3xl text-[#ED7725]" />
              Website Preview and Edit
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/productManagement"
              className={({ isActive }) =>
                `p-2 text-lg rounded-sm ${isActive ? " bg-gray-600/30" : ""}`
              }
            >
              <AiOutlineProduct className="text-3xl text-[#ED7725]" />
              Product Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/serviceManagement"
              className={({ isActive }) =>
                `p-2 text-lg rounded-sm ${isActive ? "bg-gray-600/30" : ""}`
              }
            >
              <MdHomeRepairService className="text-3xl text-[#ED7725]" />
              Service Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/pendingOrder"
              className={({ isActive }) =>
                `p-2 text-lg rounded-sm ${isActive ? "bg-gray-600/30" : ""}`
              }
            >
              <CiTimer className="text-3xl text-[#ED7725]" />
              Pending orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/blogs"
              className={({ isActive }) =>
                `p-2 text-lg rounded-sm ${isActive ? "bg-gray-600/30" : ""}`
              }
            >
              <TbLogs className="text-3xl text-[#ED7725]" />
              Blogs Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/walletManagement"
              className={({ isActive }) =>
                `p-2 text-lg rounded-sm ${isActive ? " bg-gray-600/30" : ""}`
              }
            >
              <MdAccountBalanceWallet className="text-3xl text-[#ED7725]" />
              Wallet Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/logisticsReport"
              className={({ isActive }) =>
                `p-2 text-lg rounded-sm ${isActive ? "bg-gray-600/30" : ""}`
              }
            >
              <FaTruck className="text-3xl text-[#ED7725]" />
              Logistics Report
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/messaging"
              className={({ isActive }) =>
                `p-2 text-lg rounded-sm ${isActive ? "bg-gray-600/30" : ""}`
              }
            >
              <HiChatBubbleLeftRight className="text-3xl text-[#ED7725]" />
              Messaging
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/pos"
              className={({ isActive }) =>
                `p-2 text-lg rounded-sm ${isActive ? "bg-gray-600/30" : ""}`
              }
            >
              <FaReceipt className="text-3xl text-[#ED7725]" />
              Point Of Sell (pos)
            </NavLink>
          </li>
        </div>
      </div>

      {/* Part 2: Account Management and Support */}
      <h1 className="text-base font-bold my-2">
        Account Management and Support
      </h1>
      <div className="pl-4 border-l-2 border-black ">
        <li>
          <NavLink
            to="/dashboard/accountManagement"
            className={({ isActive }) =>
              `p-2 text-lg rounded-sm ${isActive ? "bg-gray-600/30" : ""}`
            }
          >
            <MdManageAccounts className="text-3xl text-[#ED7725]" />
            Account Management <FaCrown />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/conflictManagement"
            className={({ isActive }) =>
              `p-2 text-lg rounded-sm ${isActive ? "bg-gray-600/30" : ""}`
            }
          >
            <MdReportProblem className="text-3xl text-[#ED7725]" />
            Conflict Report & Management <FaCrown />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/businessAuthorization"
            className={({ isActive }) =>
              `p-2 text-lg rounded-sm ${isActive ? "bg-gray-600/30" : ""}`
            }
          >
            <MdVerified className="text-3xl text-[#ED7725]" />
            Business Authorizations
            <FaCrown />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/support"
            className={({ isActive }) =>
              `p-2 text-lg rounded-sm ${isActive ? "bg-gray-600/30" : ""}`
            }
          >
            <MdSettings className="text-3xl text-[#ED7725]" />
            Support <FaCrown />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `p-2 text-lg rounded-sm ${isActive ? "bg-gray-600/30" : ""}`
            }
          >
            <MdSettings className="text-3xl text-[#ED7725]" />
            Settings <FaCrown />
          </NavLink>
        </li>
      </div>

      <h1 className="text-base font-bold my-2">
        Business Development and Management Support
      </h1>
      <div className="pl-4 border-l-2 border-black ">
        <li>
          <NavLink
            to="/dashboard/bm-resources"
            className={({ isActive }) =>
              `p-2 text-lg rounded-sm ${isActive ? "bg-gray-600/30" : ""}`
            }
          >
            <MdBusinessCenter className="text-3xl text-[#ED7725]" />
            Business Development & Management <FaCrown />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/marketingBranding"
            className={({ isActive }) =>
              `p-2 text-lg rounded-sm ${isActive ? "bg-gray-600/30" : ""}`
            }
          >
            <MdLocalOffer className="text-3xl text-[#ED7725]" />
            Marketing & Branding <FaCrown />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/supplyPackaging"
            className={({ isActive }) =>
              `p-2 text-lg rounded-sm ${isActive ? "bg-gray-600/30" : ""}`
            }
          >
            <MdOutlineInventory2 className="text-3xl text-[#ED7725]" />
            Supply Packaging <FaCrown />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/coursesTutorials"
            className={({ isActive }) =>
              `p-2 text-lg rounded-sm ${isActive ? "bg-gray-600/30" : ""}`
            }
          >
            <MdSchool className="text-3xl text-[#ED7725]" />
            Courses & Tutorials <FaCrown />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/businessConsulting"
            className={({ isActive }) =>
              `p-2 text-lg rounded-sm ${isActive ? "bg-gray-600/30" : ""}`
            }
          >
            <MdOutlineSupportAgent className="text-3xl text-[#ED7725]" />
            Business Consulting <FaCrown />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/loansFinance"
            className={({ isActive }) =>
              `p-2 text-lg rounded-sm ${isActive ? "bg-gray-600/30" : ""}`
            }
          >
            <MdAttachMoney className="text-3xl text-[#ED7725]" />
            Loans & Finance <FaCrown />
          </NavLink>
        </li>
      </div>
    </>
  );

  const userNavLinks = (
    <li>
      <NavLink to="/" className={`p-2 text-lg rounded-sm`}>
        <MdAddBusiness className="text-3xl" />
        Create a website
      </NavLink>
    </li>
  );
  const adminNavLinks = (
    <>
      <li className="menu p-0">
        <details>
          <summary className="px-3 rounded-sm">
            <NavLink
              className={` text-lg flex flex-row justify-between items-center gap-2`}
            >
              <HiUserGroup className="text-3xl" />
              All Users
            </NavLink>
          </summary>
          <ul className="text-lg">
            <li>
              <NavLink to={"/dashboard/seller-panel"}>Seller Panel</NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/customer-panel"}>Customer Panel</NavLink>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <NavLink
          to="/dashboard/all-products"
          className={`p-2 text-lg rounded-sm`}
        >
          <AiOutlineProduct className="text-3xl" />
          All Products
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/transaction"
          className={`p-2 text-lg rounded-sm`}
        >
          <TbLogs className="text-3xl" />
          Selling details
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/pos" className={`p-2 text-lg rounded-sm`}>
          <GrAtm className="text-3xl" />
          Wallet
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/seller-request"
          className={`p-2 text-lg rounded-sm`}
        >
          <FaRegQuestionCircle className="text-3xl" />
          Seller Request
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/bm-resources"
          className={`p-2 text-lg rounded-sm`}
        >
          <GrResources className="text-3xl" />
          Reports And Issues
        </NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          <div>
            <Outlet />
          </div>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {isAdmin ? adminNavLinks : isSeller ? sellerNavLinks : userNavLinks}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DHome;
