import mongoose from "mongoose";

const { Schema } = mongoose;

export const roomMessageSchema = new Schema(
    {
        roomId: {
            type: Schema.Types.ObjectId,
            ref: "chatRoom",
            required: true,
            index: true,
        },
        senderId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2000,
        },
    },
    { timestamps: true }
);