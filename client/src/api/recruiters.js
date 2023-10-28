import axiosInstance from "../utils/axiosInstance";

//COMPLETE RECRUITER PROFILE

export async function completeRecruiterProfile(data) {
  return await axiosInstance.post(`/recruiters/complete-profile`, data);
}
