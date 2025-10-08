import User from "../models/User.js";
import express from "express";
import bcrypt from "bcrypt";

const route = express.Router();

route.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already registered" });
    }

    // Hash password correctly
    const hashPassword = await bcrypt.hash(password, 10);

    // Create user
    const createUser = new User({
      email,
      password: hashPassword,
    });

    await createUser.save();
    return res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error while registering!" });
  }
});

export default route;
