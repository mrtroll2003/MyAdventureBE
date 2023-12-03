const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  email: { type: String, required: true},
  name: { type: String, required: true},
  phone: { type: String, required: true},
  nationality: { type: String, required: true},
  address: { type: String, required: true},
  note: { type: String},
  rating: { type: Number},
  tourID: {type: ObjectId, required: true},
  status: { type: String, required: true },
  date: { type: Date, required: true},
}, { collection: 'booking' });

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
