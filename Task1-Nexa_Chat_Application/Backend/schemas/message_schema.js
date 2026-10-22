import { Schema } from "mongoose";

export const message_schema = new Schema({
  fromUserId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  toUserId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
    },
   message: {
    type: String,
    required: true,
    maxlength: 2000,
    trim: true,
    validate:[
        {
            validator: (value) => value.length > 0,
            message: "Please enter a message",
        }
    ],
   },
   createdAt: {
    type: Date,
    default: Date.now,
   },
},{
    timestamps: true,
}
);