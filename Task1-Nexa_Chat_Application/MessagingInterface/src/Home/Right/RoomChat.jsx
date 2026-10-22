
import { useState } from "react";
import axios from "axios";
import useRoomMessages from "../../Hooks/useRoomMessages.jsx";
import { IoSendSharp } from "react-icons/io5";
import { Sticker } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { useAuth } from "../../context/useAuthUsers.jsx";
import "./Right.css";

export default function RoomChat({ room }) {
    const [message, setMessage] = useState("");
    const [displayEmoji, setDisplayEmoji] = useState(false);

    const { authUser } = useAuth();
    const { messages, loading, error } = useRoomMessages(room?._id);

    const handleSend = async (e) => {
        e.preventDefault();

        if (!message.trim() || !room?._id) return;

        try {
            await axios.post(
                `http://localhost:3000/rooms/${room._id}/messages`,
                { message: message.trim() },
                { withCredentials: true }
            );

            setMessage("");
            setDisplayEmoji(false);
        } catch (err) {
            console.error(
                "Could not send message:",
                err.response?.data || err.message
            );
        }
    };

    const selectEmoji = (data) => {
        setMessage((prev) => prev + data.emoji);
        setDisplayEmoji(false);
    };

    if (!room) {
        return <p>Select a room to start chatting.</p>;
    }

    return (
        <>
            <div style={{background:"#E4BBED"}}>
                <h2 style={{marginTop:"10px", marginLeft:"10px"}}>{room.name}</h2>
            </div>

            <div className="chatMessages">
                {loading && <p>Loading messages...</p>}
                {error && <p>{error}</p>}

                {messages.map((msg) => {
                    const isMe =
                        String(msg.senderId?._id || msg.senderId) ===
                        String(authUser?._id);

                    const timestamp = new Date(
                        msg.createdAt
                    ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    });

                    return (
                        <div
                            key={msg._id}
                            className={`chat ${
                                isMe ? "chat-end" : "chat-start"
                            } mb-3`}
                        >
                            {!isMe && (
                                <div className="text-xs mb-1 px-1">
                                    {msg.senderId?.username || "User"}
                                </div>
                            )}

                            <div>
                                <div
                                    className={`chat-bubble text-black p-3 max-w-xs ${
                                        isMe
                                            ? "bg-pink-200"
                                            : "bg-fuchsia-200"
                                    }`}
                                >
                                    {msg.message}
                                </div>
                            </div>

                            <div className="text-xs text-black-400 mt-1 px-1">
                                {timestamp}
                            </div>
                        </div>
                    );
                })}
            </div>

            <form className="inputform" onSubmit={handleSend}>
                <div className="inputbox relative">
                    <button
                        type="button"
                        onClick={() =>
                            setDisplayEmoji((prev) => !prev)
                        }
                        className="text-xl"
                    >
                        <Sticker
                            size={22}
                            strokeWidth={1.8}
                            className="bg-pink-200"
                        />
                    </button>

                    {displayEmoji && (
                        <div className="absolute bottom-14 left-0 z-50">
                            <EmojiPicker onEmojiClick={selectEmoji} />
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
        </>
    );
}
