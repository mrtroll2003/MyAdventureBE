const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  email: { type: String, required: true},
  name: { type: String, required: true},
  phone: { type: String, required: true},
  nationality: { type: String, required: true},
  address: { type: String, required: true},
  note: { type: String, required: true},
  rating: { type: Number, required: true},
  departure: { type: String, required: true },
  destination: { type: String, required: true },
  departureDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  status: { type: String, required: true },
  date: { type: Date, required: true},
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
