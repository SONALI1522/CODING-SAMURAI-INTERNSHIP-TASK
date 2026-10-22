import { Schema } from "mongoose";
import bcrypt from "bcrypt";

export const userSchema = new Schema(
  {
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
},
  {
    timestamps: true,
  }
  
);
