import NavDropdown from "react-bootstrap/NavDropdown";
import { Avatar, IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from "@material-ui/icons/Add";
import chat from "./chat/chat.module.css";

const DropDown = ({
  icon,
  values,
  handleAcceptingRequest,
  handleRejection,
}) => {
  return (
    <NavDropdown
      className={chat.noBorderBox}
      id="nav-dropdown-dark-example"
      title={icon}
      menuVariant="light"
    >
      {values.length > 0 ? (
        values.map((user) => {
          return (
            <NavDropdown.Item>
              <span>
                <Avatar />
              </span>
              {user.firstName} {user.lastName}
              <span>
                <IconButton
                  onClick={() => {
                    handleAcceptingRequest(user);
                  }}
                >
                  <AddIcon />
                </IconButton>
              </span>
              <span>
                <IconButton
                  onClick={() => {
                    handleRejection(user);
                  }}
                >
                  <CancelIcon />
                </IconButton>
              </span>
            </NavDropdown.Item>
          );
        })
      ) : (
        <NavDropdown.Item>No Requests</NavDropdown.Item>
      )}
    </NavDropdown>
  );
};

export default DropDown;
