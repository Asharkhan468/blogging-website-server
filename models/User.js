import mongoose from "mongoose";

const schema = new mongoose.Schema({
   
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
      savedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],

})

const User = mongoose.model("User", schema);
export default User;