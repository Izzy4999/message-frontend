import http from "./httpServices";

const apiEndpoint = "/messages/";

export async function getMessages() {
  const res = await http.get(apiEndpoint);
  return res;
}
export async function sendMessage(roomID) {
  const res = await http.post(apiEndpoint, { id: roomID });
  return res;
}

export async function updateMessage(data) {
  const response = await http.post(apiEndpoint + "update", data);
  return response;
}
export async function getAllMessages() {
  const response = await http.get(apiEndpoint + "all");
  return response.data.data;
}
