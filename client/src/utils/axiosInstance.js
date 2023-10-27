import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { apiBaseUrl } from "../config";

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
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
