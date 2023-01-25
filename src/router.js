import { createBrowserRouter } from "react-router-dom";
import socket from "./utils/socket.io";
import App from "./App";
import IndexChat from "./component/chat/indexChat";
import Home from "./component/home/Home";
import Login from "./component/login_signup/login";
import SignUp from "./component/login_signup/signup";
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/chat",
    element: <IndexChat socket={socket} />,
  },
]);

export default router;
