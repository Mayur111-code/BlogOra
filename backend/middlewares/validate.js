import { z } from "zod";

export const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse({
      body: req.body || {},
      query: req.query || {},
      params: req.params || {},
    });
    if (parsed.body) req.body = parsed.body;
    if (parsed.query) req.query = parsed.query;
    if (parsed.params) req.params = parsed.params;
    return next();
  } catch (err) {
    const issues = err?.issues || err?.errors || [];
    const message =
      issues.map((i) => `${i.path?.join(".") || "field"}: ${i.message}`).join(", ") ||
      "Validation failed";
    return res.status(400).json({ success: false, message });
  }
};

export const registerSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name is required" })
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(60, "Name is too long"),
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .email("Invalid email"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters")
      .max(128, "Password is too long"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().email("Invalid email"),
    password: z.string().min(1, "Password is required"),
  }),
});

const ALLOWED_CATEGORIES = [
  "Technology",
  "Lifestyle",
  "Travel",
  "Health",
  "Business",
];

export const createBlogSchema = z.object({
  body: z.object({
    title: z.string().trim().min(3, "Title must be at least 3 chars").max(160),
    category: z.enum(ALLOWED_CATEGORIES, {
      errorMap: () => ({ message: "Invalid category" }),
    }),
    description: z
      .string()
      .trim()
      .min(20, "Description must be at least 20 characters"),
  }),
});

export const updateProfileSchema = z.object({
  body: z
    .object({
      name: z.string().trim().min(2).max(60).optional(),
      email: z.string().trim().email().optional(),
      bio: z.string().max(280).optional(),
    })
    .partial(),
});

export default validate;
