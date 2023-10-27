import axiosInstance from "../utils/axiosInstance";

//REGISTRATION

export async function register(data) {
  return await axiosInstance.post(`/auth/register`, data);
}

//LOGIN

export async function login(data) {
  return await axiosInstance.post(`/auth/login`, data);
}
