import mongoose from "mongoose";
import { chatThreadSchema } from "../schemas/ChatThreadSchema.js";

const ChatThreadsModel = mongoose.model("chatthread", chatThreadSchema);

export { ChatThreadsModel };