import axiosInstance from "../utils/axiosInstance";

//GET USERS

export async function getUsers() {
  return await axiosInstance.get(`/consultants/get-users`);
}
//GET JOBS

export async function getJobPostings() {
  return await axiosInstance.get(`/consultants/get-job-postings`);
}
//GET JOBS

export async function getApplications() {
  return await axiosInstance.get(`/consultants/get-applications`);
}
//ACTIVATE ACCOUNT

export async function ActivateAccount(accountId) {
  return await axiosInstance.post(`/consultants/approuve-account/${accountId}`);
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
//DESACTIVATE ACCOUNT

export async function DesactivateAccount(accountId) {
  return await axiosInstance.post(`/consultants/desactivate-account/${accountId}`);
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
