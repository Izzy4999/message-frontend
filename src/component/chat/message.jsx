import decrypted from "../../utils/encryption";
import chat from "./chat.module.css";

const Message = ({ message, userDefault, friend }) => {
  const decryptedMessage = decrypted(message.message) || message.message;

  return (
    <>
      {userDefault.id === message.from ? (
        <>
          <p className={`${chat.chat__message} ${chat.chat__receiver}`}>
            <span className={chat.chat__name}>
              {userDefault.firstName} {userDefault.lastName}
            </span>
            {decryptedMessage}
            <span className={chat.chat__timestamp}>{message.time}</span>
          </p>
        </>
      ) : (
        <>
          <p className={chat.chat__message}>
            <span className={chat.chat__name}>{friend}</span>
            {decryptedMessage}
            <span className={chat.chat__timestamp}>{message.time}</span>
          </p>
        </>
      )}
    </>
  );
};

export default Message;
