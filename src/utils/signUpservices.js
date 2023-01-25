import http from "./httpServices";

const apiEndpoint = "/users/signup";

export function register(email, password, firstName, lastName, userName) {
  return http.post(apiEndpoint, {
    email,
    password,
    firstName,
    lastName,
    userName,
  });
}
