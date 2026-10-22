import React from "react";
import "./Right.css";
import "../../App.css";
import { useAuth } from "../../context/useAuthUsers.jsx";
import UseChat from "../../manageState/useChat.js";
import ConversationUser from "./conversationUser.jsx";
import ChatMessages from "./ChatMessages.jsx";
import MessageType from "./messageType.jsx";
import RoomChat from "./RoomChat.jsx";

function Right() {
    const { selectedChat, selectedRoom } = UseChat();

    if (selectedRoom) {
        return (
            <div className="chatWindow">
                <RoomChat room={selectedRoom} />
            </div>
        );
    }

    return (
        <>
            {!selectedChat ? (
                <EmptyConversation />
            ) : (
                <div className="chatWindow">
                    <ConversationUser />
                    <div className="chatMessages">
                        <ChatMessages />
                    </div>
                    <MessageType />
                </div>
            )}
        </>
    );
}

export default Right;

const EmptyConversation = () => {
    const { authUser } = useAuth();

    return (
        <div className="emptyConversation">
            <div className="emptyContent">
                <div className="emptyIcon">💬</div>

                <h1>
                    Welcome <span>{authUser?.username} ✨</span>
                </h1>

                <p>No conversation selected</p>

                <small>
                    Select a conversation or a room to start chatting.
                </small>
            </div>
        </div>
    );
};
