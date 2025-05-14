const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    summary: {
      type: String,
      required: [true, "Summary is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    img: {
      type: String,
      required: [true, "Img is required"],
    },
    content: {
      type: Object,
      required: [true, "Content is required"],
    },
    date: {
      type: Number,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);
const postModel = mongoose.model("Posts", postSchema);

module.exports = postModel;
