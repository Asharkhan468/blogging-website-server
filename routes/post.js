import express from "express";
import cloudinary from "../config/cloudinary.js";
import upload from "../middlewares/multer.js";
import Post from "../models/Post.js";

const router = express.Router();

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Cloudinary upload as promise
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "posts" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
    };

    const uploadedImage = await uploadToCloudinary();

    // Post create
    const post = new Post({
      title,
      description,
      image: uploadedImage.secure_url,
      createdBy: req.userId || null, // abhi ke liye null rakho
    });

    await post.save();

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
});

export default router;
