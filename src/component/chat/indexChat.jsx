import { useEffect, useState, useRef } from "react";
import { setRoomCode } from "../../utils/httpServices";
import moment from "moment";
import chat from "./chat.module.css";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../utils/loginService";
import { getUser } from "../../utils/users";
import { getMessages, sendMessage, updateMessage } from "../../utils/message";
import ChatSide from "./chatSide";
import Chat from "./chat";

const IndexChat = ({ socket }) => {
  let initialRender = useRef(true);
  const userDefault = getCurrentUser();

  const [value, setValue] = useState({
    message: "",
    from: "",
    time: "",
    date: "",
  });
  const [friend, setFriend] = useState();
  const [typingStatus, setTypingStatus] = useState("");
  const [code, setCode] = useState("");
  const [currentUser, setCurrentUser] = useState();
  // const [generalMesage, setGeneralMessage] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [room_id, setRoom_id] = useState();
  const [messages, setMessages] = useState([]);
  // const [users, setUsers] = useState([]);
  const [isRoom, setIsRoom] = useState(false);
  const [error, setError] = useState(false);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    const user = async () => {
      socket.auth = { username: userDefault.id };
      socket.connect();
      const res = await getUser();
      setUserFriends(res.data.user.friends);
      setRequests(res.data.user.requests);
      setCurrentUser(res.data.user);
    };
    user();
  }, []);

  const handleTyping = () => socket.emit("typing", `typing`);
  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  useEffect(() => {
    socket.on("response_message", (msg) => {
      setMessages([...messages, msg]);
    });
  }, [socket, messages]);

  useEffect(() => {
    if (initialRender.current === true) {
      initialRender.current = false;
    } else {
      const getMessage = async () => {
        if (error) {
          await sendMessage(code);
          setError(false);
        }
      };
      getMessage();
    }
  }, [error, code]);

  useEffect(() => {
    socket.emit("join", room_id);
  }, [socket, room_id]);

  const handleSubmit = async (e, text) => {
    e.preventDefault();
    if (text.message.trim().length > 0) {
      await socket.emit("private_message", { value, room_id: code });
      await updateMessage(value);
      setValue({
        message: "",
        from: "",
        time: "",
        date: "",
      });
    }
  };

  const handleChange = (input) => {
    const val = { ...value };
    val.message = input;
    val.from = userDefault.id;
    val.time = moment().format("LT");
    val.date = moment().format("LL");
    setValue(val);
  };
  const loadChat = async (rmcode) => {
    console.log(rmcode);
    setCode(rmcode);
    setRoom_id(rmcode);
    setRoomCode(rmcode);
    setIsRoom(true);

    try {
      const res = await getMessages();
      setMessages(res.data.data.messages);
      setRoom_id(res.data.data.id);
    } catch (err) {
      if (err && err.response.status === 401) {
        console.log(err);
        setError(true);
      }
    }
  };
  return userDefault ? (
    <div className={chat.app}>
      <div className={chat.app__body}>
        <ChatSide
          users={userFriends}
          loadChat={loadChat}
          setFriend={setFriend}
          requests={requests}
          currentUser={currentUser}
          socket={socket}
        />
        <Chat
          isRoom={isRoom}
          messages={messages}
          userDefault={userDefault}
          typingStatus={typingStatus}
          friend={friend}
          lastMessageRef={lastMessageRef}
          value={value}
          handleChange={handleChange}
          handleTyping={handleTyping}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default IndexChat;
