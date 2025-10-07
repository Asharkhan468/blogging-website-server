import express from "express";
import Post from "../models/Post.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// ✅ Add Comment to a Post
router.post("/:id/comment", verifyToken ,  async (req, res) => {
  try {
    const userId = req.userId;
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Add new comment
    post.comments.push({
      user: userId,
      text,
    });

    await post.save();

    res.status(201).json({
      message: "Comment added successfully",
      comments: post.comments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
});

export default router;
