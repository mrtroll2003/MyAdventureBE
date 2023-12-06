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

router.get("/id", async (req, res) => {
  const id  = req.query.id;
  
  try {
    const tour = await Tour.findOne({_id :  id });
    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }
    res.json(tour);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/destination", async (req, res) => {
  const { destination} = req.query;
  try {
    const tour = await Tour.find({destination});
    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }

    res.json(tour);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/destination/departures", async (req, res) => {
  const { destination} = req.query;
  try {
    const tour = await Tour.find({destination});
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

router.get("/vietnam-tours/north-destinations", async (req, res) => {
  try {
    const tour = await Tour.find({isVNTour: true, area: "North"});
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

router.get("/vietnam-tours/center-destinations", async (req, res) => {
  try {
    const tour = await Tour.find({isVNTour: true, area: "Center"});
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

router.get("/vietnam-tours/south-destinations", async (req, res) => {
  try {
    const tour = await Tour.find({isVNTour: true, area: "South"});
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


router.get("/international-tours/asia-destinations", async (req, res) => {
  try {
    const tour = await Tour.find({isVNTour: false, area: "Asia"});
    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }
    const tourDestinationSet = new Set (tour.map(tour => tour.destination))
    const tourDestination = Array.from(tourDestinationSet)
    res.json(tourDestination);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/international-tours/europe-destinations", async (req, res) => {
  try {
    const tour = await Tour.find({isVNTour: false, area: "Europe"});
    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }
    const tourDestinationSet = new Set (tour.map(tour => tour.destination))
    const tourDestination = Array.from(tourDestinationSet)
    res.json(tourDestination);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/international-tours/australia-destinations", async (req, res) => {
  try {
    const tour = await Tour.find({isVNTour: false, area: "Australia"});
    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }
    const tourDestinationSet = new Set (tour.map(tour => tour.destination))
    const tourDestination = Array.from(tourDestinationSet)
    res.json(tourDestination);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});



module.exports = router;
