const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  departure: { type: String, required: true },
  destination: { type: String, required: true },
  departureDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  price: { type: Number, required: true },
  details: { type: String, required: true },
  area: { type: String, required: true },
  isVNTour: { type: Boolean, required: true },
  hotel: { type: String, required: true },
  transport: { type: String, required: true },
  checkin: { type: Date, required: true },
  checkout: { type: Date, required: true },
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
