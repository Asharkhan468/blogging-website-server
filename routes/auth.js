// import User from "../models/User.js";
// import express from "express";
// import bcrypt from "bcrypt";

// const route = express.Router();

// route.post("/register", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     // Check existing user
//     const existing = await User.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: "User already registered" });
//     }

//     // Hash password correctly
//     const hashPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const createUser = new User({
//       email,
//       password: hashPassword,
//     });

//     await createUser.save();
//     return res.status(201).json({ message: "User registered successfully!" });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Error while registering!" });
//   }
// });

// export default route;



import User from "../models/User.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const route = express.Router();
dotenv.config();

route.post("/register", async (req, res) => {
  try {
    const { email, password, name, profileImage } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already registered" });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const createUser = new User({
      email,
      password: hashPassword,
      name,
      profileImage,
    });

    await createUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: createUser._id, email: createUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    // Send response with user data
    return res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: createUser._id,
        email: createUser.email,
        name: createUser.name,
        profileImage: createUser.profileImage,
        savedPosts: createUser.savedPosts,
        token,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error while registering!" });
  }
});

export default route;
