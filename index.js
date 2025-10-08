import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import loginRoutes from "./routes/login.js";
import createPost from "./routes/post.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import commentRoute from "./routes/comment.js";
import likeRoute from "./routes/like.js";
import savedPost from "./routes/savedPost.js";
import updateProfile from "./routes/updateProfile.js";
import cors from 'cors'

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors())

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", loginRoutes);
app.use("/api/v1", createPost);
app.use("/api/v1", likeRoute);
app.use("/api/v1", commentRoute);
app.use("/api/v1", savedPost);
app.use("/api/v1/updateProfile", updateProfile);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
