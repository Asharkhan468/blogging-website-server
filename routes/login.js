import User from "../models/User.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const route = express.Router();
dotenv.config();

// LOGIN ROUTE
route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials!" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Token ko cookie me send karo
    res.cookie("token", token, {
      httpOnly: true, // JS se access nahi hoga (XSS safe)
      secure: true, // sirf HTTPS par chalega (dev me false kar sakte ho)
      sameSite: "strict", // CSRF protection
    });

    return res.status(200).json({
      message: "Login successful!",
      user: {
        id: user._id,
        email: user.email,
        token,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error while logging in!" });
  }
});

export default route;
