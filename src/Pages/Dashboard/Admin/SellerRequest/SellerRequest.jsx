import { ImCross } from "react-icons/im";
import Title from "../../../../Components/Common/Title";
import useSellerRequest from "../../../../hooks/useSellerRequest";

const SellerRequest = () => {
  const { data } = useSellerRequest();
  console.log(data);
  const tableColumn = (
    <>
      <th>Shop Name</th>
      <th>Seller name</th>
      <th>Subscription</th>
      <th>Action</th>
    </>
  );
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
                      <div className="text-sm opacity-50">{info.sellerInfo.sellerCountry}</div>
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
                <td>Purple</td>
                <th className="">
                  <button className="btn btn-circle">
                    <ImCross className="text-red-600"></ImCross>
                  </button>
                </th>
                <th className="">
                  {" "}
                  <button className="btn btn-link">Details</button>
                </th>
              </tr>
            ))}
          </tbody>
       
        </table>
      </div>
    </div>
  );
};

export default SellerRequest;
