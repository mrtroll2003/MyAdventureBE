const mongoose = require("mongoose");

const childrenSchema = new mongoose.Schema({
  bookingEmail: { type: String, required: true},
  bookingDate: { type: Date, required: true},
  name: { type: String, required: true},
  sex: { type: String, required: true},
  dob: { type: Date, required: true},
  birthCert: { type: Object, required: true},
},{ collection: 'children' });

const Children = mongoose.model("Children", childrenSchema);

module.exports = Children;
