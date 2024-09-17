import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Title from "../../../../Components/Common/Title";

const AllProducts = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: products,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  if (isSuccess && products) {
    console.log(products); // Data should be available here
  }
  return (
    <div className="px-3">
      <div className="py-10">
        <Title title1={"products"} title2={"All Products"}></Title>
      </div>
      <div className=" flex flex-col gap-3">
        {products.map((product) => (
          <div className="border rounded-lg" key={product._id}>
            <div
              className="grid grid-cols-4 gap-3 p-2 text-center
             items-center justify-between"
            >
              <div className="h-20 w-28">
                <img
                  className="h-full w-full object-cover rounded-lg"
                  src={product.image}
                  alt=""
                />
              </div>
              <div>
                <h1>{product.name}</h1>
              </div>

              <div>
                <h1>{product.price}</h1>
              </div>
              <div>
                <h1>{product.shopName}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
