import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_URL
      : "http://localhost:8000",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = secureLocalStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
