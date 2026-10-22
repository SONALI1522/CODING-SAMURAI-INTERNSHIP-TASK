import React from "react";
import useChat from "../../manageState/useChat.js";
import { useSocketContext } from "../../context/SocketConnectionContext.jsx";
import { UserRound } from "lucide-react";

import "./Left.css";

function user({ user }) {
  const {
    selectedChat,
    setSelectedChat,
    setSelectedRoom,
  } = useChat();

  const isSelected = selectedChat?._id === user._id;

  const { activeUsers } = useSocketContext();

  const isActive = activeUsers.some(
    (id) => String(id) === String(user._id)
  );

  return (
    <div
      className={`flex items-center gap-4 rounded-lg p-2 hover:bg-pink-200
      ${isSelected ? "bg-violet-300" : ""}`}
      onClick={() => {
        setSelectedRoom(null);
        setSelectedChat(user);
      }}
    >
      <div
        className={`avatar ${
          isActive ? "active-user" : "inactive-user"
        }`}
        style={{ marginTop: "10px", cursor: "pointer" }}
      >
        <div className="w-12 h-12 rounded-full flex items-center justify-center">
          <UserRound size={48} className="text-violet-100" />
        </div>
      </div>

      <div>
        <h6>{user.username}</h6>
        <span>{user.email}</span>
      </div>
    </div>
  );
}

export default user;