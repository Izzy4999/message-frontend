import http from "./httpServices";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/users/login";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(userName, password) {
  const { data } = await http.post(apiEndpoint, { userName, password });
  localStorage.setItem(tokenKey, data.data.token);
}

export function loginwithjwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem("room");
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (err) {
    return null;
  }
}
export function getJwt() {
  return localStorage.getItem(tokenKey);
}
