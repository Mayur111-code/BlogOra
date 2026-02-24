import express from "express";
import { getUserProfile, login, register, updateUserProfile } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.post("/register", upload.single("image"), register);

router.post("/login", login);

router.get("/profile", isAuthenticated, getUserProfile);

router.put("/update", isAuthenticated, upload.single("image"), updateUserProfile);

export default router;
