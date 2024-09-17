import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Title from "../../../../Components/Common/Title";

const CustomerPanel = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: customers,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["customer"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/customers`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  if (isSuccess && customers) {
    console.log(customers); // Data should be available here
  }
  return (
    <div>
      <div>
        <div className="py-10">
          <Title title1={"All customer"} title2={"Customers"}></Title>
        </div>
        {!isLoading && (
          <div className="px-5">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Customer name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Customer email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Shop name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((data) => (
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

                      <td className="px-6 py-4">
                        <a
                          target="_blank"
                          href={`${window.location.origin}/w/${data?.shopName}`}
                          className="text-blue-600"
                        >
                          {data?.shopName}
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
    </div>
  );
};

export default CustomerPanel;
