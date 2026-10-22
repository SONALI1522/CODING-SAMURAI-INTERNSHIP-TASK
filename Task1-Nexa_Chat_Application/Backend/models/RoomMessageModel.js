import mongoose from "mongoose";
import { roomMessageSchema } from "../schemas/RoomMessageSchema.js";

const RoomMessageModel = mongoose.model(
    "roomMessage",
    roomMessageSchema
);

export { RoomMessageModel };