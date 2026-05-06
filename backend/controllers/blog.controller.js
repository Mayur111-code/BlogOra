import Blog from "../models/blog.model.js";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

const removeUploadedFile = (filename) => {
  if (!filename) return;
  const filePath = path.join("uploads", filename);
  fs.unlink(filePath, () => {});
};

const escapeRegex = (str = "") => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const computeReadingTime = (text = "") => {
  const words = String(text).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

export const allBlogs = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 0));
    const { category, q } = req.query;

    const filter = {};
    if (category && category !== "All") filter.category = category;
    if (q && String(q).trim()) {
      const safe = escapeRegex(String(q).trim());
      filter.$or = [
        { title: { $regex: safe, $options: "i" } },
        { description: { $regex: safe, $options: "i" } },
        { category: { $regex: safe, $options: "i" } },
      ];
    }

    const baseQuery = Blog.find(filter).sort({ createdAt: -1 }).lean();

    if (limit) {
      const skip = (page - 1) * limit;
      const [blogs, total] = await Promise.all([
        baseQuery.skip(skip).limit(limit),
        Blog.countDocuments(filter),
      ]);
      return res.status(200).json({
        success: true,
        message: "All blogs",
        blogs,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit) || 1,
          hasMore: page * limit < total,
        },
      });
    }

    const blogs = await baseQuery;
    return res
      .status(200)
      .json({ success: true, message: "All blogs", blogs });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, category, description } = req.body || {};

    if (!title || !category || !description) {
      if (req.file) removeUploadedFile(req.file.filename);
      return res.status(400).json({
        success: false,
        message: "Title, category and description are required",
      });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Banner image is required" });
    }

    const blog = await Blog.create({
      title,
      category,
      description,
      image: req.file.filename,
      readingTime: computeReadingTime(description),
      author: {
        id: req.user._id,
        name: req.user.name,
        image: req.user.image,
      },
    });

    return res
      .status(201)
      .json({ message: "Blog created", success: true, blog });
  } catch (error) {
    if (req.file) removeUploadedFile(req.file.filename);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid blog id" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ message: "Blog not found", success: false });
    }

    if (String(blog.author?.id) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this blog",
      });
    }

    if (blog.image) removeUploadedFile(blog.image);
    await blog.deleteOne();

    return res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const singleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid blog id" });
    }

    const blog = await Blog.findById(id).lean();
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    Blog.updateOne({ _id: id }, { $inc: { views: 1 } }).catch(() => {});

    return res
      .status(200)
      .json({ success: true, message: "Blog found", blog });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const userBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ "author.id": req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({ success: true, blogs });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
