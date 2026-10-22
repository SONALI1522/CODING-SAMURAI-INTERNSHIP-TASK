import React, {useState,useEffect} from "react";
import useChat from "../manageState/useChat.js";
import axios from "axios";
function useReceivedMessage(){
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedChat} = useChat();
    useEffect(() =>{
        const loadChatMessages = async() =>{
            setLoading(true);
            if(selectedChat && selectedChat._id){
            try{
                const response = await axios.get(`http://localhost:3000/message/fetchMessages/${selectedChat._id}`, 
                {
                    withCredentials: true
                });
                setMessages(response.data.messages);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching messages:", error);
                setLoading(false);
            }
            }
        };
        loadChatMessages();
    }, [selectedChat, setMessages]);

    return {
        messages,
        loading
    }
}
export default useReceivedMessage;