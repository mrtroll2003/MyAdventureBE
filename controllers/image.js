const express = require("express");
const router = express.Router();

const Image = require("../models/image");

router.get("/", async (req, res) => {
  const images = await Image.find();
  res.json(images);
});

router.get("/place", async (req, res) => {
  const name  = req.query.name;
  const image = await Image.findOne({ name });
  res.json(image);
});

module.exports = router;
