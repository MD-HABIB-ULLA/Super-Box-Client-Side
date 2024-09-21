
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
const axiosPublic = useAxiosPublic()
const useSellerRequest = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["seller Request"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/requests`);
      return res.data;
    },
   
  });
  return {data, isLoading,refetch};
};

export default useSellerRequest;
