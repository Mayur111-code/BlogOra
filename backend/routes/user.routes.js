import express from "express";
import {
  getUserProfile,
  login,
  register,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  validate,
  registerSchema,
  loginSchema,
  updateProfileSchema,
} from "../middlewares/validate.js";

const router = express.Router();

router.post(
  "/register",
  upload.single("image"),
  validate(registerSchema),
  register
);

router.post("/login", validate(loginSchema), login);

router.get("/profile", isAuthenticated, getUserProfile);

router.put(
  "/update",
  isAuthenticated,
  upload.single("image"),
  validate(updateProfileSchema),
  updateUserProfile
);

export default router;
