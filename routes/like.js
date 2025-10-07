import express from "express";
import Post from "../models/Post.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// ✅ Toggle Like / Unlike a Post
router.post("/:id/like", verifyToken, async (req, res) => {
  try {
    const userId = req.userId
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      // Unlike
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
      await post.save();
      return res.status(200).json({ message: "Post unliked successfully" });
    } else {
      // Like
      post.likes.push(userId);
      await post.save();
      return res.status(200).json({ message: "Post liked successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
});

export default router;
