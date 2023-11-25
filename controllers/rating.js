const express = require("express");
const router = express.Router();

const Rating = require("../models/rating");

router.get("/", async (req, res) => {
  const rating = await Rating.find();
  res.json(rating);
});


module.exports = router;