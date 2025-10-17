// import { log } from 'node:console';
// import app from './src/app.js'     //app.js likhna zruri hain kyuki pakage.json me module rkha hain 
// import connectToDatabase from './src/db/db.js'

// connectToDatabase();

// app.listen(3000,()=>{
//     console.log("server is running on http://localhost:3000");
    
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.routes.js";
import songsRoutes from "./src/routes/song.routes.js";
import connectToDatabase from "./src/db/db.js";

const app = express();

connectToDatabase();
const PORT = process.env.PORT || 3000;

// ✅ Allowed origins
const allowedOrigins = [
  "https://steam-henna.vercel.app",
  "http://localhost:5173",
];

// ✅ Proper CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Fix preflight requests (use regex instead of "*")
app.options(/.*/, cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/songs", songsRoutes);

app.get("/", (req, res) => {
  res.send("✅ API is working in Backend");
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
