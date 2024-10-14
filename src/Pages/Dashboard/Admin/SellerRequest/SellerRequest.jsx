import { ImCross } from "react-icons/im";
import Title from "../../../../Components/Common/Title";
import useSellerRequest from "../../../../hooks/useSellerRequest";
import { BsCheck } from "react-icons/bs";
import { useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import {
  X,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SellerRequest = () => {
  const { data, refetch } = useSellerRequest();
  const [detailsData, setDetailsData] = useState();
  const axiosPublic = useAxiosPublic();
  const tableColumn = (
    <>
      <th>Shop Name</th>
      <th>Seller name</th>
      <th className="text-center">Action</th>
    </>
  );

  const handleDetailsBtn = (id) => {
    console.log(id);
    axiosPublic
      .get(`/requestorDetails/${id}`)
      .then((res) => {
        setDetailsData(res.data);

        if (detailsData) {
          document.getElementById("my_modal_2").showModal();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleApprove = (id) => {
    console.log(id);
    if (id) {
      mutateApproveSeller(id); // Trigger the mutation function
    }
  };
  const handleDelete = (id) => {
    console.log(id);
    axiosPublic
      .delete(`/deleteRequest/${id}`)
      .then((res) => {
        toast.success(" successfully deleted");
        refetch()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const {
    mutate: mutateApproveSeller,
    isLoading,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosPublic.post(`/approveSeller/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      console.log("Seller approved successfully:", data);
      toast.success("Seller approved successfully");
      refetch();

      // You can refetch here or handle other success operations
    },
    onError: (error) => {
      console.error("Error approving seller:", error);
    },
  });

  return (
    <div className="mt-10 px-5">
      <Title title1={""} title2={"Seller request"}></Title>

      <div className="overflow-x-auto mt-5">
        <table className="table w-full ">
          {/* head */}
          <thead>
            <tr className="">{tableColumn}</tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.map((info) => (
              <tr className="i" key={info._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={info.webInfo.logo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{info.webInfo.shopName}</div>
                      <div className="text-sm opacity-50">
                        {info.sellerInfo.sellerCountry}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {info.name}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {info.email}
                  </span>
                </td>
                <th className=" flex gap-2 items-center justify-center">
                  <button
                    onClick={() => handleDelete(info._id)}
                    className="btn btn-circle"
                  >
                    <ImCross className="text-red-600"></ImCross>
                  </button>
                  <button
                    onClick={() => handleApprove(info._id)}
                    className="btn btn-circle"
                  >
                    <BsCheck className="text-green-600 text-3xl"></BsCheck>
                  </button>
                </th>
                <th className="">
                  {" "}
                  <button
                    onClick={() => handleDetailsBtn(info._id)}
                    className="btn btn-link"
                  >
                    Details
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* modal =================================================================== */}
      <dialog id="my_modal_2" className="modal">
        {detailsData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-800">
                  Seller Details: {detailsData.name}
                </h2>
                <form method="dialog">
                  <button className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                  </button>{" "}
                </form>
              </div>

              <div className="p-6 space-y-6">
                {/* Seller Information */}
                <section>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Seller Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoItem
                      label="Country"
                      value={detailsData.sellerInfo.sellerCountry}
                    />
                    <InfoItem
                      label="NID Number"
                      value={detailsData.sellerInfo.nidNumber}
                    />
                    <InfoItem
                      label="Address"
                      value={detailsData.sellerInfo.sellerAddress}
                    />
                    <InfoItem
                      label="WhatsApp"
                      value={detailsData.sellerInfo.whatsappNumber}
                    />
                    <InfoItem
                      label="Trade License"
                      value={
                        <a
                          href={detailsData.sellerInfo.tradeLicense}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View License
                        </a>
                      }
                    />
                  </div>
                </section>

                {/* Web Information */}
                <section>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Web Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <InfoItem
                      label="Shop Name"
                      value={detailsData.webInfo.shopName}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Logo
                      </p>
                      <img
                        src={detailsData.webInfo.logo}
                        alt="Shop Logo"
                        className="w-16 h-16 object-cover rounded"
                      />
                    </div>
                  </div>
                </section>

                {/* Banner */}
                <section>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Banner
                  </h3>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h4 className="font-bold text-lg mb-2">
                      {detailsData.webInfo.banner.title}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {detailsData.webInfo.banner.description}
                    </p>
                    <img
                      src={detailsData.webInfo.banner.image}
                      alt="Banner"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                </section>

                {/* Contact Information */}
                <section>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-2 flex justify-between">
                    <InfoItem
                      icon={<MapPin size={18} />}
                      label="Location"
                      value={detailsData.webInfo.contactInfo.location}
                    />
                    <InfoItem
                      icon={<Phone size={18} />}
                      label="Mobile"
                      value={detailsData.webInfo.contactInfo.mobile}
                    />
                    <InfoItem
                      icon={<Mail size={18} />}
                      label="Email Support"
                      value={detailsData.webInfo.contactInfo.emailSupport}
                    />
                  </div>
                </section>

                {/* Social Links */}
                <section>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Social Links
                  </h3>
                  <div className="flex space-x-4">
                    <SocialLink
                      href={detailsData.webInfo?.socialLinks.facebook}
                      icon={<Facebook size={24} />}
                      label="Facebook"
                    />
                    <SocialLink
                      href={detailsData.webInfo?.socialLinks.instagram}
                      icon={<Instagram size={24} />}
                      label="Instagram"
                    />
                    <SocialLink
                      href={detailsData.webInfo?.socialLinks.linkedin}
                      icon={<Linkedin size={24} />}
                      label="LinkedIn"
                    />
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}

        {/* Backdrop for closing the modal */}
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div>
    <p className="text-sm font-medium text-gray-500 mb-1 flex items-center">
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </p>
    <p className="text-gray-700">{value}</p>
  </div>
);
const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
  >
    {icon}
    <span className="sr-only">{label}</span>
  </a>
);
export default SellerRequest;
