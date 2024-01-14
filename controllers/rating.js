const express = require("express");
const router = express.Router();

const Rating = require("../models/rating");

router.get("/", async (req, res) => {
  const rating = await Rating.find();
  res.json(rating);
});


router.post("/update", async (req, res) => {
  try {
    let { name, rating } = req.body;

    const rate = await Rating.findOne({ name });

    if (!rate) {
      res.status(401).send("No rating found");
      return;
    }

    const updated = await Rating.updateOne({name },
      {rating })

    res.status(200).json(updated);
    
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: "Error server" });
  }
});

module.exports = router;