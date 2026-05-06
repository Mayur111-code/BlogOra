import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { upload } from "../middlewares/multer.js";
import { validate, createBlogSchema } from "../middlewares/validate.js";
import {
  allBlogs,
  createBlog,
  deleteBlog,
  singleBlog,
  userBlogs,
} from "../controllers/blog.controller.js";

const router = express.Router();

router.post(
  "/create",
  isAuthenticated,
  upload.single("image"),
  validate(createBlogSchema),
  createBlog
);
router.get("/all", allBlogs);
router.get("/my-blogs", isAuthenticated, userBlogs);
router.get("/user/blogs", isAuthenticated, userBlogs);
router.delete("/delete/:id", isAuthenticated, deleteBlog);
router.get("/:id", singleBlog);

export default router;
