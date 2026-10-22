import mongoose from "mongoose";
const { Schema } = mongoose;
import {userSchema} from "./userSchema.js";
import {message_schema} from "./message_schema.js";

export const chatThreadSchema = new Schema({
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
   messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "messages",
      default: [],
    },
   ],
},{
    timestamps: true,
});