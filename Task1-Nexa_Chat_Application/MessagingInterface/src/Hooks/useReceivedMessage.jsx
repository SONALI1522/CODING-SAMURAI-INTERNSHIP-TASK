import { useEffect, useState } from "react";
import axios from "axios";
import useChat from "../manageState/useChat.js";

function useReceivedMessage() {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedChat } = useChat();

    useEffect(() => {
        let cancelled = false;
        setMessages([]);

        if (!selectedChat?._id) {
            setLoading(false);
            return;
        }
        const loadChatMessages = async () => {
            setLoading(true);

            try {
                const response = await axios.get(
                    `http://localhost:3000/message/fetchMessages/${selectedChat._id}`,
                    { withCredentials: true }
                );

                if (!cancelled) {
                    setMessages(response.data.messages || []);
                }
            } catch (error) {
                if (!cancelled) {
                    if (error.response?.status === 404) {
                        setMessages([]);
                    } else {
                        console.error(
                            "Error fetching messages:",
                            error
                        );
                        setMessages([]);
                    }
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadChatMessages();

        return () => {
            cancelled = true;
        };
    }, [selectedChat?._id, setMessages]);

    return { messages, loading };
}

export default useReceivedMessage;
