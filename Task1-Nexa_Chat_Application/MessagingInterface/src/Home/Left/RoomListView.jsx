
import { useEffect, useState } from "react";
import {
    createRoom,
    fetchRooms,
    joinRoom,
} from "../../roomapi/roomapi.js";

export default function RoomList({ onSelectRoom }) {
    const [rooms, setRooms] = useState([]);
    const [roomName, setRoomName] = useState("");
    const [roomId, setRoomId] = useState("");
    const [createdRoomId, setCreatedRoomId] = useState("");
    const [error, setError] = useState("");

    const loadRooms = async () => {
        try {
            const data = await fetchRooms();
            setRooms(data);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Could not load rooms"
            );
        }
    };

    useEffect(() => {
        loadRooms();
    }, []);

    const handleCreate = async () => {
        try {
            setError("");

            if (!roomName.trim()) {
                setError("Enter a room name");
                return;
            }

            const room = await createRoom(roomName.trim());

            setCreatedRoomId(room._id);
            setRoomName("");

            await loadRooms();
            onSelectRoom(room);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Could not create room"
            );
        }
    };

    const handleJoin = async () => {
        try {
            setError("");

            if (!roomId.trim()) {
                setError("Enter a room ID");
                return;
            }

            const room = await joinRoom(roomId.trim());

            setRoomId("");
            await loadRooms();
            onSelectRoom(room);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Could not join room"
            );
        }
    };

    const handleCopyRoomId = async () => {
        try {
            await navigator.clipboard.writeText(createdRoomId);
            setError("");
            alert("Room ID secured in your clipboard! Pass the key along and bring your crew into the conversation. 🔑");
        } catch {
            setError(
                "Clipboard access denied! Your room key is still visible above—copy it directly and share the connection. 🔑"
            );
        }
    };

    return (
        <div>
            <h2 style={{marginLeft:"8px", marginTop:"9px"}}>Chat Rooms</h2>

            <input
                style={{marginLeft:"8px"}}
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Give your conversation a name..."
            />

            <button 
            style={{marginLeft:"8px",color:"green"}}
            onClick={handleCreate}>
                Create Your Chat Space
            </button>

            {createdRoomId && (
                <div>
                    <p style={{marginLeft:"8px",color:"green"}}>Chat Space created successfully!</p>

                    <p style={{marginLeft:"8px"}}>
                        Your Room Key: <strong>{createdRoomId}</strong>
                    </p>

                    <button 
                    style={{marginLeft:"8px"}}
                    onClick={handleCopyRoomId}>
                        Copy Room Key
                    </button>
                </div>
            )}

            <hr />

            <input
                style={{marginLeft:"8px"}}
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Paste room ID"
            />

            <button 
            style={{marginLeft:"8px",color:"green"}}
            onClick={handleJoin}>
               Enter Chat Space
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <h3 style={{marginLeft:"8px", marginTop:"25px"}}>Your Rooms</h3>

            <div className="groupList">
                {rooms.map((room) => (
                    <button
                        key={room._id}
                        onClick={() => onSelectRoom(room)}
                    >
                        {room.
                        name}
                    </button>
                ))}
            </div>
        </div>
    );
}
