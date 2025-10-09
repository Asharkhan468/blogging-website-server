import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); 
    res.status(200).json({
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
});

export default router;
