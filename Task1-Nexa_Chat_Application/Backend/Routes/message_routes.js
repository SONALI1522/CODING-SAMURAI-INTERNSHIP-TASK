import express from "express";
const router = express.Router();
import { isLoggedIn } from "../middleware.js";
import { ChatThreadsModel } from "../models/ChatThreadModel.js";
import { MessagesModel } from "../models/message_model.js";
import { findRecipientSocketId } from "../socketConnection/serverApp.js";
import { socketServer} from "../socketConnection/serverApp.js";

router.post("/deliverMessage/:id", isLoggedIn, async (req, res) => {
  console.log("DELIVER MESSAGE ROUTE HIT");

  try{
   const {message} = req.body;
   const {id:toUserId} = req.params;
   const fromUserId = req.user.id;
   let dialogue = await ChatThreadsModel.findOne({
    members: { $all: [fromUserId, toUserId] }
   });
   console.log("2. Dialogue result:", dialogue);
   if(!dialogue){
    dialogue = await ChatThreadsModel.create({
        members: [fromUserId, toUserId],
    });
   }
    const newMessage = await MessagesModel({
        fromUserId,
        toUserId,
        message,
    });
    await newMessage.save();

    dialogue.messages.push(newMessage._id);

    await dialogue.save();
    const recipientSocketId = findRecipientSocketId(toUserId);
    if(recipientSocketId){
      socketServer.to(recipientSocketId).emit("newMessage", newMessage);
    }
     res.status(200).json({
        message: "Message sent successfully",
        newMessage
     });
} catch (err) {
    console.log("Error in deliverMessage:", err);

    res.status(500).json({
        message: "Server error",
        error: err.message
    });
  }
});

router.get("/fetchMessages/:id", isLoggedIn, async (req, res) => {
      console.log("AUTH MIDDLEWARE STARTED");
 try{
  const {id:toUserId} = req.params;
  const fromUserId = req.user.id;
  let dialogue = await ChatThreadsModel.findOne({
    members: { $all: [fromUserId, toUserId] }
  }).populate("messages");
  if(dialogue){
    const messages = dialogue.messages;
    res.status(200).json({message: "Messages retrieved successfully", messages});
  }else{
    res.status(404).json({message: "Dialogue not found"});
  }
 }catch (err) {
    console.error("Error in fetchMessages:", err);

    res.status(500).json({
        message: "Server error",
        error: err.message
    });
}
});
export default router;