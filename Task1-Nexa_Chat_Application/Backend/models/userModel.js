import mongoose from "mongoose";
import { userSchema } from "../schemas/userSchema.js";

const UsersModel = mongoose.model("user", userSchema);

export { UsersModel };
