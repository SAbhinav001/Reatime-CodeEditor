import React, { useState } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";

function Editorpage() {
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
