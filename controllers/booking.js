const express = require("express");
const router = express.Router();

const Booking = require("../models/booking");

router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});


router.post("/add", async (req, res) => {
    try {
        const email = req.body.email;
        const name = req.body.name;
        const phone = req.body.phone;
        const nationality = req.body.nationality;
        const address = req.body.address;
        const note = req.body.note;
        const rating = req.body.rating;
        const tourID = req.body.tourID;
        const status = req.body.status;
        const date = req.body.date;

        const booking = new Booking({
          email,
          name,
          phone,
          nationality,
          address,
          note,
          rating,
          tourID,
          status,
          date,
        })

        await booking.save(); // Save the booking to the database
        res.json({ success: true, booking });
    } catch (error) {
      res.status(400).json({
        error
        // error: 'Your request could not be processed. Please try again.'
      });
}})

router.get("/email", async (req, res) => {
  const email  = req.query.email;
  const bookings = await Booking.find({ email });
  res.json(bookings);
});

router.get("/tour", async (req, res) => {
  const tourID = req.query.tourID;
  const bookings = await Booking.find({tourID});
  res.json(bookings);
});


module.exports = router;
