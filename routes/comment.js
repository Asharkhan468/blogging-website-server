import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js"; 
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// ✅ Add Comment to a Post
router.post("/:id/comment", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Comment text is required" });
    }

    // ✅ Find post
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // ✅ Find user by ID
    const user = await User.findById(userId).select("name email profileImage"); // only required fields

    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Add comment with user info
    post.comments.push({
      userId: userId,
      userName: user.name,
      userImage: user.profileImage,
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
