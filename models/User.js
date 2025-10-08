import mongoose from "mongoose";

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: "User",
  },
  profileImage: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/image-to-url-converter-9483c.appspot.com/o/anoymous%40gmail.com%20%2B%201759907398226?alt=media&token=74fd38f4-b584-4848-affa-0b4e04fe0028",
  },
  savedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const User = mongoose.model("User", schema);
export default User;
