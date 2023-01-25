import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ClearIcon from "@material-ui/icons/Clear";
import { getCurrentUser } from "../../utils/loginService";
import chat from "./chat.module.css";

const SidebarChat = ({
  loadChat,
  setFriend,
  user,
  loadAllUsers,
  handleSendRequest,
  handleCancelRequest,
  handleRejection,
  connected,
}) => {
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  const userDefault = getCurrentUser();
  return (
    <>
      {loadAllUsers ? (
        <div className={chat.sidebarChat}>
          <Avatar
            src={`https://avatars.dicebear.com/api/human/
b${seed}.svg`}
          />
          <div className={chat.sidebarChat__info}>
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            {user.friends.find((o) => o.friend._id === userDefault.id) ? (
              <IconButton>
                <PersonAddDisabledIcon />
              </IconButton>
            ) : user.sentRequest.find((o) => o._id === userDefault.id) ? (
              <IconButton
                onClick={() => {
                  handleRejection(user);
                }}
              >
                <CheckCircleOutlineIcon />
              </IconButton>
            ) : user.requests.find((o) => o._id === userDefault.id) ? (
              <IconButton
                onClick={() => {
                  handleCancelRequest(user);
                }}
              >
                <ClearIcon />
              </IconButton>
            ) : (
              <IconButton
                className={chat.toRight}
                onClick={() => {
                  handleSendRequest(user);
                }}
              >
                <PersonAddIcon />
              </IconButton>
            )}
          </div>
        </div>
      ) : (
        <div
          className={chat.sidebarChat}
          onClick={() => {
            loadChat(user.roomCode);
            setFriend(`${user.friend.firstName} ${user.friend.lastName}`);
          }}
        >
          <Avatar
            src={`https://avatars.dicebear.com/api/human/
b${seed}.svg`}
          />
          <div className={chat.sidebarChat__info}>
            <div>
              <h2>
                {" "}
                {user.friend.firstName} {user.friend.lastName}
              </h2>
              <p>Last message...</p>
            </div>
            <div>
              <span>{connected.length > 0 ? "online" : "offline"}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SidebarChat;
