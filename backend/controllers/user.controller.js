import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
export const register = async (req, res) => {
  try {
    let image_filename = `${req.file.filename}`;
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      image: image_filename,
    });
    res
      .status(201)
      .json({ message: "User created successfully", success: true, user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SCERECT, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .json({ message: "Login successful", success: true, token, user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


// Get User Profile
export const getUserProfile = async (req, res) => {
    try {
        // req.user.id hume auth middleware se milegi
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Agar nai image upload ki hai
        if (req.file) {
            // Purani image delete karo agar exist karti hai
            if (user.image) {
                fs.unlink(`uploads/${user.image}`, (err) => {
                    if (err) console.log("Old image delete error:", err);
                });
            }
            user.image = req.file.filename;
        }

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();
        
        // Password hata ke user bhejo
        const updatedUser = user.toObject();
        delete updatedUser.password;

        res.status(200).json({ 
            success: true, 
            message: "Profile updated successfully", 
            user: updatedUser 
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
