import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();            // MUST be first
connectDB();                // THEN connect MongoDB

const app = express();

app.use(cors());
app.use(express.json());

// Block API if DB is not connected
app.use((req, res, next) => {
  if (req.path.startsWith("/api") && mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: "Database not connected" });
  }
  next();
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
