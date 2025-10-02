// import mongoose from "mongoose";
// import dotenv from 'dotenv'
// import express from 'express'

// dotenv.config();

// const app = express();
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI)
// .then(()=>{
//     console.log("Database connected sucessfully!");
// })
// .catch((err)=>{
//     console.log(err , "Database connection failed");
// })

// app.get("/" , (req , res)=>{
//     res.send("Server is running");
// })


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));





import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";

dotenv.config();  // <-- ye line add karo

const app = express();
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
