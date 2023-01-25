import http from "./httpServices";
import { getJwt } from "./loginService";

const apiEndpoint = "/users/";

http.setJwt(getJwt());
export async function getAllUsers() {
  const res = await http.get(apiEndpoint + "all");
  return res;
}
export async function getUser() {
  const result = await http.get(apiEndpoint + "me");
  return result;
}
export async function deleteUser() {
  const { data } = await http.delete(apiEndpoint + "me");
  return data;
}
export async function sendRequest(sendingRequest, recievingRequest) {
  await http.post(apiEndpoint + "request", {
    sendingRequest,
    recievingRequest,
  });
}
export async function acceptRequest(friend, acceptingUser, roomCode) {
  await http.post(apiEndpoint + "A_request", {
    friend,
    acceptingUser,
    roomCode,
  });
}
export async function rejectRequest(sender, reciever) {
  await http.post(apiEndpoint + "r_request", { sender, reciever });
}
