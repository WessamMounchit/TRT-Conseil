import axiosInstance from "../utils/axiosInstance";

//GET USERS

export async function getUsers() {
  return await axiosInstance.get(`/consultants/get-users`);
}
//GET JOBS

export async function getJobPostings() {
  return await axiosInstance.get(`/consultants/get-job-postings`);
}
//ACTIVATE ACCOUNT

export async function ActivateAccount(accountId) {
  return await axiosInstance.post(`/consultants/approuve-account/${accountId}`);
}
//APPROVE Job

export async function ApproveJob(jobId) {
  return await axiosInstance.post(`/consultants/approuve-job-posting/${jobId}`);
}
//UNAPPROVE Job

export async function UnapproveJob(jobId) {
  return await axiosInstance.post(`/consultants/unapprouve-job-posting/${jobId}`);
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
