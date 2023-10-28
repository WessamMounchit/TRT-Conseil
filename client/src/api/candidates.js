import axiosInstance from "../utils/axiosInstance";

//COMPLETE CANDIDATE PROFILE

export async function completeCandidateProfile(data) {
  return await axiosInstance.post(`/candidates/complete-profile`, data);
}
