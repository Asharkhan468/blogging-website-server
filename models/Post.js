// import mongoose from "mongoose";

// const PostSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     image: {
//       type: String, // image ka URL store hoga yahan
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Post", PostSchema);


import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String, // image ka URL
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId, // user ka ID jinhon ne like kiya
        ref: "User",
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

PostSchema.path("likes").default(() => []);
PostSchema.path("comments").default(() => []);

export default mongoose.model("Post", PostSchema);
