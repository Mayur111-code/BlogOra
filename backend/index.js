// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { connectDB } from "./config/connectionDB.js";
// import userRoutes from "./routes/user.routes.js";
// import blogRoutes from "./routes/blog.routes.js";
// dotenv.config();
// const app = express();
// // middlewares
// app.use(express.json());
// app.use(cors());
// // API ENDPOINTS
// app.use("/images", express.static("uploads"));
// app.use("/user", userRoutes);
// app.use("/blog", blogRoutes);

// const PORT = 4000;
// app.listen(PORT, () => {
//   connectDB();
//   console.log(`Server is running on port ${PORT}`);
// });



import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/connectionDB.js";
import userRoutes from "./routes/user.routes.js";
import blogRoutes from "./routes/blog.routes.js";

dotenv.config();
const app = express();


app.use(express.json());


app.use(cors({
    origin: ["https://blog-ora-app.vercel.app", "http://localhost:5173"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));


app.use("/images", express.static("uploads"));
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});