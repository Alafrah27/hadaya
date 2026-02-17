import axios from "axios";

const axiosInstance = axios.create({
  // Use import.meta.env instead of process.env for Vite
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api/v1/"
      : "https://hadaya.onrender.com/api/v1/",
  withCredentials: true,
});

export default axiosInstance;
