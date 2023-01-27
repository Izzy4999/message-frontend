import { IconButton } from "@material-ui/core";
import Peer from "simple-peer";
import CallEndIcon from "@material-ui/icons/CallEnd";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import CallIcon from "@material-ui/icons/Call";

import { useState, useRef, useEffect } from "react";

const Video = ({ socket, call }) => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [recievingCall, setRecievingCall] = useState();
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("me", (id) => {
      setMe(id);
    });
    socket.on("callUser", (data) => {
      setRecievingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);
  function callUser(id) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  }
  if (call) {
    callUser();
  }

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <>
      <div>
        {stream && (
          <video
            playsInline
            muted
            ref={myVideo}
            autoplay
            style={{ width: "300px" }}
          />
        )}
      </div>
      <div>
        {callAccepted && !callEnded ? (
          <video
            playsInline
            ref={userVideo}
            autoplay
            style={{ width: "300px" }}
          />
        ) : null}
      </div>
      <div>
        {callAccepted && !callEnded ? (
          <IconButton
            onClick={() => {
              leaveCall();
            }}
          >
            <CallEndIcon />
          </IconButton>
        ) : (
          <IconButton>
            <CallIcon />
          </IconButton>
        )}
      </div>
      <div>
        {recievingCall && !callAccepted ? (
          <div>
            <h1>is calling</h1>
            <IconButton
              onClick={() => {
                answerCall();
              }}
            >
              <CallIcon />
            </IconButton>
          </div>
        ) : null}
      </div>
    </>
  );
};
export default Video;
