const express = require("express");
const router = express.Router();

const Adult = require("../models/adult");

router.get("/", async (req, res) => {
  const adults = await Adult.find();
  res.json(adults);
});


router.post("/add", async (req, res) => {
    try {
        const bookingEmail = req.body.bookingEmail;
        const bookingDate = req.body.bookingDate;
        const name = req.body.name;
        const sex = req.body.sex;
        const dob = req.body.dob;
        const ID = req.body.id;
        const phone = req.body.phone;
        const email = req.body.email;

        const adult = new Adult({
          bookingEmail,
          bookingDate,
          name,
          sex,
          dob,
          ID,
          phone,
          email,
        })

        await adult.save();
        res.json({ success: true, adult });
    } catch (error) {
      res.status(400).json({
        error
      });
}})


module.exports = router;
