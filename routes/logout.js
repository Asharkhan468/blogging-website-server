import express from "express";
import dotenv from "dotenv";

const route = express.Router();
dotenv.config();

route.post("/logout", async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(0),
    });

    return res.status(200).json({ message: "Logout successful!" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ message: "Error while logging out!" });
  }
});

export default route;
