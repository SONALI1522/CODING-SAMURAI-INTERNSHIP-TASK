import express from "express";
import bcrypt from "bcrypt";
import { createSecretToken } from "../Utils/secretToken.js";
import {UsersModel} from "../models/userModel.js";
import { isLoggedIn } from "../middleware.js";
const router = express.Router();

router.get("/user_profile", isLoggedIn, async (req, res) => {
  console.log("AUTH MIDDLEWARE STARTED");
  try{
   const loggedInUser = req.user.id;
   const filteredUsers = await UsersModel.find({
    _id:{ $ne: loggedInUser}
   }).select(
    "-password"
   );
   res.json(filteredUsers);
  }catch(err){
   console.log(err);
   res.status(500).json({message : "Server error"});
  }
});

router.get("/me", isLoggedIn, async (req, res) => {
        console.log("AUTH MIDDLEWARE STARTED");
    try {
        const loggedInUser = await UsersModel
            .findById(req.user.id)
            .select("-password");

        res.json(loggedInUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});
export default router;