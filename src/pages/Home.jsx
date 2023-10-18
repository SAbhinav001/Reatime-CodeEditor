import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home() {
  const [roomId, setroomId] = useState("");
  const [username, setuserName] = useState("");
  const navigate = useNavigate();

  const createNewRoom = (e) => {
    e.preventDefault();
    const newRoomId = uuidv4();
    setroomId(newRoomId);
    toast.success("created a new room");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("All fields are required");
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  };

  return (
    <div>
      <div className="homePageWrapper">
        <div className="formWrapper">
          <img
            className="homepageLogo"
            src="/code-sync.png"
            alt="code-sync-logo"
          />
          <h4 className="mainLabel">Paste invitation ROOM ID here...</h4>
          <div className="inputform">
            <input
              type="text"
              className="inputBox"
              placeholder="ROOM ID"
              onChange={(e) => setroomId(e.target.value)}
              value={roomId}
            />
            <input
              type="text"
              className="inputBox"
              onChange={(e) => setuserName(e.target.value)}
              value={username}
              placeholder="USERNAME"
            />
            <button className="btn joinbtn" onClick={joinRoom}>
              JOIN
            </button>
            <span className="createInfo">
              If you don't have an invite then create &nbsp;{" "}
              <a onClick={createNewRoom} href="" className="createNewbtn">
                new room
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
