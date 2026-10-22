import { useEffect } from "react";
import { useSocketContext } from "../context/SocketConnectionContext";
import useChat from "../manageState/useChat";
import { useAuth } from "../context/useAuthUsers.jsx";

function useReceiveSocketMessage() {
    const { socketConnection } = useSocketContext();
    const { messages, setMessages, selectedChat } = useChat();
    const { authUser } = useAuth();

    useEffect(() => {
        if (!socketConnection || !authUser?._id) return;

        const getId = (value) =>
            String(value?._id ?? value ?? "");

        const handleNewMessage = (newMessage) => {
            const senderId = getId(newMessage.fromUserId);
            const receiverId = getId(newMessage.toUserId);
            const currentUserId = getId(authUser._id);
            const selectedUserId = getId(selectedChat?._id);

            const belongsToSelectedChat =
                (senderId === selectedUserId &&
                    receiverId === currentUserId) ||
                (senderId === currentUserId &&
                    receiverId === selectedUserId);

            if (!selectedUserId || !belongsToSelectedChat) {
                return;
            }

            setMessages((previous) => {
                if (
                    previous.some(
                        (message) =>
                            String(message._id) ===
                            String(newMessage._id)
                    )
                ) {
                    return previous;
                }

                return [...previous, newMessage];
            });

            if (senderId !== currentUserId) {
                const audio = new Audio(
                    "/notificationSound/notificationSound.mp3"
                );

                audio.play().catch((err) => {
                    console.warn(
                        "Notification sound failed:",
                        err
                    );
                });
            }
        };

        socketConnection.on("newMessage", handleNewMessage);

        return () => {
            socketConnection.off("newMessage", handleNewMessage);
        };
    }, [
        socketConnection,
        authUser?._id,
        selectedChat?._id,
        setMessages,
    ]);

    return messages;
}

export default useReceiveSocketMessage;
