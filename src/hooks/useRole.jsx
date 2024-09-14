import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";

const useRole = () => {
  const { user, loading } = useContext(AuthContext);
 
  const axiosPublic = useAxiosPublic();
  const { data: role, isPending: isRoleLoading } = useQuery({
    queryKey: [user?.email, "userRole"],
    enabled: !!user?.email,
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosPublic.get(`/users/role/${user?.email}`);
        return res.data?.role;
      }
    },
  });
  console.log(role);
  const isAdmin = role === "admin";
  const isSeller = role === "seller";

  return [isAdmin, isSeller, isRoleLoading, role];
};

export default useRole;
