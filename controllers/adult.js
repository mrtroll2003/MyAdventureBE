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
        const tourID = req.body.tourID;
        const name = req.body.name;
        const sex = req.body.sex;
        const dob = req.body.dob;
        const ID = req.body.id;
        const phone = req.body.phone;
        const email = req.body.email;

        const adult = new Adult({
          bookingEmail,
          bookingDate,
          tourID,
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

router.post("/update", async (req, res) => {
  try {
    let { _id , name, sex,dob ,ID, phone,email } = req.body;
    const adult = await Adult.findOne({ _id });
    if (!adult) {
      res.status(401).send("No adult found");
      return;
    }

    const updated = await Adult.updateOne({ _id},
      { name, sex, dob, ID, phone, email })

    res.status(200).json("Update successfully");
    
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: "Error server" });
  }
});


router.get("/booking", async (req, res) => {
  const bookingEmail  = req.query.bookingEmail;
  const bookingDate  = req.query.bookingDate;
  const adults = await Adult.find({ bookingEmail, bookingDate });
  res.json(adults);
});


router.get("/tour", async (req, res) => {
  const tourID = req.query.tourID;
  const adults = await Adult.find({tourID});
  res.json(adults);
});

module.exports = router;
