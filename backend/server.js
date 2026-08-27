const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middlewares
app.use(cors({
  origin: [
    "https://city-care-chi.vercel.app",   // apna actual Vercel URL yahan daalo
    "http://localhost:5173"                // local dev ke liye (agar Vite use kar rahe ho, warna 3000)
  ],
  credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;

// Robust MongoDB connection for Docker
const connectDB = async () => {
  try {
    console.log("Using URI:", process.env.MONGO_URI);
    console.log("Attempting MongoDB connection...");

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      family: 4, // Force IPv4 in Docker and Windows.
    });

    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.log("❌ MongoDB not ready. Retrying in 5 seconds...");
    setTimeout(connectDB, 5000);
  }
};

connectDB();
