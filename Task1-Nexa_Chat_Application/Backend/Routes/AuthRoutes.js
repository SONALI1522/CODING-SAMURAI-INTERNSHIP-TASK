import express from "express";
import bcrypt from "bcrypt";
import { createSecretToken } from "../Utils/secretToken.js";
import {UsersModel} from "../models/userModel.js";
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password, username } = req.body;

    console.log("Email received:", email);

    const existingUser = await UsersModel.findOne({ email });

    console.log("Existing user:", existingUser);

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UsersModel({
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    const token = createSecretToken(newUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false 
    });

    res.status(200).json({ message: "User signed up successfully" });

  } catch (err) {
    res.status(500).json({ error:  err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UsersModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false 
    });

    res.status(200).json({ message: "User logged in successfully" });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/logout", (req, res) => {
  console.log('logout');
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: false,
  });

  res.status(200).json({ message: "Logged out successfully" });
});


export default router;