import { useEffect, useState } from "react";
import axios from "axios";
import { useSocketContext } from "../context/SocketConnectionContext";
import { useAuth } from "../context/useAuthUsers.jsx";

function useRoomMessages(roomId) {
    const { socketConnection } = useSocketContext();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { authUser } = useAuth();
    useEffect(() => {
        let cancelled = false;
        let joined = false;

        setMessages([]);
        setError("");

        if (!roomId || !socketConnection) {
            setLoading(false);
            return;
        }
    const handleRoomMessage = (newMessage) => {
    if (String(newMessage.roomId) !== String(roomId)) {
        return;
    }

    const senderId =
        newMessage.senderId?._id || newMessage.senderId;

    if (String(senderId) !== String(authUser?._id)) {
        const audio = new Audio(
            "/notificationSound/notificationSound.mp3"
        );

        audio.play().catch((err) => {
            console.log("Room notification sound failed:", err);
        });
    }

    setMessages((previous) => {
        if (
            previous.some(
                (message) => message._id === newMessage._id
            )
        ) {
            return previous;
        }

        return [...previous, newMessage];
    });
};

    const joinAndLoadMessages = async () => {
        setLoading(true);

        try {
            socketConnection.on(
                "roomMessage",
                handleRoomMessage
            );
            const joinResult = await new Promise((resolve) => {
                socketConnection.emit(
                    "joinRoom",
                    { roomId },
                    resolve
                );
            });
            if (!joinResult?.success) {
                throw new Error(
                    joinResult?.message || "Could not join room"
                );
            }
            joined = true;
            const response = await axios.get(
                `http://localhost:3000/rooms/${roomId}/messages`,
                { withCredentials: true }
            );
            if (!cancelled) {
                setMessages((current) => {
                    const byId = new Map();

                    for (const message of response.data.messages || []) {
                        byId.set(message._id, message);
                    }

                    for (const message of current) {
                        byId.set(message._id, message);
                    }

                    return [...byId.values()].sort(
                        (a, b) =>
                            new Date(a.createdAt) -
                            new Date(b.createdAt)
                    );
                });
            }
        } catch (err) {
            if (!cancelled) {
                setMessages([]);
                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Failed to load messages"
                );
            }
        } finally {
            if (!cancelled) {
                setLoading(false);
            }
        }
    };
    joinAndLoadMessages();
    return () => {
        cancelled = true;
        socketConnection.off(
            "roomMessage",
            handleRoomMessage
        );

        if (joined) {
            socketConnection.emit("leaveRoom", { roomId });
        };
    }
    }, [roomId, socketConnection]);

    return { messages, loading, error };
}

export default useRoomMessages;