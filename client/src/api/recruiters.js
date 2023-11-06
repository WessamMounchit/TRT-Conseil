import axiosInstance from "../utils/axiosInstance";

//COMPLETE RECRUITER PROFILE

export async function completeRecruiterProfile(data) {
  return await axiosInstance.post(`/recruiters/complete-profile`, data);
}
//POST A JOB

export async function createJobOffer(data) {
  return await axiosInstance.post(`/recruiters/create-job-offer`, data);
}
//GET JOBS

export async function getJobs() {
  return await axiosInstance.get(`/recruiters/get-job-postings`);
}
//GET CANDIDATES BY JOB

export async function getCandidates(jobId) {
  return await axiosInstance.get(`/recruiters/get-candidates/${jobId}`);
}

//CHECK IF RECRUITERS ACTIVE

export async function checkIfRecruiterActive() {
  return await axiosInstance.get(`/recruiters/check-account-activation`);
}
//CHECK IF RECRUITERS PROFILE COMPLETE

export async function checkIfRecruiterProfileComplete() {
  return await axiosInstance.get(`/recruiters/check-profile-completion`);
}

