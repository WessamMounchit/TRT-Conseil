import axiosInstance from "../utils/axiosInstance";

//CREATE CONSULTANT

export async function createConsultant(data) {
  return await axiosInstance.post(`/admin/create-consultant`, data);
}
