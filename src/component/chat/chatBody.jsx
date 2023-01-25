import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined, Call } from "@material-ui/icons";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import chat from "./chat.module.css";
import Message from "./message";
import ChatFooter from "./chatFooter";

const ChatBody = ({
  friend,
  typingStatus,
  messages,
  userDefault,
  lastMessageRef,
  value,
  handleChange,
  handleTyping,
  handleSubmit,
}) => {
  return (
    <>
      <div className={chat.chat}>
        <div className={chat.chat__header}>
          <Avatar
            src={`https://avatars.dicebear.com/api/human/
b.svg`}
          />
          <div className={chat.chat__headerInfo}>
            <h3>{friend}</h3>
            <p>{typingStatus}</p>
          </div>
          <div className={chat.chat__headerRight}>
            <IconButton>
              <VideoCallIcon />
            </IconButton>
            <IconButton>
              <Call />
            </IconButton>
            <IconButton>
              <SearchOutlined />
            </IconButton>
            <IconButton>
              <AttachFile />
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
        </div>
        <div className={chat.chat__body}>
          {messages.map((message, index) => {
            return (
              <Message
                key={index}
                message={message}
                userDefault={userDefault}
                friend={friend}
              />
            );
          })}
          <div ref={lastMessageRef} />
        </div>
        <div className={chat.chat__footer}>
          <ChatFooter
            value={value}
            handleChange={handleChange}
            handleTyping={handleTyping}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default ChatBody;
