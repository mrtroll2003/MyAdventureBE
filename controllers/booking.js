const express = require("express");
const router = express.Router();

const Booking = require("../models/booking");

router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

router.get("/id", async (req, res) => {
  const id = req.query.id;
  try {
    const booking = await Booking.findOne({_id : id });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/update-status", async (req, res) => {
  try {
    let { bookingID ,status } = req.body;

    const booking = await Booking.findOne({ _id: bookingID });

    if (!booking) {
      res.status(401).send("No booking found");
      return;
    }

    const updated = await Booking.updateOne({ _id: bookingID },
      { status })

    res.status(200).json(updated);
    
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: "Error server" });
  }
});


router.post("/update", async (req, res) => {
  try {
    let { bookingID, name, phone, address, nationality, note } = req.body;

    const booking = await Booking.findOne({ _id: bookingID });

    if (!booking) {
      res.status(401).send("No booking found");
      return;
    }

    const updated = await Booking.updateOne({ _id: bookingID },
      { name, phone, address, nationality, note })

    res.status(200).json(updated);
    
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: "Error server" });
  }
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
        const price = req.body.price;
        const payment = req.body.payment;

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
          price,
          payment,
        })

        await booking.save();
        res.json({ success: true, booking });
    } catch (error) {
      res.status(400).json({
        error
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


router.post("/update-rating", async (req, res) => {
  try {
    let { bookingID, rating } = req.body;

    const booking = await Booking.findOne({ _id: bookingID });

    if (!booking) {
      res.status(401).send("No booking found");
      return;
    }

    const updated = await Booking.updateOne({_id: bookingID },
      {rating })

    res.status(200).json(updated);
    
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: "Error server" });
  }
});

router.post("/cancel-booking", async (req, res) => {
  const { tourID } = req.body;

  try {
    const result = await Booking.updateMany({ tourID: tourID }, { $set: { status: "Cancelled" } });
    console.log('Successfully cancelled', result.nModified, 'bookings');
    res.status(200).json({ message: 'Cancellation successful' });
  } catch (error) {
    console.error('Error cancelling bookings:', error);
    res.status(500).json({ error: 'An error occurred while cancelling bookings' });
  }
});

router.get("/booking-year", async (req, res) => {
  try {
    const bookings = await Booking.find();
    const years = bookings.map(booking => new Date(booking.date).getFullYear());
    const uniqueYears = Array.from(new Set(years));
    res.json(uniqueYears);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/update-payment", async (req, res) => {
  try {
    let { _id, payment } = req.body;

    const booking = await Booking.findOne({ _id});

    if (!booking) {
      res.status(401).send("No booking found");
      return;
    }

    console.log(booking)

    const updated = await Booking.updateOne({ _id},
      { payment})

    res.status(200).json("Update successfully");
    
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: "Error server" });
  }
});


module.exports = router;
