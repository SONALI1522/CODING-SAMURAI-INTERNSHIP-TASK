import React from "react";
import Find from "./Find";
import "./Left.css";
import "../../App.css";
import Users from "./Users";
import Logout from "./Logout.jsx";
import RoomList from "./RoomListView.jsx";
import useChat from "../../manageState/useChat.js";
function left() {
  const { setSelectedRoom, setSelectedChat } = useChat();
  return (
    <>
    <div className="chats  w-full">
      <div className="threadheader">
       <h4 className="mt-3">Threads</h4> 
       <Logout></Logout>
      </div>
       <Find></Find>
        <RoomList onSelectRoom={(room) => {
          setSelectedChat(null);
          setSelectedRoom(room);
        }} />
       <Users></Users>
    </div>
    </>
  );
}
export default left;