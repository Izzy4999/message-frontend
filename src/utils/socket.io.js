import { io } from "socket.io-client";

const URL = "http://localhost:4000";
const socket = io(URL, { autoConnect: false });

/*socket.on("connect", () => {
  this.users.forEach((user) => {
    if (user.self) {
      user.connected = true;
    }
  });
});

socket.on("disconnect", () => {
  this.users.forEach((user) => {
    if (user.self) {
      user.connected = false;
    }
  });
});*/
export default socket;
