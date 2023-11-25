const express = require("express");
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

const Tour = require("../models/tour");

router.get("/", async (req, res) => {
  const tours = await Tour.find();
  res.json(tours);
});


router.get("/place", async (req, res) => {
  const { id } = req.query;
  
  try {
    const tour = await Tour.findOne({_id :  new ObjectId(id) });
    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }
    res.json(tour);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
