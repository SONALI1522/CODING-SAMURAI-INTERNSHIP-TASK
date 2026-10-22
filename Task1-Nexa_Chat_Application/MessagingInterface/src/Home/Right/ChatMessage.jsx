import React from "react";
import { useAuth } from "../../context/useAuthUsers";

function ChatMessage({ message }) {
    const { authUser } = useAuth();

    if (!authUser) {
        return null;
    }

    const itsme =
        message.fromUserId.toString() === authUser._id.toString();

    const chatName = itsme ? "chat-end" : "chat-start";
    const Color = itsme? "bg-pink-200": "bg-fuchsia-200";
    const createdAt = new Date(message.createdAt);
    const formattedTimestamp = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    });

    return (
      <>
       <div className={`chat ${chatName} mb-3`}>
        <div>
          <div className={`chat-bubble text-black p-3 max-w-xs ${Color}`}>{message.message}</div>
        </div>
        <div className="text-xs text-black-400 mt-1 px-1">
          {formattedTimestamp}
        </div>
       </div>
     </>
    );
}
export default ChatMessage;