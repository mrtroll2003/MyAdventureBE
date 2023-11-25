const mongoose = require("mongoose");

const adultSchema = new mongoose.Schema({
  bookingEmail: { type: String, required: true},
  departure: { type: String, required: true},
  destination: { type: String, required: true},
  departureDate: { type: Date, required: true},
  returnDate: { type: Date, required: true},
  name: { type: String, required: true},
  sex: { type: String, required: true},
  dob: { type: Date, required: true},
  ID: { type: String, required: true},
  phone: { type: String, required: true},
  email: { type: String, required: true},
});

const Adult = mongoose.model("Adult", adultSchema);

module.exports = Adult;
