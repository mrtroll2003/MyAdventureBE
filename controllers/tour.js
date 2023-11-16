const express = require("express");
const router = express.Router();

const Tour = require("../models/tour");

router.get("/", async (req, res) => {
  const tours = await Tour.find();
  res.json(tours);
});

module.exports = router;
