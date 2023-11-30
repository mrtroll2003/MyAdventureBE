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
        const name = req.body.name;
        const sex = req.body.sex;
        const dob = req.body.dob;
        const birthCert = req.body.birthCert;

        // const { data, error } = await supabase.storage
        // .from('BirthCert')
        // .upload(birthCert);

        // if (error) {
        //   throw new Error('Error uploading birth certificate to Supabase');
        // }
        
        // const birthCertUrl = data.publicURL;

        const children = new Children({
          bookingEmail,
          bookingDate,
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

router.get("/booking", async (req, res) => {
  const bookingEmail  = req.query.bookingEmail;
  const bookingDate  = req.query.bookingDate;
  const children = await Children.find({ bookingEmail, bookingDate });
  res.json(children);
});

module.exports = router;
