import React, { useState } from "react";
import useChat from "../manageState/useChat.js";
import axios from "axios";

function UseSendConversationMessage() {
    const [Loading, setLoading] = useState(false);

    const { messages, setMessages, selectedChat } = useChat();

    const handleSendMessage = async (message) => {
    
        setLoading(true);
        console.log("Message to send:", message);
        console.log("selectedChat:", selectedChat);

        if (selectedChat && selectedChat._id) {
            try {
                const response = await axios.post(
                    `http://localhost:3000/message/deliverMessage/${selectedChat._id}`,
                    { message },
                    {
                        withCredentials: true
                    }
                );
                setMessages([...messages, response.data.newMessage]);
                setLoading(false);

            } catch (error) {
                console.error("Error sending messages:", error);
                setLoading(false);
            }
        }
    };

    return {
        Loading,
        handleSendMessage
    };
}

export default UseSendConversationMessage;