import axios from "axios";

const API = "http://localhost:3000/rooms";

export const createRoom = async (name) => {
    const response = await axios.post(
        `${API}/create`,
        { name },
        { withCredentials: true }
    );

    return response.data.room;
};

export const fetchRooms = async () => {
    const response = await axios.get(API, {
        withCredentials: true,
    });

    return response.data.rooms;
};

export const joinRoom = async (roomId) => {
    const response = await axios.post(
        `${API}/${roomId}/join`,
        {},
        { withCredentials: true }
    );

    return response.data.room;
};
