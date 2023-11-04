import axiosInstance from "../utils/axiosInstance";

//GET CANDIDATES

export async function getCandidates() {
  return await axiosInstance.get(`/consultants/get-candidates`);
}

//GET CANDIDATES

export async function getRecruiters() {
  return await axiosInstance.get(`/consultants/get-recruiters`);
}
//GET JOBS

export async function getJobPostings() {
  return await axiosInstance.get(`/consultants/get-job-postings`);
}
//GET JOBS

export async function getApplications() {
  return await axiosInstance.get(`/consultants/get-applications`);
}
//ACTIVATE CANDIDATE ACCOUNT

export async function activeCandidateAccount(accountId) {
  return await axiosInstance.post(`/consultants/approve-candidate/${accountId}`);
}

//ACTIVATE CANDIDATE ACCOUNT

export async function activeRecruiterAccount(accountId) {
  return await axiosInstance.post(`/consultants/approve-recruiter/${accountId}`);
}
//APPROVE JOB

export async function ApproveJob(jobId) {
  return await axiosInstance.post(`/consultants/approuve-job-posting/${jobId}`);
}
//APPROVE APPLICATION

export async function ApproveApplication(applicationId) {
  return await axiosInstance.post(`/consultants/approuve-application/${applicationId}`);
}
//UNAPPROVE JOB

export async function UnapproveJob(jobId) {
  return await axiosInstance.post(`/consultants/unapprouve-job-posting/${jobId}`);
}
//UNAPPROVE APPLICATION

export async function UnapproveApplication(applicationId) {
  return await axiosInstance.post(`/consultants/unapprouve-application/${applicationId}`);
}
//DESACTIVATE CANDIDATE ACCOUNT

export async function desactiveCandidateAccount(accountId) {
  return await axiosInstance.post(`/consultants/desactivate-candidate-account/${accountId}`);
}
//DESACTIVATE CANDIDATE ACCOUNT

export async function desactiveRecruiterAccount(accountId) {
  return await axiosInstance.post(`/consultants/desactivate-recruiter-account/${accountId}`);
}
//DELETE ACCOUNT

export async function deleteAccount(accountId) {
  return await axiosInstance.delete(`/consultants/delete-user/${accountId}`);
}
//DELETE JOB

export async function deleteJob(jobId) {
  return await axiosInstance.delete(`/consultants/delete-job/${jobId}`);
}
//DELETE APPLICATION

export async function deleteApplication(applicationId) {
  return await axiosInstance.delete(`/consultants/delete-application/${applicationId}`);
}
