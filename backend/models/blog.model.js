import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    slug: { type: String, trim: true, index: true, sparse: true },
    image: { type: String },
    category: { type: String, required: true, trim: true, index: true },
    description: { type: String, required: true },
    tags: { type: [String], default: [] },
    readingTime: { type: Number, default: 1 },
    views: { type: Number, default: 0 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    author: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

blogSchema.index({ createdAt: -1 });
blogSchema.index({ title: "text", description: "text", category: "text" });

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
