const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// const { createClient } = require('@supabase/supabase-js');

// const supabase = createClient({
//   apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rYXhub3hvY2FnbGl6enJmaGp3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDEyMDI2NCwiZXhwIjoyMDE1Njk2MjY0fQ.6ZNDz2LY3uTglFR2sqJvyPirr00voeSv9BNBRDU_F08',
//   apiURL: 'https://nkaxnoxocaglizzrfhjw.supabase.co',
// });


const authRouter = require("./controllers/auth.js");
const tourRouter = require("./controllers/tour.js");
const imageRouter = require("./controllers/image.js");
const ratingRouter = require("./controllers/rating.js");
const bookingRouter = require("./controllers/booking.js");
const adultRouter = require("./controllers/adult.js");
const childrenRouter = require("./controllers/children.js");
var bodyParser = require("body-parser");
const { Authentication } = require("./middlewares/authentication.js");
const { Authorization } = require("./middlewares/authorization.js");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use("/auth", authRouter);
app.use("/tour", tourRouter);
app.use("/image", imageRouter);
app.use("/rating", ratingRouter);
app.use("/booking", bookingRouter);
app.use("/adult", adultRouter);
app.use("/children", childrenRouter);

app.get("/admin", Authentication, Authorization("admin"), async (req, res) => {
  res.send("admin");
});

app.get("/user", Authentication, Authorization("user"), async (req, res) => {
  res.send("user");
});

require("dotenv").config();

app.listen(3001, async () => {
  console.log("Server is running on port 3001");
  await mongoose.connect(
    "mongodb+srv://21522041:12032003@cluster0.cxvcnmf.mongodb.net/MyAdventure?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
});

// module.exports.supabase = supabase;