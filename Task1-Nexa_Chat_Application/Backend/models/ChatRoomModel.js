import mongoose from "mongoose";
import { chatRoomSchema } from "../schemas/ChatRoomSchema.js";
const ChatRoomModel = mongoose.model(
    "chatRoom",
    chatRoomSchema
);

export { ChatRoomModel };