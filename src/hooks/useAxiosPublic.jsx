import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "http://localhost:3000", 
  baseURL: "https://super-box-server-sandy.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
