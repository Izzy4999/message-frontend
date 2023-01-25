// import pic from "../../assests/5604040-removebg-preview.png";
import ChatBody from "./chatBody";
import chat from "./chat.module.css";

const Chat = ({
  isRoom,
  messages,
  userDefault,
  typingStatus,
  friend,
  lastMessageRef,
  value,
  handleChange,
  handleTyping,
  handleSubmit,
}) => {
  return (
    <>
      {isRoom ? (
        <>
          <ChatBody
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
        </>
      ) : (
        <div className={chat.chat}>
          {/* <img src={pic} alt="chat_bubble" className={chat.chat_img} /> */}
        </div>
      )}
    </>
  );
};

export default Chat;
