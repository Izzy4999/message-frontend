import { useState, useEffect } from "react";
import swal from "sweetalert";
import CancelIcon from "@material-ui/icons/Cancel";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import Pusher from "pusher-js";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import chat from "./chat.module.css";
import SidebarChat from "./sideBarChat";
import { logout } from "../../utils/loginService";
import DropDown from "../dropDown";
import {
  acceptRequest,
  getAllUsers,
  rejectRequest,
  sendRequest,
} from "../../utils/users";
import { getRoomId } from "../../utils/room";

const ChatSide = ({
  users,
  loadChat,
  setFriend,
  requests,
  currentUser,
  socket,
}) => {
  const [allUsers, setAllUsers] = useState([]);
  const [loadUsers, setLoadUsers] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    const user = async () => {
      const res = await getAllUsers();
      setAllUsers(res.data.users);
    };
    if (loadChat) {
      console.log(`a aki`);
      user();
    }
  });
  useEffect(() => {
    socket.on("users", (users) => {
      setConnectedUsers(users);
    });
  });
  // useEffect(() => {
  //   socket.on("connect", () => {
  //     users.forEach((user) => {
  //       if (user.self) {
  //         user.connected = true;
  //       }
  //     });
  //   });

  //   socket.on("disconnect", () => {
  //     users.forEach((user) => {
  //       if (user.self) {
  //         user.connected = false;
  //       }
  //     });
  //   });
  // }, [socket, users]);
  // useEffect(() => {
  //   var pusher = new Pusher("9d8edb5e61dc6badf395", {
  //     cluster: "ap2",
  //   });
  //   const channel = pusher.subscribe("user");
  //   channel.bind("inserted", (data) => {
  //     setAllUsers([...allUsers, data]);
  //   });
  //   return () => {
  //     channel.unbind_all();
  //     channel.unsubscribe();
  //   };
  // }, [allUsers]);
  console.log(isClicked);
  const handleSendRequest = async (user) => {
    await sendRequest(currentUser, user);
  };
  const handleAcceptingRequest = async (user) => {
    await acceptRequest(user, currentUser, getRoomId());
  };
  const handleRejection = async (user) => {
    await rejectRequest(user, currentUser);
  };
  const handleCancelRequest = async (user) => {
    await rejectRequest(currentUser, user);
  };
  return (
    <div className={chat.sidebar}>
      <div className={chat.sidebar__header}>
        <Avatar />
        <div className={chat.sidebar__headerRight}>
          <DropDown
            icon={
              <>
                <IconButton>
                  <DonutLargeIcon />
                  {requests.length > 0 && (
                    <span className="badge badge-pill badge-dark">
                      {requests.length}
                    </span>
                  )}
                </IconButton>
              </>
            }
            values={requests}
            handleAcceptingRequest={handleAcceptingRequest}
            handleRejection={handleRejection}
          />
          {loadUsers ? (
            <IconButton
              onClick={() => {
                setLoadUsers(false);
              }}
            >
              <CancelIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                setLoadUsers(true);
              }}
            >
              <ChatIcon />
            </IconButton>
          )}

          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              swal("Successful", "You have Logged out!", "success").then(() => {
                logout();
                window.location = "/login";
              });
            }}
          >
            <ExitToAppIcon />
          </IconButton>
        </div>
      </div>
      <div className={chat.sidebar__search}>
        <div className={chat.sidebar__searchContainer}>
          <SearchOutlined className={chat.icon} />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className={chat.sidebar__chats}>
        {loadUsers
          ? allUsers
              .filter((c) => c._id !== currentUser._id)
              .map((users) => {
                return (
                  <SidebarChat
                    key={users._id}
                    user={users}
                    loadAllUsers={loadUsers}
                    handleSendRequest={handleSendRequest}
                    handleCancelRequest={handleCancelRequest}
                    handleRejection={handleRejection}
                    setIsClicked={setIsClicked}
                    isClicked={isClicked}
                  />
                );
              })
          : users.map((user) => {
              return (
                <SidebarChat
                  key={user.friend._id}
                  user={user}
                  loadChat={loadChat}
                  setFriend={setFriend}
                  loadAllUsers={loadUsers}
                  connected={connectedUsers.filter(
                    (c) => c.username === user.friend._id
                  )}
                />
              );
            })}
      </div>
    </div>
  );
};

export default ChatSide;
