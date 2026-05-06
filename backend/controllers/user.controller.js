import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const getJwtSecret = () =>
  process.env.JWT_SCERECT || process.env.JWT_SECRET || "";

const isValidEmail = (email) =>
  typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const removeUploadedFile = (filename) => {
  if (!filename) return;
  const filePath = path.join("uploads", filename);
  fs.unlink(filePath, () => {});
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      if (req.file) removeUploadedFile(req.file.filename);
      return res
        .status(400)
        .json({ success: false, message: "Name, email and password are required" });
    }

    if (!isValidEmail(email)) {
      if (req.file) removeUploadedFile(req.file.filename);
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address" });
    }

    if (String(password).length < 6) {
      if (req.file) removeUploadedFile(req.file.filename);
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (req.file) removeUploadedFile(req.file.filename);
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      image: req.file ? req.file.filename : "",
    });

    const safeUser = user.toObject();
    delete safeUser.password;

    return res
      .status(201)
      .json({ message: "User created successfully", success: true, user: safeUser });
  } catch (error) {
    if (req.file) removeUploadedFile(req.file.filename);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    const token = jwt.sign({ id: user._id }, getJwtSecret(), {
      expiresIn: "7d",
    });

    const safeUser = user.toObject();
    delete safeUser.password;

    return res
      .status(200)
      .json({ message: "Login successful", success: true, token, user: safeUser });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, bio } = req.body || {};
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      if (req.file) removeUploadedFile(req.file.filename);
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (email && !isValidEmail(email)) {
      if (req.file) removeUploadedFile(req.file.filename);
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address" });
    }

    if (req.file) {
      if (user.image) removeUploadedFile(user.image);
      user.image = req.file.filename;
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (typeof bio === "string") user.bio = bio;

    await user.save();

    const updatedUser = user.toObject();
    delete updatedUser.password;

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    if (req.file) removeUploadedFile(req.file.filename);
    if (error?.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: "Email already in use" });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
