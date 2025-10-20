import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Save post
router.post("/save/:postId", async (req, res) => {
  try {
    const userId = req.body.userId;
    const postId = req.params.postId;

    const user = await User.findById(userId);
    if (!user.savedPosts.includes(postId)) {
      user.savedPosts.push(postId);
      await user.save();
    }

    res.status(200).json({ message: "Post saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving post", error });
  }
});

// Unsave post
router.delete("/unsave/:postId", async (req, res) => {
  try {
    const userId = req.body.userId;
    const postId = req.params.postId;

    await User.findByIdAndUpdate(userId, {
      $pull: { savedPosts: postId },
    });

    res.status(200).json({ message: "Post removed from saved!" });
  } catch (error) {
    res.status(500).json({ message: "Error removing post", error });
  }
});

// Get saved posts
router.get("/saved/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("savedPosts");
    res.status(200).json(user.savedPosts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching saved posts", error });
  }
});

export default router;
