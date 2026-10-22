import React from "react";
import UseChat from "../../manageState/useChat";
import {useSocketContext} from "../../context/SocketConnectionContext.jsx";
import { UserRound } from "lucide-react";
import "./Right.css";
function ConversationUser(){
  const {selectedChat} = UseChat();
  const {activeUsers} = useSocketContext();
 const getActiveUserStatus = (userId) => {
  return activeUsers.some(
    (id) => String(id) === String(userId)
  )
    ? "active-user 🔆💚"
    : "Inactive-user 🌚💤";
 };
    return (
    <>
     <div className="flex bg-white/19 p-2">
      <div className={`avatar online`} style={{marginTop:"10px", cursor:"pointer"}}>
      <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
        <UserRound size={48} className="text-pink-300" />
      </div>
      </div>
      <div className="mt-5 ms-2" >
        <h2 style={{ fontSize: "25px" }}>{selectedChat?.username}</h2>
        <span style={{ fontSize: "18px" }}
        >
          {getActiveUserStatus(selectedChat?._id)}
        </span>
      </div>
     </div>
     <div>
     </div>
    </>
    )
}
export default ConversationUser;