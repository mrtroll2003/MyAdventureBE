const express = require("express");
const router = express.Router();

// const { createClient } = require('@supabase/supabase-js');

// const supabase = createClient({
//   apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rYXhub3hvY2FnbGl6enJmaGp3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDEyMDI2NCwiZXhwIjoyMDE1Njk2MjY0fQ.6ZNDz2LY3uTglFR2sqJvyPirr00voeSv9BNBRDU_F08',
//   apiURL: 'https://nkaxnoxocaglizzrfhjw.supabase.co',
// });

// const { supabase } = require("../index"); 

const Children = require("../models/children");

router.get("/", async (req, res) => {
  const children = await Children.find();
  res.json(children);
});


router.post("/add", async (req, res) => {
    try {
        const bookingEmail = req.body.bookingEmail;
        const bookingDate = req.body.bookingDate;
        const tourID = req.body.tourID;
        const name = req.body.name;
        const sex = req.body.sex;
        const dob = req.body.dob;
        const birthCert = req.body.birthCert;

        const children = new Children({
          bookingEmail,
          bookingDate,
          tourID,
          name,
          sex,
          dob,
          birthCert,
        })

        await children.save();
        res.json({ success: true, children });
    } catch (error) {
      res.status(400).json({
        error
      });
}})


router.post("/update", async (req, res) => {
  try {
    let { _id, name, sex, birthCert } = req.body;

    const child = await Children.findOne({ _id});

    if (!child) {
      res.status(401).send("No children found");
      return;
    }

    const updated = await Children.updateOne({ _id},
      { name, sex, birthCert})

    res.status(200).json("Update successfully");
    
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: "Error server" });
  }
});

router.get("/booking", async (req, res) => {
  const bookingEmail  = req.query.bookingEmail;
  const bookingDate  = req.query.bookingDate;
  const children = await Children.find({ bookingEmail, bookingDate });
  res.json(children);
});

router.get("/tour", async (req, res) => {
  const tourID = req.query.tourID;
  const children = await Children.find({ tourID });
  res.json(children);
});

module.exports = router;
