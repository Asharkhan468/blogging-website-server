import express from "express";
import User from "../models/User.js";
import upload from "../middlewares/multer.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

router.put("/:id", upload.single("profileImage"), async (req, res) => {
  try {
    const { name } = req.body;
    let imageUrl;

    // agar image file mili hai to Cloudinary pe upload karo
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "user_profiles" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      imageUrl = result.secure_url;
    }

    // purana data le ao taake image null na ho agar upload ni hui
    const existingUser = await User.findById(req.params.id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: name || existingUser.name,
        profileImage: imageUrl || existingUser.profileImage,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      message: "Error updating profile",
      error: error.message,
    });
  }
});

export default router;
