import mongoose from "mongoose";
import dotenv from "dotenv";

import Car from "./models/Car.js";
import User from "./models/User.js";
import cars from "./data/cars.js";

dotenv.config();

const seedData = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env file");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding...");

    await Car.deleteMany();
    await User.deleteMany();

    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      isAdmin: true,
    });

    const carsWithUser = cars.map((car) => ({
      ...car,
      user: adminUser._id,
    }));

    await Car.insertMany(carsWithUser);

    console.log("Admin user and cars seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeder error:", error.message);
    process.exit(1);
  }
};

seedData();
