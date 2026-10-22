import mongoose from "mongoose";
import { message_schema } from "../schemas/message_schema.js";

const MessagesModel = mongoose.model("messages", message_schema);

export { MessagesModel };