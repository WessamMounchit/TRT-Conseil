import axiosInstance from "../utils/axiosInstance";

//COMPLETE RECRUITER PROFILE

export async function completeRecruiterProfile(data) {
  return await axiosInstance.post(`/recruiters/complete-profile`, data);
}
//POST A JOB

export async function createJobOffer(data) {
  return await axiosInstance.post(`/recruiters/create-job-offer`, data);
}
