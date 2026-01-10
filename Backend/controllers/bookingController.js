const crypto = require("crypto");
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  const { carId, startDate, endDate, totalPrice, pickupLocation } = req.body;

  if (!carId || !startDate || !endDate) {
    res.status(400).json({ message: "Please provide all required fields" });
    return;
  }

  const car = await Car.findById(carId);

  if (!car) {
    res.status(404).json({ message: "Car not found" });
    return;
  }

  const booking = new Booking({
    user: req.user._id,
    car: carId,
    startDate,
    endDate,
    totalPrice,
    pickupLocation,
    status: "pending",
  });

  try {
    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(400).json({ message: "Booking failed", error: error.message });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user", "name email")
      .populate("car");

    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const bookings = await Booking.find({ user: req.user._id }).populate("car");
    res.json(bookings);
  } catch (error) {
    console.error("Error in getMyBookings:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("user", "id name")
      .populate("car");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
const updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
      booking.status = status;
      const updatedBooking = await booking.save();
      res.json(updatedBooking);
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  createBooking,
  getBookingById,
  getMyBookings,
  getBookings,
  updateBookingStatus,
};
