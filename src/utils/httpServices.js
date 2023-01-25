import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:4000/";
axios.interceptors.response.use(null, (error) => {
  const expecteError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expecteError) {
    toast.error(error.message);
  }
  return Promise.reject(error);
});
export function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export function setRoomCode(code) {
  axios.defaults.headers.common["roomId"] = code;
}

const exportedObj = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
export default exportedObj;
