import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://donezo-server-six.vercel.app/",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
