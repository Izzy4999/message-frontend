import { InsertEmoticon } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import chat from "./chat.module.css";

const ChatFooter = ({ value, handleChange, handleTyping, handleSubmit }) => {
  return (
    <>
      <InsertEmoticon className={chat.icon} />
      <form>
        <input
          onChange={(e) => {
            handleChange(e.currentTarget.value);
          }}
          value={value.message}
          onKeyDown={handleTyping}
          placeholder="Type a message"
          type="text"
        />
        <button
          onClick={(e, text) => {
            handleSubmit(e, value);
          }}
          type="submit"
        >
          Send a message
        </button>
      </form>
      <MicIcon className={chat.icon} />
    </>
  );
};

export default ChatFooter;
