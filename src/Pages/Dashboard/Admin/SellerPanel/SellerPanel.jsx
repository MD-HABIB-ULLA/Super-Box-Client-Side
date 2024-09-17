import { useEffect, useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Title from "../../../../Components/Common/Title";
import { Link } from "react-router-dom";

const SellerPanel = () => {
  const axiosPublic = useAxiosPublic();
  const [webData, setWebData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosPublic.get("/sellerData").then((res) => {
      setWebData(res.data);
      setLoading(false);
    });
  }, [axiosPublic]);
  console.log(webData);
  return (
    <div>
      <div className="py-10">
        <Title title1={"All seller"} title2={"Sellers"}></Title>
      </div>
      {!loading && (
        <div className="px-5">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Seller name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Seller email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    shop name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    website
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {webData.map((data) => (
                  <tr
                    key={data?._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {data?.name}
                    </th>
                    <td className="px-6 py-4">{data?.email}</td>
                    <td className="px-6 py-4">{data?.webInfo.shopName}</td>
                    <td className="px-6 py-4">
                      <a
                      target="_blank"
                        href={`${window.location.origin}/w/${data?.webInfo.shopName}`}
                        className="text-blue-600"
                      > see</a>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerPanel;
