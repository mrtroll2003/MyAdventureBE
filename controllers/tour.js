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

router.get("/vietnam-tours", async (req, res) => {
  try {
    const tour = await Tour.find({isVNTour: true});
    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }
    res.json(tour);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/vietnam-tours/departures", async (req, res) => {
  try {
    const tour = await Tour.find({isVNTour: true});
    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }
    const tourDepartureSet = new Set (tour.map(tour => tour.departure))
    const tourDeparture = Array.from(tourDepartureSet)
    res.json(tourDeparture);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/vietnam-tours/destinations", async (req, res) => {
  try {
    const tour = await Tour.find({isVNTour: true});
    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }
    const tourDestinationSet = new Set (tour.map(tour => tour.destination))
    const tourDestination= Array.from(tourDestinationSet)
    res.json(tourDestination);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});



router.get("/international-tours", async (req, res) => {
  try {
    const tour = await Tour.find({isVNTour: false});
    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }
    res.json(tour);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/international-tours/departures", async (req, res) => {
  try {
    const tour = await Tour.find({isVNTour: false});
    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }
    const tourDepartureSet = new Set (tour.map(tour => tour.departure))
    const tourDeparture = Array.from(tourDepartureSet)
    res.json(tourDeparture);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/international-tours/destinations", async (req, res) => {
  try {
    const tour = await Tour.find({isVNTour: false});
    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }
    const tourDestinationSet = new Set (tour.map(tour => tour.destination))
    const tourDestination= Array.from(tourDestinationSet)
    res.json(tourDestination);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
