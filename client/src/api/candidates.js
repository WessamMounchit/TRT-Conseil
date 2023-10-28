import axiosInstance from "../utils/axiosInstance";

//CREATE CONSULTANT

export async function completeCandidateProfile(data) {
  return await axiosInstance.post(`/candidates/complete-profile`, data);
}
