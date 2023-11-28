const mongoose = require("mongoose");

const adultSchema = new mongoose.Schema({
  bookingEmail: { type: String, required: true},
  bookingDate: { type: Date, required: true},
  name: { type: String, required: true},
  sex: { type: String, required: true},
  dob: { type: Date, required: true},
  ID: { type: String, required: true},
  phone: { type: String, required: true},
  email: { type: String},
});

const Adult = mongoose.model("Adult", adultSchema);

module.exports = Adult;
