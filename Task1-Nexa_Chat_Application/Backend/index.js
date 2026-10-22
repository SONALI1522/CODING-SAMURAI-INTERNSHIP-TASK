import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/AuthRoutes.js";
import UserRoutes from "./Routes/userRoute.js";
import messageRoutes from "./Routes/message_routes.js";
import {app, httpServer} from "./socketConnection/serverApp.js";
import roomRoutes from "./Routes/room_routes.js";
const PORT = process.env.PORT;
const uri = process.env.Mongo_uri;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/message", messageRoutes);
app.use("/auth", authRoutes);
app.use("/user", UserRoutes);
app.use("/rooms", roomRoutes);

httpServer.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
  connectDB();
});

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("DB connected");
  } catch (err) {
    console.log("failed to connect with db", err);
  }
};
