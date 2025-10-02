import User from "../models/User.js";
import express from 'express';
import bcrypt from "bcrypt";  


const route = express.Router();

route.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exixting = await User.findOne({ email });

    if (exixting) {
      return res.status(400).json({ message: "User already registered" });
    }
    const hashPassword = password.bcrypt.hash(password, 10);

    const createUser = new User({
      name,
      email,
      password: hashPassword,
    });

    await createUser.save();
    return res.status(201).json({ message: "User registered sucessfully!" });
  } catch (err) {
    return res.status(404).json({ message: "Error while registering!" });
  }
});

export default route