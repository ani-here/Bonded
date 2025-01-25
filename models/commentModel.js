import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "Comment is required"],
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "Post ID is required"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;