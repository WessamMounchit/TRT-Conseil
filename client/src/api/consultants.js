import axiosInstance from "../utils/axiosInstance";

//GET USERS

export async function getUsers() {
  return await axiosInstance.get(`/consultants/get-users`);
}
//ACTIVATE ACCOUNT

export async function ActivateAccount(accountId) {
  return await axiosInstance.post(`/consultants/approuve-account/${accountId}`);
}
//DESACTIVATE ACCOUNT

export async function DesactivateAccount(accountId) {
  return await axiosInstance.post(`/consultants/desactivate-account/${accountId}`);
}
//DELETE ACCOUNT

export async function deleteAccount(accountId) {
  return await axiosInstance.delete(`/consultants/delete-user/${accountId}`);
}
