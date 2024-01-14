const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const childrenSchema = new mongoose.Schema({
  bookingEmail: { type: String, required: true},
  bookingDate: { type: Date, required: true},
  tourID: {type: ObjectId, required: true},
  name: { type: String, required: true},
  sex: { type: String, required: true},
  dob: { type: Date, required: true},
  birthCert: { type: String, required: true},
},{ collection: 'children' });

const Children = mongoose.model("Children", childrenSchema);

module.exports = Children;
