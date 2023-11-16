const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  departure: { type: String, required: true },
  destination: { type: String, required: true },
  departureDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  price: { type: Number, required: true },
  tourDetails: { type: String, required: true },
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
