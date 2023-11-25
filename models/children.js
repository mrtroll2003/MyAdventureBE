const mongoose = require("mongoose");

const childrenSchema = new mongoose.Schema({
  bookingEmail: { type: String, required: true},
  departure: { type: String, required: true},
  destination: { type: String, required: true},
  departureDate: { type: Date, required: true},
  returnDate: { type: Date, required: true},
  name: { type: String, required: true},
  sex: { type: String, required: true},
  dob: { type: Date, required: true},
  birthCert: { type: String, required: true},
});

const Children = mongoose.model("Children", childrenSchema);

module.exports = Children;
