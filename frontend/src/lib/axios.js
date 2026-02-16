import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://hadaya.onrender.com/api/v1/",
  withCredentials: true,
});

export default axiosInstance;
// hell