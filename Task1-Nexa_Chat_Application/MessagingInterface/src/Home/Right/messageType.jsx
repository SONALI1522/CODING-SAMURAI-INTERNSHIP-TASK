import React, { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import "./Right.css";
import EmojiPicker from "emoji-picker-react";
import { Sticker } from "lucide-react";
import UseSendConversationMessage from "../../Hooks/useSendConversationMessage.jsx";
function messageType(){
    const {Loading, handleSendMessage} = UseSendConversationMessage();
    const [message, setMessage] = useState("");
    const [displayEmoji, setDisplayEmoji] = useState(false)
    const handleSubmit = async(e) =>{
        e.preventDefault();
        await handleSendMessage(message);
        setMessage("");
    }
    const selectEmoji = (data) =>{
        setMessage((prev) => prev + data.emoji);
        setDisplayEmoji(false);
    };
    return (
    <form onSubmit={handleSubmit} className="inputform">
    <div className="inputbox">
        <button
        type="button"
        onClick={() => setDisplayEmoji((prev) => !prev)}
        className="text-xl"
       >
        <Sticker size={22} strokeWidth={1.8} className="bg-pink-200"/>
       </button>

       {displayEmoji && (
         <div className="absolute bottom-14 left-0 z-50">
          <EmojiPicker 
           onEmojiClick={selectEmoji}  
           />
         </div>
        )}
        <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setDisplayEmoji(false)}
            placeholder="Write a message..."
            className="messageInput"
        />

        <button type="submit" className="send">
            <IoSendSharp />
        </button>
    </div>
    </form>
    )
}
export default messageType;
