import React, { useState, useRef, useEffect } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import ACTIONS from "../Actions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function Editorpage() {
  const socketRef = useRef(null);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later");
        navigate("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });
    };
    init();
  }, []);

  const [clients, setClient] = useState([
    {
      socketId: 1,
      username: "abhinav",
    },
    {
      socketId: 2,
      username: "shrivastav",
    },
  ]);
  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className="logoimg" src="/code-sync.png" alt="Logoimg" />
          </div>
          <h3>Connected</h3>
          <div className="clientList">
            {clients.map((client) => {
              return (
                <Client key={client.socketId} username={client.username} />
              );
            })}
          </div>
        </div>
        <button className="btn copybtn">Copy Room ID</button>
        <button className="btn leavebtn">Leave</button>
      </div>
      <div className="editorWrap">
        <Editor />
      </div>
    </div>
  );
}

export default Editorpage;
