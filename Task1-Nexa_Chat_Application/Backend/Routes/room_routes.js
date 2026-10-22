import express from "express";
import mongoose from "mongoose";
import { isLoggedIn } from "../middleware.js";
import { ChatRoomModel } from "../models/ChatRoomModel.js";
import { RoomMessageModel } from "../models/RoomMessageModel.js";
import { socketServer } from "../socketConnection/serverApp.js";

const router = express.Router();

router.post("/create", isLoggedIn, async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user.id;

        if (typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                message: "Every circle starts with a name — what’s yours?",
            });
        }

        const room = await ChatRoomModel.create({
            name: name.trim(),
            members: [userId],
            createdBy: userId,
        });

        return res.status(201).json({
            message: "Your circle is live! Let the conversations begin 🎉",
            room,
        });
    } catch (error) {
        console.error("Create room error:", error);
        return res.status(500).json({
            message: "Server error",
        });
    }
});

router.get("/", isLoggedIn, async (req, res) => {
    try {
        const rooms = await ChatRoomModel.find({
            members: req.user.id,
        }).sort({ createdAt: -1 });

        return res.status(200).json({ rooms });
    } catch (error) {
        console.error("Fetch rooms error:", error);
        return res.status(500).json({
            message: "Server error",
        });
    }
});

router.post("/:roomId/join", isLoggedIn, async (req, res) => {
    try {
        const { roomId } = req.params;
        const userId = req.user.id;

        if (!mongoose.isValidObjectId(roomId)) {
            return res.status(400).json({
                message: "That room code didn’t find its way home — double-check it and try again! 🔎",
            });
        }

        const room = await ChatRoomModel.findByIdAndUpdate(
            roomId,
            { $addToSet: { members: userId } },
            { new: true, runValidators: true }
        );

        if (!room) {
            return res.status(404).json({
                message: "Looks like this circle is off the map — check the room code and try again!",
            });
        }

        return res.status(200).json({
            message: "You’re in! Your circle just got one member stronger 🎉",
            room,
        });
    } catch (error) {
        console.error("Join room error:", error);
        return res.status(500).json({
            message: "Server error",
        });
    }
});

router.get("/:roomId/messages", isLoggedIn, async (req, res) => {
    try {
        const { roomId } = req.params;
        const userId = req.user.id;

        if (!mongoose.isValidObjectId(roomId)) {
            return res.status(400).json({
                message: "That room code didn’t find its way home — double-check it and try again!",
            });
        }

        const room = await ChatRoomModel.findOne({
            _id: roomId,
            members: userId,
        });

        if (!room) {
            return res.status(403).json({
                message: "You are not a member of this room",
            });
        }

        const messages = await RoomMessageModel.find({ roomId })
            .populate("senderId", "username")
            .sort({ createdAt: 1 });

        return res.status(200).json({ messages });
    } catch (error) {
        console.error("Fetch room messages error:", error);
        return res.status(500).json({
            message: "Server error",
        });
    }
});

router.post("/:roomId/messages", isLoggedIn, async (req, res) => {
    try {
        const { roomId } = req.params;
        const { message } = req.body;
        const userId = req.user.id;

        if (!mongoose.isValidObjectId(roomId)) {
            return res.status(400).json({
                message: "That room code didn’t find its way home — double-check it and try again!",
            });
        }

        if (typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                message: "Your message is missing its words — type something before sending!",
            });
        }

        const room = await ChatRoomModel.findOne({
            _id: roomId,
            members: userId,
        });

        if (!room) {
            return res.status(403).json({
                message: "You’re not in this circle yet",
            });
        }

        const newMessage = await RoomMessageModel.create({
            roomId,
            senderId: userId,
            message: message.trim(),
        });

        const populatedMessage = await newMessage.populate(
            "senderId",
            "username"
        );

        socketServer.to(roomId).emit("roomMessage", populatedMessage);

        return res.status(201).json({
            message: "Message sent successfully",
            newMessage: populatedMessage,
        });
    } catch (error) {
        console.error("Send room message error:", error);
        return res.status(500).json({
            message: "Server error",
        });
    }
});

export default router;