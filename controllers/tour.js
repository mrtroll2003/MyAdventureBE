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

router.post("/update", async (req, res) => {
  try {
    let { tourID, transport, departureDate, returnDate, hotel, checkinDate, checkoutDate, details, price } = req.body;

    const tour = await Tour.findOne({ _id: tourID });

    if (!tour) {
      res.status(401).send("No tour found");
      return;
    }

    const updated = await Tour.updateOne({_id: tourID },
      {transport, departureDate, returnDate, hotel, checkin: checkinDate, checkout: checkoutDate, details, price })

    res.status(200).json(updated);
    
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: "Error server" });
  }
});




router.post("/add", async (req, res) => {
  try {
    const departure = req.body.departure;
    const destination = req.body.destination;
    const transport = req.body.transport;
    const departureDate = req.body.departureDate;
    const returnDate = req.body.returnDate;
    const hotel = req.body.hotel;
    const checkin = req.body.checkin;
    const checkout = req.body.checkout;
    const details = req.body.details;
    const price = req.body.price;
    const isVNTour = req.body.isVNTour;
    const area = req.body.area;


    const tour = new Tour({
      departure,
      destination,
      transport,
      departureDate,
      returnDate,
      hotel,
      checkin,
      checkout,
      details,
      price,
      isVNTour,
      area,
      isCancel:  false,
    })

    console.log(tour);

      await tour.save();
      res.status(200).json({ success: true, tour });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error
    });
}})


router.post("/update1", async (req, res) => {
  try {
    const result = await Tour.updateMany({}, { $set: { isCancel: false } });
    if (result.nModified !== undefined) {
      console.log('Successfully updated', result.nModified, 'documents');
    } else {
      console.log('No documents were modified');
    }
    res.status(200).json({ message: 'Update successful' });
  } catch (error) {
    console.error('Error updating documents:', error);
    res.status(500).json({ error: 'An error occurred while updating documents' });
  }
});

router.post("/update-status", async (req, res) => {
  try {
    let { tourID, isCancel } = req.body;

    const tour = await Tour.findOne({ _id: tourID });

    if (!tour) {
      res.status(401).send("No tour found");
      return;
    }

    const updated = await Tour.updateOne({_id: tourID },
      {isCancel })

    res.status(200).json(updated);
    
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: "Error server" });
  }
});

router.get("/international-tours/date", async (req, res) => {
  try {
    const tourDates = await Tour.distinct("departureDate", { isVNTour: false });

    if (!tourDates) {
      return res.status(404).json({ error: "Tour dates not found" });
    }

    res.json(tourDates);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/vietnam-tours/date", async (req, res) => {
  try {
    const tourDates = await Tour.distinct("departureDate", { isVNTour: true });

    if (!tourDates) {
      return res.status(404).json({ error: "Tour dates not found" });
    }

    res.json(tourDates);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
