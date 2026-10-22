import React, {useEffect} from "react";
import { useSocketContext} from "../context/SocketConnectionContext";
import useChat from "../manageState/useChat";
function useReceiveSocketMessage(){
    const {socketConnection} = useSocketContext();
    const {setMessages} = useChat();

    useEffect(() => {
    if (!socketConnection) return;

    const handleNewMessage = (newMessage) => {
        const notificationMessage = new Audio(
            "/notificationSound/notificationSound.mp3"
        );
        notificationMessage.play();
        setMessages((prev) => [...prev, newMessage]);
    };

    socketConnection.on("newMessage", handleNewMessage);

    return () => {
        socketConnection.off("newMessage", handleNewMessage);
    };
   }, [socketConnection, setMessages]);
}
export default useReceiveSocketMessage;