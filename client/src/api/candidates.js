import axiosInstance from "../utils/axiosInstance";

//COMPLETE CANDIDATE PROFILE

export async function completeCandidateProfile(data) {
  return await axiosInstance.post(`/candidates/complete-profile`, data);
}

//GET JOB POSTINGS

export async function getJobPostings() {
  return await axiosInstance.get(`/candidates/get-job-postings`);
}

//GET JOB APPLIED

export async function getJobApplied() {
  return await axiosInstance.get(`/candidates/get-jobs-applied`);
}
//CHECK IF ACTIVE

export async function checkIfActive() {
  return await axiosInstance.get(`/candidates/check-account-activation`);
}
//CHECK IF CANDIDATE PROFILE COMPLETE

export async function checkIfCandidateProfileComplete() {
  return await axiosInstance.get(`/candidates/check-profile-completion`);
}

//APPLY TO A JOB

export async function applyToJob(jobId) {
  return await axiosInstance.post(`/candidates/application/${jobId}`);
}
//REMOVE APPLICATION

export async function removeApplication(jobId) {
  return await axiosInstance.delete(`/candidates/remove-application/${jobId}`);
}
