import { Server } from "socket.io";
import http from "http";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { ChatRoomModel } from "../models/ChatRoomModel.js";

const app = express();
const httpServer = http.createServer(app);

const socketServer = new Server(httpServer, {
    cors: {
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
        ],
        methods: ["GET", "POST"],
        credentials: true,
    },
});

const users = {};

export const findRecipientSocketId = (toUserId) => {
    return users[toUserId];
};

socketServer.use((socket, next) => {
    try {
        const cookieHeader = socket.handshake.headers.cookie || "";

        const tokenCookie = cookieHeader
            .split(";")
            .map((item) => item.trim())
            .find((item) => item.startsWith("token="));

        if (!tokenCookie) {
            return next(new Error("Authentication required"));
        }

        const token = decodeURIComponent(
            tokenCookie.substring("token=".length)
        );

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (!decoded.id) {
            return next(new Error("Invalid user session"));
        }

        socket.userId = String(decoded.id);
        next();
    } catch (error) {
        next(new Error("Invalid socket authentication"));
    }
});

socketServer.on("connection", (socket) => {
    const userId = socket.userId;

    users[userId] = socket.id;

    socketServer.emit("getonline", Object.keys(users));

    socket.on("joinRoom", async (data, callback) => {
        try {
            const roomId = data?.roomId;

            if (!mongoose.isValidObjectId(roomId)) {
                return callback?.({
                    success: false,
                    message: "Invalid room ID",
                });
            }

            const room = await ChatRoomModel.findOne({
                _id: roomId,
                members: userId,
            });

            if (!room) {
                return callback?.({
                    success: false,
                    message: "You are not a member of this room",
                });
            }

            await socket.join(String(roomId));

            callback?.({
                success: true,
                message: `Joined ${room.name}`,
            });

            console.log(
                `User ${userId} joined room ${room.name}`
            );
        } catch (error) {
            console.error("Join room error:", error);

            callback?.({
                success: false,
                message: "Could not join room",
            });
        }
    });

    socket.on("leaveRoom", async (data, callback) => {
        const roomId = data?.roomId;

        if (typeof roomId !== "string") {
            return callback?.({
                success: false,
                message: "Invalid room ID",
            });
        }

        await socket.leave(roomId);

        callback?.({ success: true });
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);

        if (users[userId] === socket.id) {
            delete users[userId];
        }

        socketServer.emit("getonline", Object.keys(users));
    });
});

export { app, httpServer, socketServer };